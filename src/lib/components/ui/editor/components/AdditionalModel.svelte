<script lang="ts">
	import FieldList from './FieldList.svelte';
	import { type Model } from '../models/models';

	let {
		props = $bindable({
			name: '',
			fields: []
		}),
		shouldFocus = false,
		lspTypes
	}: { props: Model; shouldFocus?: boolean; lspTypes: string[] } = $props();

	function init(el: HTMLElement) {
		if (shouldFocus) {
			el.focus();
		}
	}
</script>

<input
	placeholder="ModelName"
	class="w-full border-none border-transparent bg-transparent font-light text-accent outline-none placeholder:text-muted active:border-none"
	bind:value={props.name}
	use:init />

<div class="flex w-full flex-row">
	<FieldList bind:props={props.fields} {lspTypes} />
</div>
