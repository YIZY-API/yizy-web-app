<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label';
	import { importService } from '$lib/state';
	import * as yizy from '@yizy/spec';

	let { onImport }: { onImport: (service: yizy.Service) => void } = $props();

	let isDialogOpen = $state(false);

	export function show() {
		isDialogOpen = true;
	}
	export function close() {
		isDialogOpen = false;
	}

	let jsonInput = $state('');
	let importError = $state('');

	function onUploadClicked() {
		try {
			const service: yizy.Service = JSON.parse(jsonInput);
			onImport(service);
			importError = '';
			close();
		} catch (error) {
			importError = 'Import failed! Check Json and try again!';
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
			<small class="py-2 text-center text-destructive">{importError}</small>
		</div>
		<Dialog.Footer>
			<Button
				onclick={() => {
					onUploadClicked();
				}}>Upload</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
