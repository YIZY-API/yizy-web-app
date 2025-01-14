<script lang="ts">
	import { type Field as FieldProps } from '../models/models';
	import * as Command from '$lib/components/ui/completion';
	import { lspTypes } from '../state';

	let {
		props = $bindable({ name: '', type: '' }),
		shouldFocus = false,
		onAddNewItem,
		onRemove
	}: {
		props: FieldProps;
		shouldFocus: boolean;
		onAddNewItem?: () => void;
		onRemove?: () => void;
	} = $props();
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
		'boolean[]',
		'double',
		'double?',
		'double[]',
		'float',
		'float?',
		'float[]',
		'int',
		'int?',
		'int[]',
		'int32',
		'int32[]',
		'int32?',
		'int64',
		'int64?',
		'int64[]',
		'string',
		'string?',
		'string[]'
	];

	function init(el: HTMLElement) {
		if (shouldFocus) {
			el.focus();
		}
	}
</script>

<div class="flex w-full flex-row">
	<textarea
		bind:value={props.name}
		placeholder="field"
		onkeydown={onBackspacePress}
		use:init
		class="w-full resize-none break-words border-none border-transparent bg-transparent font-light outline-none placeholder:text-muted active:border-none"
	></textarea>

	<Command.Root class="border-none bg-transparent">
		<Command.Input
			onfocusout={onFocusOut}
			bind:value={props.type}
			placeholder="type"
			class="border-none border-transparent bg-transparent py-0 font-light text-accent outline-none placeholder:text-muted active:border-none"
			onkeydown={onKeyPress} />

		{#if promptOpen}
			<Command.List class="absolute z-10 my-10 max-h-52 max-w-56 rounded-b-lg bg-muted">
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
				<Command.Group heading="Additional Types">
					{#each $lspTypes as type}
						<Command.Item
							onSelect={() => {
								props.type = type;
								promptOpen = false;
							}}>{type}</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		{/if}
	</Command.Root>
</div>

<style>
	textarea {
		field-sizing: content;
		resize: none;
		word-break: break-all;
	}
</style>
