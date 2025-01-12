<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	import { ProgrammingLanguage } from '$lib/models/constants';
	import * as tsFunctionalGen from '$lib/yizySpec/generators/browser-functional-typescript/generator';
	import * as tsOopGen from '$lib/yizySpec/generators/browser-object-oriented-typescript/generator';
	import HighlightCode from '$lib/components/ui/HighlightCode.svelte';
	import { typescript } from 'svelte-highlight/languages';
	import { currentService } from '$lib/state';

	interface Props {
		lang?: ProgrammingLanguage;
	}

	//let url: string = $state($currentService.environment[0].url ?? '');
	//const triggerContent = $derived.by(() => {
	//	return $currentService.environment.find((e) => e.url === url)
	//		? $currentService.environment.find((e) => e.url === url)?.name +
	//				': ' +
	//				$currentService.environment.find((e) => e.url === url)?.url
	//		: 'Select an environment';
	//});

	type GeneratorType = 'browser-oop-typescript' | 'browser-functional-typescript';
	let generator: GeneratorType = $state('browser-oop-typescript');
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Client SDK</Card.Title>
		<Card.Description>
			Generate Http Client From the Spec So You Don't Have to Craft Your Own!
		</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
		<!--
		<Label class="text-sm font-bold">Environment</Label>
		<div class="my-2">
			<Select.Root
				type="single"
				name="baseUrl"
				bind:value={url as string}
				onValueChange={(val) => {
					if (val != '') {
						url = val;
					}
				}}
				controlledValue={true}>
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
        -->
		<!--
		{#if lang === ProgrammingLanguage.Php}
			<HighlightCode language={php} code={generateSdkFile($currentService)} />
		{/if}
        -->
		<Label class="text-sm font-bold">Programming Language</Label>
		<Select.Root
			type="single"
			bind:value={generator}
			onValueChange={(val: string) => {
				generator = val as GeneratorType;
			}}
			controlledValue={true}>
			<Select.Trigger class="mt-2 w-[300px]">{generator}</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.SelectGroupHeading>Programming Language</Select.SelectGroupHeading>
					<Select.Item value={'browser-oop-typescript'} label={'browser-oop-typescript'}
						>{'browser-oop-typescript'}</Select.Item>
					<Select.Item
						value={'browser-functional-typescript'}
						label={'browser-functional-typescript'}>{'browser-functional-typescript'}</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select.Root>
		{#if generator === 'browser-oop-typescript'}
			<HighlightCode language={typescript} code={tsOopGen.generateSdkFile($currentService)} />
		{/if}

		{#if generator === 'browser-functional-typescript'}
			<HighlightCode
				language={typescript}
				code={tsFunctionalGen.generateSdkFile($currentService)} />
		{/if}
	</Card.Content>
</Card.Root>
