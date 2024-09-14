<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import ProgrammingLanguagesDropdown from '$lib/components/ui/ProgrammingLanguagesDropdown.svelte';
	import { ProgrammingLanguage } from '$lib/models/constants';
	import { animalService } from '$lib/yizySpec/examples/animalServiceSpec';
	import { generateSdkFile } from '$lib/yizySpec/generators/php/sdkGenerator';
	import php from 'svelte-highlight/languages/php';
	import Highlight from 'svelte-highlight';
	import { onMount } from 'svelte';

	export let lang: ProgrammingLanguage = ProgrammingLanguage.Php;

	onMount(() => {
		console.log(generateSdkFile('http://localhost', animalService));
	});
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Client SDK</Card.Title>
		<Card.Description>
			Generate Http Client From the Spec So You Don't Have to Craft Your Own!
		</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
		<ProgrammingLanguagesDropdown defaultLang={ProgrammingLanguage.Php} />
		<div class="not-prose whitespace-pre-wrap rounded-lg bg-[#0d121c] p-2">
			{#if lang === ProgrammingLanguage.Php}
				<Highlight language={php} code={generateSdkFile('http://localhost', animalService)} />
			{/if}
		</div>
	</Card.Content>
</Card.Root>
