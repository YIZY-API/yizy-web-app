<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Card from '$lib/components/ui/card';
	import ImportDialog from './ImportDialog.svelte';
	import ExportDialog from './ExportDialog.svelte';
	import YizyEditor from '$lib/components/ui/editor/YizyEditor.svelte';
	import { yizySpecToDoc } from '$lib/components/ui/editor/models/models';
	import { currentService } from '$lib/state';
	import Button from '$lib/components/ui/button/button.svelte';
	import { importService } from '$lib/state';
	import { EllipsisVertical } from 'lucide-svelte';

	let importDialog: ImportDialog;
	let exportDialog: ExportDialog;

	let editor: YizyEditor;

	let saveBtnText = $state('Generate');

	function onResetClicked() {
		editor.reset();
	}

	function onSaveClicked() {
		saveBtnText = 'Generated!';
		importService(JSON.stringify(editor.toYizySpec()));
		setTimeout(() => {
			saveBtnText = 'Generate';
		}, 1000);
	}
</script>

<Card.Root>
	<div class="flex flex-row justify-between">
		<Card.Header class="w-full">
			<div class="flex w-full flex-row justify-between">
				<div>
					<Card.Title>YIZY API Spec</Card.Title>
					<Card.Description
						>Write API spec in the browser. Try editing the spec below and click the generate button
						on the right. <span class="text-destructive">Validation Errors Coming Soon!</span
						></Card.Description>
				</div>
				<div class="my-auto flex h-full gap-2">
					<Button
						onclick={() => onResetClicked()}
						variant="outline"
						class="border-destructive text-destructive hover:bg-destructive">Clear</Button>
					<Button
						onclick={() => {
							onSaveClicked();
						}}>{saveBtnText}</Button>
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
		{#key $currentService}
			<YizyEditor bind:this={editor} doc={yizySpecToDoc($currentService)} />
		{/key}
	</Card.Content>
</Card.Root>
<ImportDialog bind:this={importDialog} />
<ExportDialog bind:this={exportDialog}></ExportDialog>
