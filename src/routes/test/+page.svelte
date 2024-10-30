<script>
	let items = [
		{ id: 1, text: 'Item 1' },
		{ id: 2, text: 'Item 2' },
		{ id: 3, text: 'Item 3' }
	];

	let draggedItem = null;
	let newItemText = '';
	let showAddForm = false;
	let addAtIndex = null;

	function handleDragStart(e, item) {
		draggedItem = item;
		e.dataTransfer.effectAllowed = 'move';
		e.target.classList.add('dragging');
	}

	function handleDragEnd(e) {
		e.target.classList.remove('dragging');
		draggedItem = null;
	}

	function handleDragOver(e, index) {
		e.preventDefault();
		const draggingElement = document.querySelector('.dragging');

		if (draggingElement) {
			const currentItems = items.filter((item) => item !== draggedItem);
			currentItems.splice(index, 0, draggedItem);
			items = currentItems;
		}
	}

	function showAddFormAt(index) {
		addAtIndex = index;
		showAddForm = true;
	}

	function addNewItem() {
		if (newItemText.trim()) {
			const newItem = {
				id: Math.max(...items.map((item) => item.id)) + 1,
				text: newItemText
			};

			const updatedItems = [...items];
			updatedItems.splice(addAtIndex, 0, newItem);
			items = updatedItems;

			// Reset form
			newItemText = '';
			showAddForm = false;
			addAtIndex = null;
		}
	}

	function cancelAdd() {
		newItemText = '';
		showAddForm = false;
		addAtIndex = null;
	}
</script>

<div class="w-full pb-8 pt-24">
	<div class="list-container">
		{#each items as item, index}
			<div class="list-item-wrapper">
				<!-- Add button above item -->
				<button class="add-button" on:click={() => showAddFormAt(index)}> + </button>

				<!-- List item -->
				<div
					class="list-item"
					draggable={true}
					on:dragstart={(e) => handleDragStart(e, item)}
					on:dragend={handleDragEnd}
					on:dragover={(e) => handleDragOver(e, index)}
				>
					{item.text}
				</div>

				<!-- Add form if shown at this position -->
				{#if showAddForm && addAtIndex === index}
					<div class="add-form">
						<input type="text" bind:value={newItemText} placeholder="Enter new item text" />
						<button on:click={addNewItem}>Add</button>
						<button on:click={cancelAdd}>Cancel</button>
					</div>
				{/if}
			</div>
		{/each}

		<!-- Last add button -->
		<button class="add-button" on:click={() => showAddFormAt(items.length)}> + </button>

		<!-- Add form for last position -->
		{#if showAddForm && addAtIndex === items.length}
			<div class="add-form">
				<input type="text" bind:value={newItemText} placeholder="Enter new item text" />
				<button on:click={addNewItem}>Add</button>
				<button on:click={cancelAdd}>Cancel</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.list-container {
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
		padding: 1rem;
	}

	.list-item-wrapper {
		position: relative;
		margin: 0.5rem 0;
	}

	.list-item {
		padding: 1rem;
		background: #fff;
		color: black;
		border: 1px solid #ddd;
		border-radius: 4px;
		cursor: grab;
		user-select: none;
	}

	.list-item.dragging {
		opacity: 0.5;
		cursor: grabbing;
	}

	.add-button {
		display: block;
		width: 100%;
		padding: 0.25rem;
		background: #f0f0f0;
		border: 1px dashed #ccc;
		border-radius: 4px;
		cursor: pointer;
		color: black;
	}

	.add-button:hover {
		background: #e0e0e0;
	}

	.add-form {
		margin: 0.5rem 0;
		padding: 1rem;
		background: #f8f8f8;
		border-radius: 4px;
	}

	.add-form input {
		width: 100%;
		padding: 0.5rem;
		margin-bottom: 0.5rem;
		border: 1px solid #ddd;
		border-radius: 4px;
	}

	.add-form button {
		margin-right: 0.5rem;
		padding: 0.5rem 1rem;
		background: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.add-form button:last-child {
		background: #6c757d;
	}

	.add-form button:hover {
		opacity: 0.9;
	}
</style>
