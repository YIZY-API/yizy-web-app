<script lang="ts">
	import { type Field as FieldProps } from '../models/models';
	//import { lspTypes } from '../state';
	import { v4 as uuid } from 'uuid';
	import Complete from './Complete.svelte';

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

	function onBackspacePress(event: KeyboardEvent) {
		if (props.name === '' && event.key === 'Backspace' && onRemove) {
			onRemove();
		}
	}

	function init(el: HTMLElement) {
		if (shouldFocus) {
			el.focus();
		}
	}
</script>

<div class="flex flex-row">
	<textarea
		id={'yizy-comp' + uuid()}
		bind:value={props.name}
		placeholder="field"
		onkeydown={onBackspacePress}
		use:init
		class="min-w-44 border-none border-transparent bg-transparent font-light outline-none placeholder:text-muted active:border-none"
	></textarea>
	<Complete bind:searchValue={props.type} onNewline={onAddNewItem} />
</div>

<style>
	textarea {
		field-sizing: content;
		resize: none;
		word-break: break-all;
	}
</style>
