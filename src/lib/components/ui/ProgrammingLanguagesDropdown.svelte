<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { ProgrammingLanguage, ProgrammingLanguageList } from '$lib/models/constants';

	interface Props {
		lang?: ProgrammingLanguage;
	}

	let { lang = $bindable(ProgrammingLanguage.Typescript) }: Props = $props();

	const triggerContent = $derived(
		ProgrammingLanguageList.find((f) => f === lang) ?? 'Select a programming language'
	);
</script>

<div class="not-prose px-2">
	<Label class="text-sm font-bold">Programming Language</Label>
	<Select.Root type="single" bind:value={lang as string}>
		<Select.Trigger class="mt-2 w-[300px]">{triggerContent}</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.SelectGroupHeading>Programming Language</Select.SelectGroupHeading>
				{#each ProgrammingLanguageList as lang}
					<Select.Item value={lang} label={typeof lang != 'string' ? 'Typescript' : lang}
						>{lang}</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</div>
