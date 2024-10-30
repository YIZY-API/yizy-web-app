<script lang="ts">
	import { onMount } from 'svelte';
	import { createSwapy, type SwapEventArray, type Swapy } from 'swapy';
	import { GripVertical, PlusIcon } from 'lucide-svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { writable } from 'svelte/store';

	let items = [
		{ id: '1', val: 'helloA' },
		{ id: '2', val: 'helloB' },
		{ id: '3', val: 'helloC' }
	];

	let slotItemsMap = $state<SwapEventArray>([
		...items.map((item) => ({
			slotId: item.id,
			itemId: item.id
		}))
	]);

	let urlsToDisplay = $derived(
		slotItemsMap.map((item) => {
			return {
				slotId: item.slotId,
				itemId: item.itemId,
				val: items.find((url) => url.id === item.itemId)?.val
			};
		})
	);

	let swapy: Swapy | null = null;
	onMount(() => {
		const container = document.getElementById('baseUrls');
		swapy = createSwapy(container, {
			animation: 'dynamic',
			manualSwap: true,
			swapMode: 'drop'
		});
		swapy.onSwap(({ data }) => {
			if (swapy) {
				swapy!.setData({ array: data.array });
				slotItemsMap = data.array;
			}
		});
	});

	function addUrl() {
		let item = {
			id: uuidv4(),
			val: 'test'
		};
		items = items.concat([item]);

		//const newItems = items
		//	.filter((item) => !slotItemsMap.some((slotItem) => slotItem.itemId === item.id))
		//	.map((item) => ({
		//		slotId: item.id,
		//		itemId: item.id
		//	}));

		//// Remove items from slotItemsMap if they no longer exist in items
		//const withoutRemovedItems = slotItemsMap.filter(
		//	(slotItem) => items.some((item) => item.id === slotItem.itemId) || !slotItem.itemId
		//);

		slotItemsMap = slotItemsMap.concat({
			itemId: item.id,
			slotId: item.id
		});
		if (swapy) {
			swapy.setData({ array: slotItemsMap });
		}
	}
</script>

<div id="baseUrls" class="my-2 w-full">
	<div class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground">
		Base Urls
	</div>
	{#each urlsToDisplay as url}
		<div class="group w-full" data-swapy-slot={url.slotId}>
			<div class="content-a flex w-full flex-row" data-swapy-item={url.itemId}>
				<button class="flex h-6 w-6" onclick={() => addUrl()}>
					<PlusIcon
						class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted"
					/>
				</button>
				<div class="handle flex h-6 w-6" data-swapy-handle>
					<GripVertical
						class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted"
					/>
				</div>
				<div class="flex-grow">
					<input
						placeholder="http://localhost:5050"
						class="w-full bg-transparent outline-none placeholder:text-muted"
						value={url.val}
					/>
				</div>
			</div>
		</div>
	{/each}
	<!--
	<div class="section-1 group w-full" data-swapy-slot="foo">
		<div class="content-a flex w-full flex-row" data-swapy-item="a">
			<div class="handle flex h-6 w-6" data-swapy-handle>
				<GripVertical
					class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted"
				/>
			</div>
			<div class="flex-grow">
				<input
					placeholder="http://localhost:5050"
					class="w-full bg-transparent outline-none placeholder:text-muted"
				/>
			</div>
		</div>
	</div>

	<div class="section-2 w-full" data-swapy-slot="bar">
		<div class="content-b group flex w-full flex-row" data-swapy-item="b">
			<div class="handle flex h-6 w-6" data-swapy-handle>
				<GripVertical
					class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted"
				/>
			</div>
			<div class="flex-grow">
				<input
					placeholder="http://localhost:5050"
					class="w-full bg-transparent outline-none placeholder:text-muted"
				/>
			</div>
		</div>
	</div>

	<div class="section-3 w-full" data-swapy-slot="baz">
		<div class="content-c group flex w-full flex-row" data-swapy-item="c">
			<div class="handle flex h-6 w-6" data-swapy-handle>
				<GripVertical
					class="m-auto h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted"
				/>
			</div>
			<div class="flex-grow">
				<input
					placeholder="http://localhost:5050"
					class="w-full bg-transparent outline-none placeholder:text-muted"
				/>
			</div>
		</div>
	</div>
    -->
</div>
