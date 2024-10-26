<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { ProgrammingLanguage, ProgrammingLanguageList } from '$lib/models/constants';

	type onSelectionChangeFunc = (val: ProgrammingLanguage) => void;
	interface Props {
		defaultLang?: ProgrammingLanguage;
		onSelectionChange?: onSelectionChangeFunc | undefined;
	}

	let { defaultLang = ProgrammingLanguage.Php, onSelectionChange = undefined }: Props = $props();

	function _onSelectionChange(val: unknown) {
		if (onSelectionChange) {
			const typedResult: { value: string; label: string } = val as { value: string; label: string };
			onSelectionChange(typedResult.value as ProgrammingLanguage);
		}
	}
</script>

<div class="not-prose">
	<Label class="text-sm font-bold">Programming Language</Label>
	<Select.Root
		onSelectedChange={_onSelectionChange}
		portal={null}
		selected={{
			value: defaultLang.toString(),
			label: defaultLang.toString()
		}}
	>
		<Select.Trigger class="mt-2 w-[300px]">
			<Select.Value placeholder="Select a programming language" />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.Label>Programming Language</Select.Label>
				{#each ProgrammingLanguageList as lang}
					<Select.Item value={lang} label={typeof lang != 'string' ? 'Typescript' : lang}
						>{lang}</Select.Item
					>
				{/each}
			</Select.Group>
		</Select.Content>
		<Select.Input name="favoriteLang" />
	</Select.Root>
</div>
