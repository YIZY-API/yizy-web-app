<script lang="ts">
	import { PlusIcon, TrashIcon } from 'lucide-svelte';
	import { twMerge } from 'tailwind-merge';
	import Environment from './Environment.svelte';
	import { type Environment as EnvironmentProps } from '../models/models';

	let { props = $bindable([{ name: '', baseUrl: '' }]) }: { props?: EnvironmentProps[] } = $props();

	let lastCreatedIndex: number | null = $state(null);
	function addNewItem(fromIndex: number) {
		lastCreatedIndex = fromIndex;
		const newItem = {
			name: '',
			baseUrl: ''
		};

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

	function focusNextItem() {
		const focusableElements = Array.from(
			document.querySelectorAll<HTMLElement>(
				'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
			)
		).filter((el) => !el.hasAttribute('disabled') && el.tabIndex >= 0);

		const activeElement = document.activeElement as HTMLElement;
		const currentIndex = focusableElements.indexOf(activeElement);
		const nextIndex = (currentIndex + 1) % focusableElements.length;
		focusableElements[nextIndex].focus();
	}
</script>

<div id="baseUrls" class="my-2 w-full">
	<div class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground">
		Environments
	</div>
	<div class="w-full">
		<div>
			{#key props}
				{#each props as _, index}
					<div role="none" class={twMerge('group flex flex-row')}>
						<button class="flex h-6 w-4" onclick={() => addNewItem(index + 1)} tabindex="-1">
							<PlusIcon
								class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted" />
						</button>

						<button class="flex h-6 w-4" onclick={() => removeItem(index)} tabindex="-1">
							<TrashIcon
								class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted" />
						</button>
						<Environment
							bind:props={props[index]}
							shouldFocus={index === lastCreatedIndex}
							onAddNewItem={() => {
								addNewItem(index + 1);
							}}
							onRemove={() => {
								removeItem(index);
							}} />
					</div>
				{/each}
			{/key}
		</div>
	</div>
</div>
