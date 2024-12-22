<script lang="ts">
	import HighlightCode from '$lib/components/ui/HighlightCode.svelte';
	import { field, objectType, type ObjectType } from '@yizy/spec';
	import * as phpGen from '$lib/yizySpec/generators/php/generator';
	import * as tsGen from '$lib/yizySpec/generators/typescript/generator';
	import { ProgrammingLanguage } from '$lib/models/constants';
	import php from 'svelte-highlight/languages/php';
	import typescript from 'svelte-highlight/languages/typescript';
	import { onMount } from 'svelte';

	interface Props {
		model?: ObjectType | null;
		lang?: ProgrammingLanguage;
	}

	let { model = null, lang = ProgrammingLanguage.Typescript }: Props = $props();

	onMount(() => {
		if (!model) {
			model = objectType('ExampleModel', [field('exampleField', 'string')]);
		}
	});
</script>

{#if lang === ProgrammingLanguage.Php && model != null}
	<HighlightCode language={php} code={phpGen.generateModelClass(model)} />
{/if}

{#if lang === ProgrammingLanguage.Typescript && model != null}
	<HighlightCode language={typescript} code={tsGen.generateModelClass(model)} />
{/if}
