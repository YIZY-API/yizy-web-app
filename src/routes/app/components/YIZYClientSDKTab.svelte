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
	import { typescript } from 'svelte-highlight/languages';

	interface Props {
		lang?: ProgrammingLanguage;
	}

	let { lang = $bindable(ProgrammingLanguage.Typescript) }: Props = $props();

	let url: string = $state('');
	const triggerContent = $derived(
		$currentService.environment.find((f) => f.url === url) ?? 'Select an environment'
	);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Client SDK</Card.Title>
		<Card.Description>
			Generate Http Client From the Spec So You Don't Have to Craft Your Own!
		</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
		<h4>Environment</h4>
		<div class="my-2">
			<Select.Root type="single" name="baseUrl" bind:value={url as string}>
				<Select.Trigger class="w-[300px]">
					{triggerContent}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.GroupHeading>Environments</Select.GroupHeading>
						{#each $currentService.environment as env}
							<Select.Item value={env.url} label={env.url}>{env.name + ': ' + env.url}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</div>
		<ProgrammingLanguagesDropdown bind:lang />
		{#if lang === ProgrammingLanguage.Php}
			<HighlightCode language={php} code={generateSdkFile(url, $currentService)} />
		{/if}
		{#if lang === ProgrammingLanguage.Typescript}
			<HighlightCode language={typescript} code={tsGen.generateSdkFile(url, $currentService)} />
		{/if}
	</Card.Content>
</Card.Root>
