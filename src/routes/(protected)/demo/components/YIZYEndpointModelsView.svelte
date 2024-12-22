<script lang="ts">
	import ProgrammingLanguagesDropdown from '$lib/components/ui/ProgrammingLanguagesDropdown.svelte';
	import { ProgrammingLanguage } from '$lib/models/constants';
	import { objectType, type ObjectType, field } from '@yizy/spec';
	import { onMount } from 'svelte';
	import YizyModelDocDisplay from './YIZYModelDocDisplay.svelte';

	interface Props {
		lang?: ProgrammingLanguage;
		reqModel?: ObjectType | null;
		resModel?: ObjectType | null;
	}

	let {
		lang = ProgrammingLanguage.Typescript,
		reqModel = objectType('ExampleReq', [field('example', 'string')]),
		resModel = objectType('ExampleRes', [field('example', 'string')])
	}: Props = $props();

	let currentLanguage: ProgrammingLanguage = $state(ProgrammingLanguage.Typescript);

	onMount(() => {
		currentLanguage = lang;
		if (reqModel == null) {
			reqModel = objectType('ExampleReq', [field('example', 'string')]);
		}
		if (resModel == null) {
			resModel = objectType('ExampleRes', [field('example', 'string')]);
		}
	});
</script>

<div class="px-2">
	<ProgrammingLanguagesDropdown bind:lang={currentLanguage} />
</div>

<div class="my-2">
	<h4 class="pl-2 font-bold">Request Model</h4>
	<YizyModelDocDisplay model={reqModel} lang={currentLanguage} />
</div>
<div class="my-2">
	<h4 class="pl-2 font-bold">Response Model</h4>
	<YizyModelDocDisplay model={resModel} lang={currentLanguage} />
</div>
