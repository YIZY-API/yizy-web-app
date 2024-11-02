<script lang="ts">
	import { GripVertical, PlusIcon, TrashIcon } from 'lucide-svelte';
	import { twMerge } from 'tailwind-merge';
	import { v4 as uuid } from 'uuid';
	import Field, { type FieldValue } from './Field.svelte';

	let componentId: string = uuid();

	interface Item {
		id: string;
		field: FieldValue;
		dropzoneId: string;
	}

	let items: Item[] = $state([
		{ id: uuid(), field: { name: '', type: '' }, dropzoneId: componentId },
		{ id: uuid(), field: { name: '', type: '' }, dropzoneId: componentId }
	]);

	let draggedItem: Item | null = $state(null);
	let currentDropzoneIndex: number | null = $state(null);

	function handleDragStart(e: DragEvent, item: Item) {
		e.dataTransfer!.setDragImage(document.getElementById(item.id)!, 30, 5);
		draggedItem = item;
		e.dataTransfer!.effectAllowed = 'move';
		(e.target! as HTMLElement).classList.add('dragging');
	}

	function handleDragOver(e: DragEvent, index: number) {
		if (draggedItem?.dropzoneId == componentId) {
			console.log('dragover: same parent');
			e.preventDefault(); //only allow being drop on if same parent
			const draggingElement = document.querySelector('.dragging');

			if (draggingElement) {
				currentDropzoneIndex = index;
			}
		} else {
			console.log('dragover: different parent');
		}
		e.stopPropagation();
	}

	function handleDrop(e: DragEvent, index: number) {
		if (draggedItem?.dropzoneId == componentId) {
			console.log('drop: same parent');
			e.preventDefault();
			const currentItems = items.filter((item) => item !== draggedItem);
			currentItems.splice(index, 0, draggedItem!);
			items = currentItems;
		} else {
			console.log('drop: different');
		}
	}

	function handleDragEnd(e: DragEvent) {
		(e.target! as HTMLElement).classList.remove('dragging');
		draggedItem = null;
		currentDropzoneIndex = null;
	}

	function addNewItem(fromIndex: number) {
		const newItem = { id: uuid(), field: { name: '', type: '' }, dropzoneId: componentId };
		const updatedItems = [...items];
		updatedItems.splice(fromIndex, 0, newItem);
		items = updatedItems;
	}

	function removeItem(fromIndex: number) {
		const updatedItems = [...items];
		if (updatedItems.length === 1) {
			return;
		}
		updatedItems.splice(fromIndex, 1);
		items = updatedItems;
	}
</script>

<div class="my-2 w-full">
	<div>
		{#each items as item, index}
			<div
				id={item.id}
				role="none"
				class={twMerge(
					'group flex flex-col',
					index === currentDropzoneIndex && 'border-b-2 border-primary'
				)}
				ondragover={(e) => handleDragOver(e, index)}
				ondragend={(e) => handleDragEnd(e)}
				ondrop={(e) => handleDrop(e, index)}>
				<div class="flex flex-row">
					<button class="my-auto flex h-6 w-4" onclick={() => addNewItem(index + 1)} tabindex="-1">
						<PlusIcon
							class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted" />
					</button>

					<button class="my-auto flex h-6 w-4" onclick={() => removeItem(index)} tabindex="-1">
						<TrashIcon
							class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted" />
					</button>

					<div
						role="list"
						ondragstart={(e) => handleDragStart(e, item)}
						class="my-auto flex h-6 w-4 hover:cursor-grab"
						draggable={true}
						tabindex="-1">
						<GripVertical
							class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted" />
					</div>
					<div class="ml-2 flex-grow">
						<Field bind:search={item.field.type} bind:name={item.field.name}></Field>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
