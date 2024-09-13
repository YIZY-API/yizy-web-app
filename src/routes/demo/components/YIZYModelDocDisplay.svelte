<script lang="ts">
	import Highlight from 'svelte-highlight';
	import { field, objectType, type ObjectType } from '$lib/yizySpec/YIZYSpec';
	import { generateModelClass } from '$lib/yizySpec/generators/php/modelGenerator';
	import { onMount } from 'svelte';
	import { ProgrammingLanguage } from '$lib/models/constants';
	//import typescript from 'svelte-highlight/languages/typescript';
	import php from 'svelte-highlight/languages/php';

	export let model: ObjectType = objectType('ExampleModel', [field('exampleField', 'string')]);
	export let lang: ProgrammingLanguage = ProgrammingLanguage.Php;

	let code = '';

	onMount(() => {
		code = generateModelClass(model);
	});
</script>

<div class="not-prose whitespace-pre-wrap rounded-lg bg-[#0d121c] p-2">
	{#if lang === ProgrammingLanguage.Php}
		<Highlight language={php} {code} />
	{/if}
</div>
