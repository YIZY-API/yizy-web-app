<script lang="ts">
	import { PlusIcon, TrashIcon } from 'lucide-svelte';
	import { twMerge } from 'tailwind-merge';
	import Field from './Field.svelte';
	import { type Field as FieldProps } from '../models/models';

	let { props = $bindable([{ name: '', type: '' }]) }: { props?: FieldProps[] } = $props();

	function focusPrevItem() {
		const focusableElements = Array.from(
			document.querySelectorAll<HTMLElement>(
				'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
			)
		).filter((el) => !el.hasAttribute('disabled') && el.tabIndex >= 0);

		const activeElement = document.activeElement as HTMLElement;
		const currentIndex = focusableElements.indexOf(activeElement);
		const prevIndex = currentIndex - 1;
		if (prevIndex > 0) {
			focusableElements[prevIndex].focus();
		}
	}

	let lastCreatedIndex: number | null = $state(null);

	function addNewItem(fromIndex: number) {
		lastCreatedIndex = fromIndex;
		const newItem = { name: '', type: '' };
		const updatedItems = [...props];
		updatedItems.splice(fromIndex, 0, newItem);
		props = updatedItems;
	}

	function removeItem(fromIndex: number) {
		focusPrevItem();
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
						{#key props}
							<Field
								bind:props={props[index]}
								shouldFocus={index === lastCreatedIndex}
								onAddNewItem={() => {
									addNewItem(index + 1);
								}}
								onRemove={() => {
									removeItem(index);
								}}></Field>
						{/key}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
