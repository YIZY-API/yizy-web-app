<script lang="ts">
	import { PlusIcon, TrashIcon } from 'lucide-svelte';
	import { type Model } from '../models/models';
	import AdditionalModel from './AdditionalModel.svelte';

	let {
		props = $bindable([
			{
				name: '',
				fields: [
					{
						name: '',
						type: ''
					}
				]
			}
		])
	}: { props?: Model[] } = $props();

	let lastCreatedIndex: number | null = $state(null);

	function addNewItem(fromIndex: number) {
		lastCreatedIndex = fromIndex;
		const newItem: Model = {
			name: '',
			fields: [
				{
					name: '',
					type: ''
				}
			]
		};
		const updatedItems = [...props];
		updatedItems.splice(fromIndex, 0, newItem);
		props = updatedItems;
		console.log(props);
	}

	function removeItem(fromIndex: number) {
		const updatedItems = [...props];
		if (updatedItems.length === 1) {
			return;
		}
		updatedItems.splice(fromIndex, 1);
		props = updatedItems;
	}
</script>

<div>
	{#key props}
		{#each props as _, index}
			<div role="none" class="group my-auto flex w-full flex-col">
				<div class="flex w-full flex-row">
					<button class="mt-1 flex h-6 w-4" onclick={() => addNewItem(index + 1)} tabindex="-1">
						<PlusIcon
							class="h-4 text-transparent hover:text-muted-foreground focus:text-muted-foreground active:text-muted-foreground group-hover:text-muted-foreground" />
					</button>

					<button class="mt-1 flex h-6 w-4" onclick={() => removeItem(index)} tabindex="-1">
						<TrashIcon
							class="h-4 text-transparent hover:text-muted-foreground focus:text-muted-foreground active:text-muted-foreground group-hover:text-muted-foreground" />
					</button>

					<div class="ml-1 flex-grow">
						<AdditionalModel bind:props={props[index]} shouldFocus={index === lastCreatedIndex} />
					</div>
				</div>
			</div>
		{/each}
	{/key}
</div>
