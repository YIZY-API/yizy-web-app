<script lang="ts">
	import { GripVertical, PlusIcon } from 'lucide-svelte';
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

	function handleDragStart(e: DragEvent, item: Item) {
		draggedItem = item;
		e.dataTransfer!.effectAllowed = 'move';
		e.target.classList.add('dragging');
	}

	function handleDragEnd(e: DragEvent) {
		e.target.classList.remove('dragging');
		draggedItem = null;
	}

	function handleDragOver(e: DragEvent, index: number) {
		e.preventDefault();
		const draggingElement = document.querySelector('.dragging');

		if (draggingElement) {
			const currentItems = items.filter((item) => item !== draggedItem);
			currentItems.splice(index, 0, draggedItem!);
			items = currentItems;
		}
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
			<div class=" group flex flex-row">
				<button class="flex h-6 w-6" onclick={() => addNewItem(index + 1)}>
					<PlusIcon
						class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted"
					/>
				</button>

				<div
					role="list"
					class="flex h-6 w-6 hover:cursor-grab"
					draggable={true}
					ondragstart={(e) => handleDragStart(e, item)}
					ondragend={handleDragEnd}
					ondragover={(e) => handleDragOver(e, index)}
				>
					<GripVertical
						class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted"
					/>
				</div>

				<!-- List item -->
				<div>
					{item.text}
				</div>
			</div>
		{/each}
	</div>
</div>
