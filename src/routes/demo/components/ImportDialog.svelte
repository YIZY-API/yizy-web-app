<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import ImportErrorDialog from './ImportErrorDialog.svelte';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Label } from '$lib/components/ui/label';
	import { importService } from '$lib/state';

	let isDialogOpen = false;
	let importErrorDialog: ImportErrorDialog;

	export function show() {
		isDialogOpen = true;
	}
	export function close() {
		isDialogOpen = false;
	}

	let jsonInput = ``;

	function onUploadClicked() {
		try {
			importService(jsonInput);
		} catch (error) {
			importErrorDialog.show();
		}
	}
</script>

<Dialog.Root bind:open={isDialogOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Upload Json</Dialog.Title>
			<Dialog.Description>Paste Spec in Json Here</Dialog.Description>
		</Dialog.Header>
		<div class="flex flex-col">
			<Label class="py-2">Json</Label>
			<Textarea class="max-h-24 w-full" bind:value={jsonInput} />
		</div>
		<Dialog.Footer>
			<Button on:click={onUploadClicked}>Upload</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<ImportErrorDialog bind:this={importErrorDialog} />
