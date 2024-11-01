<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	let search: string = $state('');

	let promptOpen: boolean = $state(false);

	function onKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key == 'Tab' || event.key == 'Escape') {
			promptOpen = false;
			event.stopPropagation();
			return;
		}
		promptOpen = true;
		event.stopPropagation();
	}

	const primitiveTypes = [
		'boolean',
		'boolean?',
		'double',
		'double?',
		'float',
		'float?',
		'int',
		'int?',
		'int32',
		'int32?',
		'int64',
		'int64?',
		'string',
		'string?'
	];
</script>

<div class="flex w-full flex-row">
	<input
		placeholder="field"
		class="text-md flex-grow border-none border-transparent bg-transparent outline-none placeholder:text-muted active:border-none" />
	<Command.Root class="border-none bg-transparent">
		<Command.Input
			bind:value={search}
			placeholder="type"
			class="text-md border-none border-transparent bg-transparent py-0 font-semibold text-primary outline-none placeholder:text-muted active:border-none"
			onkeydown={onKeyPress} />
		{#if promptOpen}
			<Command.List class="absolute z-10 my-10 rounded-b-lg bg-muted">
				<Command.Empty class="px-4">No results found.</Command.Empty>
				<Command.Group heading="Primitive Types">
					{#each primitiveTypes as type}
						<Command.Item
							onSelect={() => {
								search = type;
								promptOpen = false;
							}}>
							{type}
						</Command.Item>
					{/each}
				</Command.Group>
				<Command.Separator />
				<!--
				<Command.Group heading="Additional Types">
					<Command.Item>UserDefinedModel1</Command.Item>
				</Command.Group>
                -->
			</Command.List>
		{/if}
	</Command.Root>
</div>
