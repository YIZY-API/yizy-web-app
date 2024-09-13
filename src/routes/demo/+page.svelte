<script lang="ts">
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';
	import { onMount } from 'svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import YizySpecTab from './components/YIZYSpecTab.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import YizyDocTab from './components/YIZYDocTab.svelte';
	import YizyModelsTab from './components/YIZYModelsTab.svelte';

	function onScreenResize() {
		if (window.innerWidth < 550) {
			isScreenTooSmall = true;
		} else {
			isScreenTooSmall = false;
		}
	}

	let golangString = ``;
	let programmingLanguages = ['Golang', 'Typescript', 'You Get The Idea'];
	let isScreenTooSmall = false;

	onMount(() => {
		if (window.innerWidth < 550) {
			isScreenTooSmall = true;
		}
	});
</script>

<svelte:window on:resize={onScreenResize} />

<div>
	{#if isScreenTooSmall}
		<Alert.Root class="my-4 border-destructive text-destructive">
			<TriangleAlert class="h-4 w-4 stroke-destructive" />
			<Alert.Title>Heads up!</Alert.Title>
			<Alert.Description>
				Oops, this page isn't mobile friendly yet. Tilt your screen to view it in landscape mode!
			</Alert.Description>
		</Alert.Root>
	{/if}
	<Tabs.Root value="yizi-api-spec" class="w-full">
		<Tabs.List class="grid w-full grid-cols-4">
			<Tabs.Trigger value="yizi-api-spec">YIZI API Spec</Tabs.Trigger>
			<Tabs.Trigger value="yizi-doc">YIZI Doc</Tabs.Trigger>
			<Tabs.Trigger value="models">Models</Tabs.Trigger>
			<Tabs.Trigger value="client-sdk">Client SDK</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="yizi-api-spec">
			<YizySpecTab />
		</Tabs.Content>
		<Tabs.Content value="yizi-doc">
			<YizyDocTab />
		</Tabs.Content>
		<Tabs.Content value="client-sdk">
			<Card.Root>
				<Card.Header>
					<Card.Title>Client SDK</Card.Title>
					<Card.Description>
						Generate Http Client From the Spec So You Don't Have to Craft Your Own!
					</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-2">
					<Label class="mt-4 text-sm font-bold">Programming Language</Label>
					<Select.Root portal={null} selected={{ value: 'Golang', label: 'Golang' }}>
						<Select.Trigger class="w-[300px]">
							<Select.Value placeholder="Select a programming language" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Programming Language</Select.Label>
								{#each programmingLanguages as lang}
									<Select.Item value={lang} label={lang}>{lang}</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input name="favoriteLang" />
					</Select.Root>
					<div class="whitespace-pre-wrap rounded-lg bg-secondary">{golangString}</div>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>

		<Tabs.Content value="models">
			<YizyModelsTab />
		</Tabs.Content>
	</Tabs.Root>
</div>
