<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import php from 'svelte-highlight/languages/php';
	import Highlight from 'svelte-highlight';
	import ProgrammingLanguagesDropdown from '$lib/components/ui/ProgrammingLanguagesDropdown.svelte';
	import { currentService } from '$lib/state';
	import { generateModelFile } from '$lib/yizySpec/generators/php/modelGenerator';
	import { ProgrammingLanguage } from '$lib/models/constants';
	import { typescript } from 'svelte-highlight/languages';
	import * as tsGen from '$lib/yizySpec/generators/typescript/modelGenerator';

	export let lang: ProgrammingLanguage = ProgrammingLanguage.Php;
	let currentLanguage: ProgrammingLanguage = ProgrammingLanguage.Php;

	function onLanguageChange(lang: ProgrammingLanguage) {
		currentLanguage = lang;
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Models</Card.Title>
		<Card.Description>Request and Response Models in Every Languages</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
		<ProgrammingLanguagesDropdown defaultLang={lang} onSelectionChange={onLanguageChange} />
		<div class="whitespace-pre-wrap rounded-lg bg-secondary">
			<div class="rounded-lg bg-[#0d121c] p-2">
				{#if currentLanguage === ProgrammingLanguage.Php}
					<Highlight language={php} code={generateModelFile($currentService)} />
				{/if}
				{#if currentLanguage === ProgrammingLanguage.Typescript}
					<Highlight language={typescript} code={tsGen.generateModelFile($currentService)} />
				{/if}
			</div>
		</div>
	</Card.Content>
</Card.Root>
