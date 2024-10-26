<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import ProgrammingLanguagesDropdown from '$lib/components/ui/ProgrammingLanguagesDropdown.svelte';
	import { ProgrammingLanguage } from '$lib/models/constants';
	import { currentService } from '$lib/state';
	import { generateSdkFile } from '$lib/yizySpec/generators/php/generator';
	import * as tsGen from '$lib/yizySpec/generators/typescript/generator';
	import php from 'svelte-highlight/languages/php';
	import HighlightCode from '$lib/components/ui/HighlightCode.svelte';
	import { onMount } from 'svelte';
	import { typescript } from 'svelte-highlight/languages';

	interface Props {
		lang?: ProgrammingLanguage;
	}

	let { lang = ProgrammingLanguage.Typescript }: Props = $props();
	let currentLanguage: ProgrammingLanguage = $state(ProgrammingLanguage.Typescript);

	onMount(() => {
		currentLanguage = lang;
		currentBaseUrl = $currentService.baseUrls[0];
	});

	function onLanguageChange(lang: ProgrammingLanguage) {
		currentLanguage = lang;
	}

	let currentBaseUrl: string = $state('https://localhost/');

	function onBaseUrlChange(val: unknown) {
		const typedResult: { value: string; label: string } = val as { value: string; label: string };
		currentBaseUrl = typedResult.value;
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
		<h4>Base Url</h4>
		<div class="my-2">
			<Select.Root
				portal={null}
				selected={{
					value: $currentService.baseUrls[0],
					label: $currentService.baseUrls[0]
				}}
				onSelectedChange={onBaseUrlChange}
			>
				<Select.Trigger class="w-[300px]">
					<Select.Value placeholder="Select a base url" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Base Urls</Select.Label>
						{#each $currentService.baseUrls as url}
							<Select.Item value={url} label={url}>{url}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="favoriteUrl" />
			</Select.Root>
		</div>
		<ProgrammingLanguagesDropdown defaultLang={lang} onSelectionChange={onLanguageChange} />
		{#if currentLanguage === ProgrammingLanguage.Php}
			<HighlightCode language={php} code={generateSdkFile(currentBaseUrl, $currentService)} />
		{/if}
		{#if currentLanguage === ProgrammingLanguage.Typescript}
			<HighlightCode
				language={typescript}
				code={tsGen.generateSdkFile(currentBaseUrl, $currentService)}
			/>
		{/if}
	</Card.Content>
</Card.Root>
