<script lang="ts">
	import { type Field as FieldProps } from '../models/models';
	//import { lspTypes } from '../state';
	import { v4 as uuid } from 'uuid';
	import Complete from './Complete.svelte';
	import { onMount } from 'svelte';

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

	let textarea: HTMLTextAreaElement;
	onMount(() => {
		if (textarea) {
			textarea.addEventListener('input', function () {
				textarea.style.height = '1.4em'; // Reset height
				textarea.style.height = this.scrollHeight + 'px';
			});
		}
	});
</script>

<div class="flex flex-row">
	<textarea
		bind:this={textarea}
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
		min-height: 1.2em; /* Approximately one line of text */
		height: 1.2em; /* Initial height */
		overflow-y: hidden; /* Hide scrollbar initially */
		resize: none; /* Prevent manual resizing */
		box-sizing: border-box;
		padding-top: 2px; /* Remove padding to ensure accurate height */
		line-height: 1.2em; /* Match line-height to height */
	}
</style>
