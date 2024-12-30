<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Card from '$lib/components/ui/card';
	import ImportSpecDialog from './ImportSpecDialog.svelte';
	import ExportSpecDialog from './ExportSpecDialog.svelte';
	import YizyEditor from '$lib/components/ui/editor/YizyEditor.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { EllipsisVertical, LoaderCircle } from 'lucide-svelte';
	import { type Document } from '$lib/components/ui/editor/models/models';

	let importDialog: ReturnType<typeof ImportSpecDialog>;
	let exportDialog: ReturnType<typeof ExportSpecDialog>;

	let editor: ReturnType<typeof YizyEditor>;

	let isSaving = $state(false);

	let {
		doc = $bindable(),
		onGenerateBtnClicked
	}: { doc: Document; onGenerateBtnClicked: (content: string) => Promise<void> } = $props();

	async function onSaveAndGenerateClicked() {
		isSaving = true;
		await onGenerateBtnClicked(JSON.stringify(editor.toYizySpec()));
		isSaving = false;
	}
</script>

<Card.Root class="border-none">
	<div class="flex flex-row justify-between">
		<Card.Header class="w-full">
			<div class="flex w-full flex-row justify-between">
				<div>
					<Card.Title>YIZY API Spec</Card.Title>
					<Card.Description
						>Write API spec in the browser. Try editing the spec below and click the generate button
						on the right.
					</Card.Description>
				</div>
				<div class="my-auto flex h-full gap-2">
					{#if isSaving}
						<Button disabled>
							<LoaderCircle class="animate-spin" />
							Saving and Generating Code ...
						</Button>
					{:else}
						<Button
							onclick={() => {
								onSaveAndGenerateClicked();
							}}>Save & Generate</Button>
					{/if}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger class="h-full rounded-full text-muted hover:text-foreground">
							<EllipsisVertical class="my-auto"></EllipsisVertical>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content side="bottom" class="mr-12 bg-muted">
							<DropdownMenu.Group>
								<DropdownMenu.Item
									class="data-[highlighted]:bg-primary"
									onclick={() => {
										importDialog.show();
									}}>Import</DropdownMenu.Item>
								<DropdownMenu.Item
									class="data-[highlighted]:bg-primary"
									onclick={() => {
										exportDialog.show();
									}}>Export</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
		</Card.Header>
	</div>
	<Card.Content class="space-y-2 p-0">
		<YizyEditor bind:this={editor} bind:doc />
	</Card.Content>
</Card.Root>
<ImportSpecDialog bind:this={importDialog} />
<ExportSpecDialog bind:this={exportDialog} bind:doc />
