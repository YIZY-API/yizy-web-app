<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import ImportErrorDialog from './ImportErrorDialog.svelte';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label';
	import { importService } from '$lib/state';

	let isDialogOpen = $state(false);
	let importErrorDialog: ReturnType<typeof ImportErrorDialog>;

	export function show() {
		isDialogOpen = true;
	}
	export function close() {
		isDialogOpen = false;
	}

	let jsonInput = $state('');

	function onUploadClicked() {
		try {
			importService(jsonInput);
			close();
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
			<Textarea class="max-h-24 w-full" bind:value={jsonInput as string} />
		</div>
		<Dialog.Footer>
			<Button
				onclick={() => {
					onUploadClicked();
				}}>Upload</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<ImportErrorDialog bind:this={importErrorDialog} />
