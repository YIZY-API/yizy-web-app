<script lang="ts">
	import Highlight from 'svelte-highlight';
	import { field, objectType, type ObjectType } from '$lib/yizySpec/YIZYSpec';
	import * as phpGen from '$lib/yizySpec/generators/php/generator';
	import * as tsGen from '$lib/yizySpec/generators/typescript/generator';
	import { ProgrammingLanguage } from '$lib/models/constants';
	import php from 'svelte-highlight/languages/php';
	import typescript from 'svelte-highlight/languages/typescript';
	import { onMount } from 'svelte';

	export let model: ObjectType | null = objectType('ExampleModel', [
		field('exampleField', 'string')
	]);
	export let lang: ProgrammingLanguage = ProgrammingLanguage.Typescript;

	onMount(() => {
		if (!model) {
			model = objectType('ExampleModel', [field('exampleField', 'string')]);
		}
	});
</script>

<div class="not-prose whitespace-pre-wrap rounded-lg bg-[#0d121c] p-2">
	{#if lang === ProgrammingLanguage.Php && model != null}
		<Highlight language={php} code={phpGen.generateModelClass(model)} />
	{/if}

	{#if lang === ProgrammingLanguage.Typescript && model != null}
		<Highlight language={typescript} code={tsGen.generateModelClass(model)} />
	{/if}
</div>
