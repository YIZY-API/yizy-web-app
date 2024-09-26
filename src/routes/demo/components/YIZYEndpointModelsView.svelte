<script lang="ts">
	import ProgrammingLanguagesDropdown from '$lib/components/ui/ProgrammingLanguagesDropdown.svelte';
	import { ProgrammingLanguage } from '$lib/models/constants';
	import { objectType, type ObjectType, field } from '$lib/yizySpec/YIZYSpec';
	import { onMount } from 'svelte';
	import YizyModelDocDisplay from './YIZYModelDocDisplay.svelte';

	export let lang: ProgrammingLanguage = ProgrammingLanguage.Typescript;
	export let reqModel: ObjectType | null = objectType('ExampleReq', [field('example', 'string')]);
	export let resModel: ObjectType | null = objectType('ExampleRes', [field('example', 'string')]);

	let currentLanguage: ProgrammingLanguage = ProgrammingLanguage.Typescript;

	function onLanguageChange(lang: ProgrammingLanguage) {
		currentLanguage = lang;
	}

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

<ProgrammingLanguagesDropdown defaultLang={lang} onSelectionChange={onLanguageChange} />

<div class="my-2">
	<h4 class="pl-2 font-bold">Request Model</h4>
	<YizyModelDocDisplay bind:model={reqModel} bind:lang={currentLanguage} />
</div>
<div class="my-2">
	<h4 class="pl-2 font-bold">Response Model</h4>
	<YizyModelDocDisplay bind:model={resModel} bind:lang={currentLanguage} />
</div>
