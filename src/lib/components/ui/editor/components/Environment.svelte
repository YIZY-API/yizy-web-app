<script lang="ts">
	import { onMount } from 'svelte';
	import { type Environment as EnvironmentProps } from '../models/models';
	let {
		props = $bindable({ name: '', baseUrl: '' }),
		shouldFocus = false,
		onAddNewItem,
		onRemove
	}: {
		props?: EnvironmentProps;
		onAddNewItem?: () => void;
		onRemove?: () => void;
		shouldFocus?: boolean;
	} = $props();

	function onBackspacePress(event: KeyboardEvent) {
		if (props.name === '' && event.key === 'Backspace' && onRemove) {
			onRemove();
		}
	}

	function onKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' && onAddNewItem) {
			onAddNewItem();
		}
	}

	function focusMe(el: HTMLElement) {
		if (shouldFocus) {
			el.focus();
		}
	}

	let textarea1: HTMLTextAreaElement;
	let textarea2: HTMLTextAreaElement;
	onMount(() => {
		if (textarea1) {
			textarea1.addEventListener('input', function () {
				textarea1.style.height = '1.2em'; // Reset height
				textarea1.style.height = this.scrollHeight + 'px';
			});
		}

		if (textarea2) {
			textarea2.addEventListener('input', function () {
				textarea2.style.height = '1.2em'; // Reset height
				textarea2.style.height = this.scrollHeight + 'px';
			});
		}
	});
</script>

<div class="ml-2 flex flex-row">
	<textarea
		bind:this={textarea1}
		use:focusMe
		onkeydown={onBackspacePress}
		placeholder="Environment"
		class="min-w-40 bg-transparent text-sm outline-none placeholder:text-muted"
		bind:value={props.name}></textarea>

	<textarea
		bind:this={textarea2}
		onkeydown={onKeyPress}
		placeholder="http://localhost:5050"
		class="min-w-40 bg-transparent text-sm outline-none placeholder:text-muted"
		bind:value={props.baseUrl}></textarea>
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
