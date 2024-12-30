<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Label } from '$lib/components/ui/label';
	import HighlightCode from '$lib/components/ui/HighlightCode.svelte';
	import json from 'svelte-highlight/languages/json';
	import { type Document, docToYizySpec } from '$lib/components/ui/editor/models/models';

	let { doc = $bindable() }: { doc: Document } = $props();

	let isDialogOpen = $state(false);

	export function show() {
		isDialogOpen = true;
	}
	export function close() {
		isDialogOpen = false;
	}
</script>

<Dialog.Root bind:open={isDialogOpen}>
	<Dialog.Content class="flex max-h-[400px] max-w-[425px] flex-col">
		<Dialog.Header class="w-full">
			<Dialog.Title>Export Json</Dialog.Title>
			<Dialog.Description
				>Export API Spec to Json so you can import it back later. Make sure you click generate
				first!</Dialog.Description>
		</Dialog.Header>
		<div class="flex w-full flex-col">
			<Label class="py-2">Json</Label>
			<div class="rounded-lg bg-[#0d121c]">
				<div class="max-h-52 overflow-auto rounded-lg">
					<HighlightCode language={json} code={JSON.stringify(docToYizySpec(doc), null, 2)} />
				</div>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
