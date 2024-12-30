<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import php from 'svelte-highlight/languages/php';
	import HighlightCode from '$lib/components/ui/HighlightCode.svelte';
	import ProgrammingLanguagesDropdown from '$lib/components/ui/ProgrammingLanguagesDropdown.svelte';
	import { generateModelFile } from '$lib/yizySpec/generators/php/generator';
	import { ProgrammingLanguage } from '$lib/models/constants';
	import { type Document, docToYizySpec } from '$lib/components/ui/editor/models/models';

	import { typescript } from 'svelte-highlight/languages';
	import * as tsGen from '$lib/yizySpec/generators/typescript/generator';

	let {
		doc = $bindable(),
		lang = $bindable(ProgrammingLanguage.Typescript)
	}: { doc: Document; lang?: ProgrammingLanguage } = $props();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Models</Card.Title>
		<Card.Description>Request and Response Models in Every Languages</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
		<ProgrammingLanguagesDropdown bind:lang />
		{#if lang === ProgrammingLanguage.Php}
			<HighlightCode language={php} code={generateModelFile(docToYizySpec(doc))} />
		{/if}
		{#if lang === ProgrammingLanguage.Typescript}
			<HighlightCode language={typescript} code={tsGen.generateServerCode(docToYizySpec(doc))} />
		{/if}
	</Card.Content>
</Card.Root>
