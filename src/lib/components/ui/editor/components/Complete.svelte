<script lang="ts">
	import { v4 as uuid } from 'uuid';
	import { documentState } from '../state.svelte';
	import { onMount } from 'svelte';

	let { searchValue = $bindable(''), onNewline }: { searchValue?: string; onNewline?: () => void } =
		$props();

	let open = $state(false);
	let filteredItems = $derived.by(() => {
		return lspTypes.filter((item) => item.toLowerCase().includes(searchValue.toLowerCase()));
	});
	let readyToLoseFocusBecauseNewLineIsCalled = $state(false);

	let selectedEle: HTMLElement | null = $state(null);
	let selectedIndex = $state(0);

	const lspTypes = $derived.by(() => {
		const primitiveTypes = [
			'boolean',
			'boolean?',
			'boolean[]',
			'double',
			'double?',
			'double[]',
			'float',
			'float?',
			'float[]',
			'int',
			'int?',
			'int[]',
			'int32',
			'int32[]',
			'int32?',
			'int64',
			'int64?',
			'int64[]',
			'string',
			'string?',
			'string[]'
		];

		const types = documentState.additionalModels.flatMap((model) => model.name);
		const res: string[] = [];
		types.forEach((t: string) => {
			res.push(t);
			res.push(t + '?');
			res.push(t + '[]');
		});
		return [...primitiveTypes, ...res];
	});

	$effect(() => {
		let captureChange = selectedIndex;
		if (selectedEle) {
			(selectedEle as HTMLElement).scrollIntoView({
				block: 'center'
			});
		}
	});

	$inspect(selectedIndex);

	function closeCompletionMenu() {
		open = false;
		selectedIndex = 0;
	}

	function handleSelect(item: string) {
		searchValue = item;
		closeCompletionMenu();
	}

	async function handleKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'Enter':
				event.preventDefault();
				if (open) {
					if (filteredItems.at(selectedIndex)) {
						handleSelect(filteredItems.at(selectedIndex)!);
					}
				} else {
					if (onNewline) {
						readyToLoseFocusBecauseNewLineIsCalled = true;
						onNewline();
					}
				}
				event.stopPropagation();
				break;

			case 'Escape':
				event.preventDefault();
				closeCompletionMenu();
				event.stopPropagation();
				break;

			case 'ArrowUp':
				if (open) {
					event.preventDefault();
					if (filteredItems.length === 0) {
						break;
					}
					if (selectedIndex - 1 < 0) {
						selectedIndex = filteredItems.length - 1;
					} else {
						selectedIndex = selectedIndex - 1;
					}
					event.stopPropagation();
				}
				break;

			case 'ArrowDown':
				if (open) {
					event.preventDefault();
					if (filteredItems.length === 0) {
						break;
					}
					if (selectedIndex + 1 >= filteredItems.length) {
						selectedIndex = 0;
					} else {
						selectedIndex = selectedIndex + 1;
					}
					event.stopPropagation();
				}
				break;
		}
	}

	let textarea: HTMLTextAreaElement;
	onMount(() => {
		if (textarea) {
			textarea.addEventListener('input', function () {
				textarea.style.height = '1.2em'; // Reset height
				textarea.style.height = this.scrollHeight + 'px';
			});
		}
	});
</script>

<div class="relative">
	<textarea
		bind:this={textarea}
		oninput={() => {
			open = true;
		}}
		onfocusout={async (e) => {
			const nextFocusElement: HTMLElement | null = e.relatedTarget as HTMLElement;
			const id: string | null = nextFocusElement?.id;
			if (id && !id.includes('yizy-comp')) {
				closeCompletionMenu();
			}
		}}
		onkeydown={handleKeyDown}
		bind:value={searchValue}
		placeholder="type"
		class="min-w-44 resize-none bg-transparent outline-none placeholder:text-muted"></textarea>
	{#if open}
		<div class="absolute z-50 max-h-40 min-h-14 w-full overflow-y-auto rounded-b-lg bg-muted p-2">
			{#if filteredItems.length === 0}
				<div class="p-2 text-sm text-muted-foreground">no match found</div>
			{/if}
			<div class="max-h-[200px] overflow-x-hidden overflow-y-hidden pb-4">
				{#each filteredItems as item, index}
					{#if index === selectedIndex}
						<button
							id={'yizy-comp' + uuid()}
							bind:this={selectedEle}
							class="w-full whitespace-normal break-words bg-primary py-2 pl-2 text-left text-sm/4 text-primary-foreground hover:bg-background hover:text-foreground"
							onclick={() => handleSelect(item)}>
							{item}
						</button>
					{:else}
						<button
							id={'yizy-comp' + uuid()}
							class="w-full whitespace-normal break-words py-2 pl-2 text-left text-sm/4 hover:bg-background hover:text-foreground"
							onclick={() => handleSelect(item)}
							onfocus={() => {}}>
							{item}
						</button>
					{/if}
				{/each}
			</div>
		</div>
	{/if}

	<!--
	<Popover bind:open>
		<PopoverContent class="h-[200px] w-[200px] p-0">
			<div class="p-1">
				{#if filteredItems.length === 0}
					<div class="p-2 text-sm text-gray-500">No framework found.</div>
				{/if}
				<div class="max-h-[200px] overflow-y-auto">
					{#each filteredItems as item (item.value)}
						<button
							class="flex w-full items-center p-2 text-left hover:bg-gray-100"
							onclick={() => handleSelect(item)}>
							<CheckIcon
								class="mr-2 h-4 w-4 {selectedItem?.value === item.value
									? 'opacity-100'
									: 'opacity-0'}" />
							{item.label}
						</button>
					{/each}
				</div>
			</div>
		</PopoverContent>
	</Popover>
    -->
</div>

<style>
	textarea {
		field-sizing: content;
		resize: none;
		word-break: break-all;
		min-height: 1.2em; /* Approximately one line of text */
		height: 1.2em; /* Initial height */
		overflow-y: hidden; /* Hide scrollbar initially */
		resize: none; /* Prevent manual resizing */
		box-sizing: border-box;
		padding-top: 2px; /* Remove padding to ensure accurate height */
		line-height: 1.2em; /* Match line-height to height */
	}
</style>
