<script lang="ts">
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
</script>

<div class="ml-2 flex flex-row">
	<textarea
		use:focusMe
		onkeydown={onBackspacePress}
		placeholder="Environment"
		class="min-w-40 bg-transparent text-sm outline-none placeholder:text-muted"
		bind:value={props.name}></textarea>

	<textarea
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
	}
</style>
