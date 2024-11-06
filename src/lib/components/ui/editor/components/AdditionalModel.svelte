<script lang="ts">
	import FieldList from './FieldList.svelte';
	import { type Model } from '../models/models';

	let {
		props = $bindable({
			name: '',
			fields: []
		})
	}: { props: Model } = $props();
</script>

<input
	placeholder="ModelName"
	class="w-full border-none border-transparent bg-transparent font-light text-accent outline-none placeholder:text-muted active:border-none"
	bind:value={props.name} />

<div class="flex w-full flex-row">
	<FieldList bind:props={props.fields} />
</div>
