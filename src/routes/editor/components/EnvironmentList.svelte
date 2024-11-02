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

	let draggedItem: Environment | null = null;
	let currentDropzoneIndex: number | null = $state(null);

	function handleDragStart(e: DragEvent, item: Environment) {
		e.dataTransfer!.setDragImage(document.getElementById(item.id)!, 30, 5);
		draggedItem = item;
		e.dataTransfer!.effectAllowed = 'move';
		(e.target! as HTMLElement).classList.add('dragging');
	}

	function handleDragEnd(e: DragEvent) {
		(e.target! as HTMLElement).classList.remove('dragging');
		draggedItem = null;
		currentDropzoneIndex = null;
	}

	function handleDragOver(e: DragEvent, index: number) {
		e.preventDefault();
		const draggingElement = document.querySelector('.dragging');

		if (draggingElement) {
			currentDropzoneIndex = index;
		}
	}

	function handleDrop(e: DragEvent, index: number) {
		console.log('dropped!');
		const currentItems = envs.filter((item) => item !== draggedItem);
		currentItems.splice(index, 0, draggedItem!);
		envs = currentItems;
	}

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
				<div
					id={item.id}
					role="none"
					class={twMerge(
						'group flex flex-row',
						index === currentDropzoneIndex && 'border-b-2 border-primary'
					)}
					ondragstart={(e) => handleDragStart(e, item)}
					ondragend={(e) => handleDragEnd(e)}
					ondragover={(e) => handleDragOver(e, index)}
					ondrop={(e) => handleDrop(e, index)}>
					<button class="flex h-6 w-4" onclick={() => addNewItem(index + 1)} tabindex="-1">
						<PlusIcon
							class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted" />
					</button>

					<button class="flex h-6 w-4" onclick={() => removeItem(index)} tabindex="-1">
						<TrashIcon
							class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted" />
					</button>

					<div role="list" class="flex h-6 w-4 hover:cursor-grab" draggable={true} tabindex="-1">
						<GripVertical
							class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted" />
					</div>

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
