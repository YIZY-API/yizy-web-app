<script lang="ts">
	import { GripVertical, PlusIcon, TrashIcon } from 'lucide-svelte';
	import { twMerge } from 'tailwind-merge';
	import { v4 as uuid } from 'uuid';

	interface Environment {
		id: string;
		name: string;
		url: string;
	}

	let envs: Environment[] = $state([
		{ id: uuid(), name: '', url: '' },
		{ id: uuid(), name: '', url: '' }
	]);

	function addNewItem(fromIndex: number) {
		const newItem = {
			id: uuid(),
			name: '',
			url: ''
		};

		const updatedItems = [...envs];
		updatedItems.splice(fromIndex, 0, newItem);
		envs = updatedItems;
	}

	function removeItem(fromIndex: number) {
		const updatedItems = [...envs];
		if (updatedItems.length === 1) {
			return;
		}
		updatedItems.splice(fromIndex, 1);
		envs = updatedItems;
	}
</script>

<div id="baseUrls" class="my-2 w-full">
	<div class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground">
		Environments
	</div>
	<div class="w-full">
		<div>
			{#each envs as item, index}
				<div id={item.id} role="none" class={twMerge('group flex flex-row')}>
					<button class="flex h-6 w-4" onclick={() => addNewItem(index + 1)} tabindex="-1">
						<PlusIcon
							class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted" />
					</button>

					<button class="flex h-6 w-4" onclick={() => removeItem(index)} tabindex="-1">
						<TrashIcon
							class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted" />
					</button>

					<div class="ml-2 flex flex-row">
						<input
							placeholder="Environment"
							class="w-full bg-transparent font-semibold outline-none placeholder:text-muted"
							bind:value={item.name} />

						<input
							placeholder="http://localhost:5050"
							class="w-full bg-transparent outline-none placeholder:text-muted"
							bind:value={item.url} />
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
