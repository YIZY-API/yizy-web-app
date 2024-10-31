<script lang="ts">
	import { GripVertical, PlusIcon } from 'lucide-svelte';
	import { twMerge } from 'tailwind-merge';
	//import { v4 as uuidv4 } from 'uuid';
	interface Item {
		id: number;
		text: string;
	}
	let items: Item[] = [
		{ id: 1, text: 'Item 1' },
		{ id: 2, text: 'Item 2' },
		{ id: 3, text: 'Item 3' }
	];

	let draggedItem: Item | null = null;
	let currentDropzoneIndex: number | null = null;

	function handleDragStart(e: DragEvent, item: Item) {
		e.dataTransfer!.setDragImage(document.getElementById(item.id.toString())!, 30, 5);
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
		const currentItems = items.filter((item) => item !== draggedItem);
		currentItems.splice(index, 0, draggedItem!);
		items = currentItems;
	}

	function addNewItem(fromIndex: number) {
		const newItem = {
			id: Math.max(...items.map((item) => item.id)) + 1,
			text: 'test'
		};

		const updatedItems = [...items];
		updatedItems.splice(fromIndex, 0, newItem);
		items = updatedItems;
	}
</script>

<div class="w-full pb-8 pt-24">
	<div>
		{#each items as item, index}
			<div
				id={item.id.toString()}
				role="none"
				class={twMerge(
					'group flex flex-row',
					index === currentDropzoneIndex && 'border-b-2 border-primary'
				)}
				ondragstart={(e) => handleDragStart(e, item)}
				ondragend={(e) => handleDragEnd(e)}
				ondragover={(e) => handleDragOver(e, index)}
				ondrop={(e) => handleDrop(e, index)}
			>
				<button class="flex h-6 w-6" onclick={() => addNewItem(index + 1)}>
					<PlusIcon
						class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted"
					/>
				</button>

				<div role="list" class="flex h-6 w-6 hover:cursor-grab" draggable={true}>
					<GripVertical
						class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted"
					/>
				</div>

				<div>
					{item.text}
				</div>
			</div>
		{/each}
	</div>
</div>
