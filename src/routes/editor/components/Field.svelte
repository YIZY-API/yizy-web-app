<script lang="ts" module>
	export interface FieldValue {
		name: string;
		type: string;
	}
</script>

<script lang="ts">
	import * as Command from '$lib/components/ui/command';

	//let search: string = $state('');
	//let name: string = $state('');
	let { props = $bindable({ name: '', type: '' }) }: { props: FieldValue } = $props();

	//let {
	//	onChange
	//}: {
	//	onChange?: (val: FieldValue) => void;
	//} = $props();

	let promptOpen: boolean = $state(false);

	//function onNameOrTypeChange(event: Event) {
	//	console.log('changed!');
	//	if (onChange) {
	//		onChange({
	//			name: name,
	//			type: search
	//		});
	//	}
	//}

	function onKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key == 'Tab' || event.key == 'Escape') {
			promptOpen = false;
			event.stopPropagation();
			return;
		}
		promptOpen = true;
		event.stopPropagation();
		//onNameOrTypeChange(event);
	}

	const primitiveTypes = [
		'boolean',
		'boolean?',
		'double',
		'double?',
		'float',
		'float?',
		'int',
		'int?',
		'int32',
		'int32?',
		'int64',
		'int64?',
		'string',
		'string?'
	];
</script>

<div class="flex w-full flex-row">
	<input
		bind:value={props.name}
		placeholder="field"
		class="text-md flex-grow border-none border-transparent bg-transparent outline-none placeholder:text-muted active:border-none" />
	<Command.Root class="border-none bg-transparent">
		<Command.Input
			bind:value={props.type}
			placeholder="type"
			class="text-md border-none border-transparent bg-transparent py-0 font-semibold text-primary outline-none placeholder:text-muted active:border-none"
			onkeydown={onKeyPress} />

		{#if promptOpen}
			<Command.List class="absolute z-10 my-10 rounded-b-lg bg-muted">
				<Command.Empty class="px-4">No results found.</Command.Empty>
				<Command.Group heading="Primitive Types">
					{#each primitiveTypes as type}
						<Command.Item
							onSelect={() => {
								props.type = type;
								promptOpen = false;
							}}>
							{type}
						</Command.Item>
					{/each}
				</Command.Group>
				<Command.Separator />
				<!--
				<Command.Group heading="Additional Types">
					<Command.Item>UserDefinedModel1</Command.Item>
				</Command.Group>
                -->
			</Command.List>
		{/if}
	</Command.Root>
</div>
