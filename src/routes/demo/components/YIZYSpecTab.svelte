<script lang="ts">
	//import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import TsJsonYamlDisplay from '$lib/components/ui/TsJsonYamlDisplay.svelte';
	//import { importService } from '$lib/state';
	import { classifiiApi } from '$lib/yizySpec/examples/classifiiSpec';

	const json = JSON.stringify(classifiiApi);
</script>

<Card.Root>
	<div class="flex flex-row justify-between">
		<Card.Header>
			<Card.Title>YIZY API Spec</Card.Title>
			<Card.Description>
				Write it in Yaml, Json, or Typescript if you need code completion suggestions!
			</Card.Description>
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
