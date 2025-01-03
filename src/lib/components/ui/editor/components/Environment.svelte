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
	<input
		use:focusMe
		onkeydown={onBackspacePress}
		placeholder="Environment"
		class="w-full bg-transparent text-sm outline-none placeholder:text-muted"
		bind:value={props.name} />

	<input
		onkeydown={onKeyPress}
		placeholder="http://localhost:5050"
		class="w-full bg-transparent text-sm outline-none placeholder:text-muted"
		bind:value={props.baseUrl} />
</div>
