<script lang="ts">
	import { GripVertical, PlusIcon, TrashIcon } from 'lucide-svelte';
	import { twMerge } from 'tailwind-merge';
	import { v4 as uuid } from 'uuid';
	import Field from './Field.svelte';

	interface FieldProps {
		name: string;
	}

	interface Item {
		id: string;
		field: FieldProps;
	}

	let envs: Item[] = [
		{ id: uuid(), field: { name: '' } },
		{ id: uuid(), field: { name: '' } }
	];

	let draggedItem: Item | null = null;
	let currentDropzoneIndex: number | null = null;

	function handleDragStart(e: DragEvent, item: Item) {
		e.stopPropagation();
		e.dataTransfer!.setDragImage(document.getElementById(item.id)!, 30, 5);
		draggedItem = item;
		e.dataTransfer!.effectAllowed = 'move';
		(e.target! as HTMLElement).classList.add('dragging');
	}

	function handleDragEnd(e: DragEvent) {
		e.stopPropagation();
		(e.target! as HTMLElement).classList.remove('dragging');
		draggedItem = null;
		currentDropzoneIndex = null;
	}

	function handleDragOver(e: DragEvent, index: number) {
		e.stopPropagation();
		const draggingElement = document.querySelector('.dragging');

		if (draggingElement) {
			currentDropzoneIndex = index;
		}
	}

	function handleDrop(e: DragEvent, index: number) {
		e.stopPropagation();
		const currentItems = envs.filter((item) => item !== draggedItem);
		currentItems.splice(index, 0, draggedItem!);
		envs = currentItems;
	}

	function addNewItem(fromIndex: number) {
		const newItem = {
			id: uuid(),
			endpoint: { name: '' }
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

<div class="my-2 w-full">
	<div>
		{#each envs as item, index}
			<div
				id={item.id}
				role="none"
				class={twMerge(
					'group flex flex-col',
					index === currentDropzoneIndex && 'border-b-2 border-primary'
				)}
				ondragstart={(e) => handleDragStart(e, item)}
				ondragend={(e) => handleDragEnd(e)}
				ondragover={(e) => handleDragOver(e, index)}
				ondrop={(e) => handleDrop(e, index)}
			>
				<div class="flex flex-row">
					<button class="my-auto flex h-6 w-4" onclick={() => addNewItem(index + 1)} tabindex="-1">
						<PlusIcon
							class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted"
						/>
					</button>

					<button class="my-auto flex h-6 w-4" onclick={() => removeItem(index)} tabindex="-1">
						<TrashIcon
							class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted"
						/>
					</button>

					<div
						role="list"
						class="my-auto flex h-6 w-4 hover:cursor-grab"
						draggable={true}
						tabindex="-1"
					>
						<GripVertical
							class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted"
						/>
					</div>
					<div class="ml-2 flex-grow">
						<Field />
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
