<script lang="ts" module>
	export interface FieldValue {
		name: string;
		type: string;
	}
</script>

<script lang="ts">
	import * as Command from '$lib/components/ui/completion';

	let {
		props = $bindable({ name: '', type: '' }),
		onAddNewItem,
		onRemove
	}: { props: FieldValue; onAddNewItem?: () => void; onRemove?: () => void } = $props();
	let promptOpen: boolean = $state(false);

	function onFocusOut() {
		promptOpen = false;
	}

	function onBackspacePress(event: KeyboardEvent) {
		if (props.name === '' && event.key === 'Backspace' && onRemove) {
			onRemove();
		}
	}

	function onKeyPress(event: KeyboardEvent) {
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Escape') {
			//let event propagate
			return;
		}
		if (event.key === 'Enter' && promptOpen) {
			promptOpen = false;
			return;
		}
		if (event.key === 'Enter' && promptOpen === false && onAddNewItem) {
			onAddNewItem();
			return;
		}
		promptOpen = true;
		event.stopPropagation();
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
	function focusMe(el: HTMLElement) {
		el.focus();
	}
</script>

<div class="flex w-full flex-row">
	<input
		use:focusMe
		bind:value={props.name}
		placeholder="field"
		onkeydown={onBackspacePress}
		class="text-md flex-grow border-none border-transparent bg-transparent outline-none placeholder:text-muted active:border-none" />
	<Command.Root class="border-none bg-transparent">
		<Command.Input
			onfocusout={onFocusOut}
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
