<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import ProgrammingLanguagesDropdown from '$lib/components/ui/ProgrammingLanguagesDropdown.svelte';
	import { ProgrammingLanguage } from '$lib/models/constants';
	import { currentService } from '$lib/state';
	import { generateSdkFile } from '$lib/yizySpec/generators/php/sdkGenerator';
	import * as tsGen from '$lib/yizySpec/generators/typescript/sdkGenerator';
	import php from 'svelte-highlight/languages/php';
	import Highlight from 'svelte-highlight';
	import { onMount } from 'svelte';
	import { typescript } from 'svelte-highlight/languages';

	export let lang: ProgrammingLanguage = ProgrammingLanguage.Php;
	let currentLanguage: ProgrammingLanguage = ProgrammingLanguage.Php;

	onMount(() => {
		currentLanguage = lang;
	});

	function onLanguageChange(lang: ProgrammingLanguage) {
		currentLanguage = lang;
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Client SDK</Card.Title>
		<Card.Description>
			Generate Http Client From the Spec So You Don't Have to Craft Your Own!
		</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
		<ProgrammingLanguagesDropdown defaultLang={lang} onSelectionChange={onLanguageChange} />
		<div class="not-prose whitespace-pre-wrap rounded-lg bg-[#0d121c] p-2">
			{#if currentLanguage === ProgrammingLanguage.Php}
				<Highlight language={php} code={generateSdkFile('http://localhost', $currentService)} />
			{/if}
			{#if currentLanguage === ProgrammingLanguage.Typescript}
				<Highlight
					language={typescript}
					code={tsGen.generateSdkFile('http://localhost', $currentService)}
				/>
			{/if}
		</div>
	</Card.Content>
</Card.Root>
