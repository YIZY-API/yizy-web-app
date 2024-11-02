<script lang="ts">
	import { PlusIcon, TrashIcon } from 'lucide-svelte';
	import { twMerge } from 'tailwind-merge';
	import Field, { type FieldValue } from './Field.svelte';

	let { props = $bindable([{ name: '', type: '' }]) }: { props: FieldValue[] } = $props();

	function addNewItem(fromIndex: number) {
		const newItem = { name: '', type: '' };
		const updatedItems = [...props];
		updatedItems.splice(fromIndex, 0, newItem);
		props = updatedItems;
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

<div class="my-2 w-full">
	<div>
		{#each props as item, index}
			<div role="none" class={twMerge('group flex flex-col')}>
				<div class="flex flex-row">
					<button class="my-auto flex h-6 w-4" onclick={() => addNewItem(index + 1)} tabindex="-1">
						<PlusIcon
							class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted" />
					</button>

					<button class="my-auto flex h-6 w-4" onclick={() => removeItem(index)} tabindex="-1">
						<TrashIcon
							class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted" />
					</button>

					<div class="ml-2 flex-grow">
						<Field bind:props={props[index]}></Field>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
