<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import { Files, Plus, LoaderCircle } from 'lucide-svelte';
	import YizyLogo from '$lib/components/ui/YIZYLogo.svelte';
	import * as yizy from '$lib/api-client/yizyClient';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { currentService } from '$lib/state';
	import { yizySpecToDoc } from '$lib/components/ui/editor/models/models';
	import * as yizySpec from '@yizy/spec';
	import CodeTab from './components/CodeTab.svelte';
	import SpecTab from './components/SpecTab.svelte';
	import { DEFAULT_DOCUMENT } from '$lib/components/ui/editor/models/models';
	import { dev } from '$app/environment';
	import { twMerge } from 'tailwind-merge';

	let { data } = $props();

	interface SpecDto {
		id: string;
		name: string;
	}

	interface SpecDetailDto {
		id: string;
		snapshotId: string;
		version: string;
	}

	let doc = $state(yizySpecToDoc($currentService));
	let specs: SpecDto[] = $state([]);
	let selectedSpec: SpecDto | null = $state(null);
	let selectedSpecDetails: SpecDetailDto | null = $state(null);
	let specContent: string = $state('');
	let isContentLoading: boolean = $state(false);
	let createSpecDialogSpecName: string = $state('');
	let isCreateSpecDialogOpen: boolean = $state(false);

	function closeCreateSpecDialog() {
		isCreateSpecDialogOpen = false;
	}

	function isSelectedSpec(spec: SpecDto) {
		if (!selectedSpec) return false;
		return spec.id == selectedSpec.id;
	}

	function getApiClientConfigs() {
		if (dev) {
			return yizy.localConfigs;
		} else {
			return yizy.prodConfigs;
		}
	}

	async function selectSpecClicked(spec: SpecDto) {
		selectedSpec = spec;
		isContentLoading = true;
		const res = await yizy.getLatestSpecById({ id: spec.id }, getApiClientConfigs());
		if (res.error === null && res.result !== null) {
			selectedSpecDetails = {
				id: spec.id,
				snapshotId: res.result.snapshotId,
				version: res.result.versionNumber
			};
			specContent = res.result?.content;
			try {
				const service = JSON.parse(specContent) as yizySpec.Service;
				doc = yizySpecToDoc(service);
			} catch (e) {
				console.log('cannot parse spec!');
				doc = DEFAULT_DOCUMENT;
			}
		}
		isContentLoading = false;
	}

	async function onImportSpec(service: yizySpec.Service) {
		doc = yizySpecToDoc(service as yizySpec.Service);
	}

	async function createSpecDialogSaveBtnClicked() {
		if (data.authState) {
			const res = await yizy.createSpec(
				{
					name: createSpecDialogSpecName,
					creatorUserId: data.authState?.user.uuid
				},
				getApiClientConfigs()
			);
			if (res.error === null && res.result != null) {
				specs = specs.concat(res.result);
				closeCreateSpecDialog();
			}
		} else {
			console.log('please login!');
		}
	}

	async function updateSpecBtnClicked(specContent: string) {
		if (data.authState && selectedSpecDetails) {
			const res = await yizy.updateSpec(
				{
					specId: selectedSpecDetails.id,
					content: specContent,
					updatorUserId: data.authState.user.uuid,
					prevSpecSnapshotId: selectedSpecDetails.snapshotId
				},
				getApiClientConfigs()
			);
			if (res.error == null && res.result != null) {
				selectedSpecDetails = {
					snapshotId: res.result?.prevSnapshotId,
					id: selectedSpecDetails.id,
					version: res.result?.versionNumber.toString()
				};
			}
			return;
		} else {
			console.log('please login!');
		}
	}

	onMount(async () => {
		if (data.authState) {
			const res = await yizy.getSpecs(
				{
					userId: data.authState?.user.uuid
				},
				getApiClientConfigs()
			);
			if (res.error == null) {
				specs = res.result.resultset;
			}
		}
	});
	let sidepanelOpen = $state(true);
</script>

<svelte:head>
	<title>App</title>
</svelte:head>

<div class="flex h-screen flex-row">
	<div class="flex h-screen flex-col border-r">
		<div class="flex h-full w-full flex-row">
			<div class="flex h-full w-12 flex-col gap-3 bg-secondary px-2 py-4">
				<button
					class={twMerge('w-full', sidepanelOpen ? '' : 'text-muted')}
					onclick={() => {
						sidepanelOpen = !sidepanelOpen;
					}}><Files class="h-8 w-8" /></button>
			</div>
			{#if sidepanelOpen}
				<div class="flex min-w-64 max-w-72 flex-col overflow-x-hidden">
					<a href="/">
						<div class="mx-auto my-4 h-12 w-12 text-xs">
							<YizyLogo />
						</div>
					</a>
					<div class="flex flex-row justify-between bg-border px-2 py-1">
						<div class="my-auto text-sm font-bold">My Specs</div>
						<Dialog.Root bind:open={isCreateSpecDialogOpen}>
							<Dialog.Trigger class="my-auto flex">
								<Plus class="h-5" />
							</Dialog.Trigger>
							<Dialog.Content class="sm:max-w-[425px]">
								<Dialog.Header>
									<Dialog.Title>Create New API Spec</Dialog.Title>
									<Dialog.Description>Create a new API spec</Dialog.Description>
								</Dialog.Header>
								<div class="grid gap-4 py-4">
									<div class="grid grid-cols-4 items-center gap-4">
										<Label for="name" class="text-right">Name</Label>
										<Input
											id="name"
											placeholder="My API Service"
											class="col-span-3"
											bind:value={createSpecDialogSpecName} />
									</div>
								</div>
								<Dialog.Footer>
									<Button
										onclick={async () => {
											await createSpecDialogSaveBtnClicked();
										}}>Create</Button>
								</Dialog.Footer>
							</Dialog.Content>
						</Dialog.Root>
					</div>
					{#each specs as s}
						{#if isSelectedSpec(s)}
							<button
								class="break-words bg-primary px-2 py-1 text-left text-sm text-primary-foreground"
								>{s.name}</button>
						{:else}
							<button
								class="break-words px-2 py-1 text-left text-sm hover:bg-primary hover:text-primary-foreground"
								onclick={async () => {
									selectSpecClicked(s);
								}}>{s.name}</button>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<div class="flex h-full flex-grow flex-col overflow-y-scroll">
		{#if isContentLoading}
			<div class="m-auto">
				<LoaderCircle class="animate-spin text-primary" />
			</div>
		{:else if selectedSpec === null}
			<div class="m-auto">Select a spec or Create a new spec</div>
		{:else}
			<Tabs.Root value="api-spec" class="w-full p-4">
				<Tabs.List class="grid w-full grid-cols-2">
					<Tabs.Trigger value="api-spec">Edit Spec</Tabs.Trigger>
					<Tabs.Trigger value="code-gen">Generate Code</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="api-spec">
					<SpecTab bind:doc onGenerateBtnClicked={updateSpecBtnClicked} {onImportSpec}></SpecTab>
				</Tabs.Content>
				<Tabs.Content value="code-gen">
					<CodeTab bind:doc version={selectedSpecDetails?.version ?? undefined} />
				</Tabs.Content>
			</Tabs.Root>
		{/if}
	</div>
</div>
