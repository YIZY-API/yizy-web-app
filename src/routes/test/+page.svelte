<script lang="ts">
	import { GripVertical, PlusIcon } from 'lucide-svelte';
	import { twMerge } from 'tailwind-merge';
	import { v4 as uuid } from 'uuid';
	interface Environment {
		id: string;
		name: string;
		url: string;
	}
	let envs: Environment[] = [
		{ id: uuid(), name: '', url: 'Item 1' },
		{ id: uuid(), name: '', url: 'Item 2' },
		{ id: uuid(), name: '', url: 'Item 3' }
	];

	let draggedItem: Environment | null = null;
	let currentDropzoneIndex: number | null = null;

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
		const currentItems = envs.filter((item) => item !== draggedItem);
		currentItems.splice(index, 0, draggedItem!);
		envs = currentItems;
	}

	function addNewItem(fromIndex: number) {
		const newItem = {
			id: uuid(),
			name: '',
			url: 'test'
		};

		const updatedItems = [...envs];
		updatedItems.splice(fromIndex, 0, newItem);
		envs = updatedItems;
	}
</script>
