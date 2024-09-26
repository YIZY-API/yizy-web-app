<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import ProgrammingLanguagesDropdown from '$lib/components/ui/ProgrammingLanguagesDropdown.svelte';
	import { ProgrammingLanguage } from '$lib/models/constants';
	import { currentService } from '$lib/state';
	import { generateSdkFile } from '$lib/yizySpec/generators/php/generator';
	import * as tsGen from '$lib/yizySpec/generators/typescript/generator';
	import php from 'svelte-highlight/languages/php';
	import Highlight from 'svelte-highlight';
	import { onMount } from 'svelte';
	import { typescript } from 'svelte-highlight/languages';

	export let lang: ProgrammingLanguage = ProgrammingLanguage.Typescript;
	let currentLanguage: ProgrammingLanguage = ProgrammingLanguage.Typescript;

	onMount(() => {
		currentLanguage = lang;
		currentBaseUrl = $currentService.baseUrls[0];
	});

	function onLanguageChange(lang: ProgrammingLanguage) {
		currentLanguage = lang;
	}

	let currentBaseUrl: string = 'https://localhost/';

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
		<div class="not-prose whitespace-pre-wrap rounded-lg bg-[#0d121c] p-2">
			{#if currentLanguage === ProgrammingLanguage.Php}
				<Highlight language={php} code={generateSdkFile(currentBaseUrl, $currentService)} />
			{/if}
			{#if currentLanguage === ProgrammingLanguage.Typescript}
				<Highlight
					language={typescript}
					code={tsGen.generateSdkFile(currentBaseUrl, $currentService)}
				/>
			{/if}
		</div>
	</Card.Content>
</Card.Root>
