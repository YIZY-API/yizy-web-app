<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import SpecDisplay from '$lib/components/ui/SpecDisplay.svelte';
	import ImportDialog from './ImportDialog.svelte';
	let dialog: ImportDialog | null = null;
</script>

<Card.Root>
	<div class="flex flex-row justify-between">
		<Card.Header class="w-full">
			<div class="flex w-full flex-row justify-between">
				<div>
					<Card.Title>YIZY API Spec</Card.Title>
					<Card.Description>
						Write API spec in Typescript with code completion then upload your json! Check the <a
							href="/getting-started"
							class="text-primary underline">getting started</a
						> page on how to get started.
					</Card.Description>
				</div>
				<Button
					on:click={() => {
						if (dialog != null) {
							dialog.show();
						}
					}}>Upload</Button
				>
			</div>
		</Card.Header>
	</div>
	<Card.Content class="space-y-2">
		<SpecDisplay />
	</Card.Content>
</Card.Root>
<ImportDialog bind:this={dialog} />
