<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import php from 'svelte-highlight/languages/php';
	import HighlightCode from '$lib/components/ui/HighlightCode.svelte';
	import ProgrammingLanguagesDropdown from '$lib/components/ui/ProgrammingLanguagesDropdown.svelte';
	import { currentService } from '$lib/state';
	import { generateModelFile } from '$lib/yizySpec/generators/php/generator';
	import { ProgrammingLanguage } from '$lib/models/constants';

	import { typescript } from 'svelte-highlight/languages';
	import * as tsGen from '$lib/yizySpec/generators/typescript/generator';

	interface Props {
		lang?: ProgrammingLanguage;
	}

	let { lang = $bindable(ProgrammingLanguage.Typescript) }: Props = $props();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Models</Card.Title>
		<Card.Description>Request and Response Models in Every Languages</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
		<ProgrammingLanguagesDropdown bind:lang />
		{#if lang === ProgrammingLanguage.Php}
			<HighlightCode language={php} code={generateModelFile($currentService)} />
		{/if}
		{#if lang === ProgrammingLanguage.Typescript}
			<HighlightCode language={typescript} code={tsGen.generateServerCode($currentService)} />
		{/if}
	</Card.Content>
</Card.Root>
