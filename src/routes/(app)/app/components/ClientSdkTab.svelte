<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	//import { generateSdkFile } from '$lib/yizySpec/generators/php/generator';
	//import * as tsGen from '$lib/yizySpec/generators/browser-functional-typescript/generator';
	import * as tsFunctionalGen from '$lib/yizySpec/generators/browser-functional-typescript/generator';
	import * as tsOopGen from '$lib/yizySpec/generators/browser-object-oriented-typescript/generator';
	//import php from 'svelte-highlight/languages/php';
	import HighlightCode from '$lib/components/ui/HighlightCode.svelte';
	import { typescript } from 'svelte-highlight/languages';
	import { type Document, docToYizySpec } from '$lib/components/ui/editor/models/models';

	let { doc = $bindable(), version }: { doc: Document; version?: string } = $props();

	type GeneratorType = 'browser-oop-typescript' | 'browser-functional-typescript';
	let generator: GeneratorType = $state('browser-oop-typescript');

	//let url: string = $state(docToYizySpec(doc).environment[0].url ?? '');
	//const triggerContent = $derived.by(() => {
	//	return docToYizySpec(doc).environment.find((e) => e.url === url)
	//		? docToYizySpec(doc).environment.find((e) => e.url === url)?.name +
	//				': ' +
	//				docToYizySpec(doc).environment.find((e) => e.url === url)?.url
	//		: 'Select an environment';
	//});
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Client SDK</Card.Title>
		<Card.Description>
			Generate Http Client From the Spec So You Don't Have to Craft Your Own!
		</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
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
		<!--
		{#if lang === ProgrammingLanguage.Php}
			<HighlightCode language={php} code={generateSdkFile(url, docToYizySpec(doc))} />
		{/if}
        -->
		{#if generator === 'browser-oop-typescript'}
			<HighlightCode
				language={typescript}
				code={tsOopGen.generateSdkFile(docToYizySpec(doc), version)} />
		{/if}

		{#if generator === 'browser-functional-typescript'}
			<HighlightCode
				language={typescript}
				code={tsFunctionalGen.generateSdkFile(docToYizySpec(doc), version)} />
		{/if}
	</Card.Content>
</Card.Root>
