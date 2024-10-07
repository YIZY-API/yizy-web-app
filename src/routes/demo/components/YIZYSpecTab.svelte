<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import TsJsonYamlDisplay from '$lib/components/ui/TsJsonYamlDisplay.svelte';
	import { classifiiApi } from '$lib/yizySpec/examples/classifiiSpec';
	import ImportDialog from './ImportDialog.svelte';

	const json = JSON.stringify(classifiiApi);
	let dialog: ImportDialog | null = null;
</script>

<Card.Root>
	<div class="flex flex-row justify-between">
		<Card.Header class="w-full">
			<div class="flex w-full flex-row justify-between">
				<div>
					<Card.Title>YIZY API Spec</Card.Title>
					<Card.Description>
						Write it in Yaml, Json, or Typescript if you need code completion suggestions!
					</Card.Description>
				</div>
				<Button
					on:click={() => {
						//importService(json);
						if (dialog != null) {
							dialog.show();
						}
					}}>Import</Button
				>
			</div>
		</Card.Header>
		<!--
		<div class="mx-6 my-auto">
			<Button
				variant="outline"
				on:click={() => {
					importService(json);
				}}>Import</Button
			>
		</div>
        -->
	</div>
	<Card.Content class="space-y-2">
		<TsJsonYamlDisplay />
	</Card.Content>
</Card.Root>
<ImportDialog bind:this={dialog} />
