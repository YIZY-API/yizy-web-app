<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Button from '$lib/components/ui/button/button.svelte';

	let isDialogOpen = $state(false);
	export function show() {
		isDialogOpen = true;
	}
	export function close() {
		isDialogOpen = false;
	}
</script>

<Dialog.Root bind:open={isDialogOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Oops</Dialog.Title>
			<Dialog.Description
				>Json parsing error. More descriptive errors coming soon!</Dialog.Description
			>
		</Dialog.Header>
		<Dialog.Footer>
			<Button on:click={() => close()}>Ok</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
