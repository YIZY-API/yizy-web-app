<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	import { onMount } from 'svelte';
	import { createSwapy } from 'swapy';
	import { GripVertical } from 'lucide-svelte';

	onMount(() => {
		const container = document.getElementById('baseUrls');

		const swapy = createSwapy(container, {
			animation: 'dynamic' // or spring or none
		});

		// You can disable and enable it anytime you want
		swapy.enable(true);
	});
	let search: string;
</script>

<div class="w-full pb-8 pt-24">
	<div class="mx-auto grid w-full grid-cols-1 p-2 md:max-w-4xl md:grid-cols-3">
		<div class="col-span-1 md:col-span-2">
			<div class="my-2 border-muted">
				<div class="text-sm font-bold text-primary">Service</div>
				<input
					placeholder="ServiceName"
					class="w-full border-none border-transparent bg-transparent text-2xl font-bold outline-none placeholder:text-muted active:border-none"
				/>

				<div
					class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground"
				>
					Doc
				</div>
				<textarea
					class="w-full bg-transparent outline-none placeholder:text-muted"
					placeholder="This is an example of an service documentation"
				/>
				<div id="baseUrls" class="my-2">
					<div
						class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground"
					>
						Base Urls
					</div>
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
				</div>
			</div>
			<div class="my-2 w-full rounded-lg">
				<div class="text-sm font-bold text-primary">Endpoints</div>

				<input
					placeholder="endpointName"
					class="w-full border-none border-transparent bg-transparent text-xl font-bold outline-none placeholder:text-muted active:border-none"
				/>

				<input
					placeholder="/route/endpointName"
					class="text-md w-full border-none border-transparent bg-transparent font-bold outline-none placeholder:text-muted active:border-none"
				/>

				<textarea
					class="w-full bg-transparent outline-none placeholder:text-muted"
					placeholder="This is an example of an endpoint documentation"
				/>

				<div
					class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground"
				>
					Request
				</div>
				<input
					placeholder="NameOfRequest"
					class="text-md w-full border-none border-transparent bg-transparent font-bold outline-none placeholder:text-muted active:border-none"
				/>

				<div class="flex w-full flex-row">
					<input
						placeholder="field"
						class="text-md w-full flex-grow border-none border-transparent bg-transparent outline-none placeholder:text-muted active:border-none"
					/>
					<Command.Root class="border-none bg-transparent">
						<Command.Input
							bind:value={search}
							placeholder="type"
							class="text-md w-full flex-grow border-none border-transparent bg-transparent text-primary outline-none placeholder:text-muted active:border-none"
						/>
						{#if search != ''}
							<Command.List class="absolute z-10 my-10 rounded-b-lg bg-muted">
								<Command.Empty>No results found.</Command.Empty>
								<Command.Group heading="Primitive Types">
									<Command.Item>int</Command.Item>
									<Command.Item>string</Command.Item>
									<Command.Item>boolean</Command.Item>
								</Command.Group>
								<Command.Separator />
								<Command.Group heading="Additional Types">
									<Command.Item>UserDefinedModel1</Command.Item>
									<Command.Item>UserDefinedModel2</Command.Item>
									<Command.Item>UserDefinedModel3</Command.Item>
								</Command.Group>
							</Command.List>
						{/if}
					</Command.Root>
				</div>
				<div
					class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground"
				>
					Response
				</div>
				<input
					placeholder="NameOfResponse"
					class="text-md w-full border-none border-transparent bg-transparent font-bold outline-none placeholder:text-muted active:border-none"
				/>

				<div class="flex w-full flex-row">
					<input
						placeholder="field"
						class="text-md w-full flex-grow border-none border-transparent bg-transparent outline-none placeholder:text-muted active:border-none"
					/>
					<input
						placeholder="type"
						class="text-md w-full flex-grow border-none border-transparent bg-transparent text-primary outline-none placeholder:text-muted active:border-none"
					/>
				</div>

				<div class="flex w-full flex-row">
					<input
						placeholder="field"
						class="text-md w-full flex-grow border-none border-transparent bg-transparent outline-none placeholder:text-muted active:border-none"
					/>
					<input
						placeholder="type"
						class="text-md w-full flex-grow border-none border-transparent bg-transparent text-primary outline-none placeholder:text-muted active:border-none"
					/>
				</div>
			</div>
		</div>
		<div class="col-span-1">
			<div class="my-0 rounded-lg md:my-2">
				<div class="text-sm font-bold text-primary">Additional Models</div>

				<input
					placeholder="ModelName"
					class="text-md w-full border-none border-transparent bg-transparent font-bold outline-none placeholder:text-muted active:border-none"
				/>

				<div class="flex w-full flex-row">
					<input
						placeholder="field"
						class="text-md w-full flex-grow border-none border-transparent bg-transparent outline-none placeholder:text-muted active:border-none"
					/>
					<input
						placeholder="type"
						class="text-md w-full flex-grow border-none border-transparent bg-transparent text-primary outline-none placeholder:text-muted active:border-none"
					/>
				</div>

				<div class="flex w-full flex-row">
					<input
						placeholder="field"
						class="text-md w-full flex-grow border-none border-transparent bg-transparent outline-none placeholder:text-muted active:border-none"
					/>
					<input
						placeholder="type"
						class="text-md w-full flex-grow border-none border-transparent bg-transparent text-primary outline-none placeholder:text-muted active:border-none"
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	textarea {
		field-sizing: content;
		resize: none;
	}
</style>
