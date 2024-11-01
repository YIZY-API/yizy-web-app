<script lang="ts">
	import { GripVertical, PlusIcon, TrashIcon } from 'lucide-svelte';
	import { twMerge } from 'tailwind-merge';
	import { v4 as uuid } from 'uuid';
	import Endpoint from './Endpoint.svelte';

	interface EndpointProps {
		name: string;
	}

	interface Item {
		id: string;
		endpoint: EndpointProps;
	}

	let envs: Item[] = [
		{ id: uuid(), endpoint: { name: '' } },
		{ id: uuid(), endpoint: { name: '' } }
	];

	let draggedItem: Item | null = null;
	let currentDropzoneIndex: number | null = null;

	function handleDragStart(e: DragEvent, item: Item) {
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
					'group my-auto flex flex-col',
					index === currentDropzoneIndex && 'border-b-2 border-primary'
				)}
				ondragstart={(e) => handleDragStart(e, item)}
				ondragend={(e) => handleDragEnd(e)}
				ondragover={(e) => handleDragOver(e, index)}
				ondrop={(e) => handleDrop(e, index)}
			>
				<div class="flex flex-row">
					<button class="mt-2 flex h-6 w-4" onclick={() => addNewItem(index + 1)} tabindex="-1">
						<PlusIcon
							class="h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted"
						/>
					</button>

					<button class="mt-2 flex h-6 w-4" onclick={() => removeItem(index)} tabindex="-1">
						<TrashIcon
							class="h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted"
						/>
					</button>

					<div
						role="list"
						class="mt-2 flex h-6 w-4 hover:cursor-grab"
						draggable={true}
						tabindex="-1"
					>
						<GripVertical
							class="h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted"
						/>
					</div>
					<div class="ml-2 flex-grow">
						<Endpoint />
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
