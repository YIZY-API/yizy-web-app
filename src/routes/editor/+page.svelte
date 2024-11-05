<script lang="ts">
	import EndpointList from './components/EndpointList.svelte';
	import EnvironmentList from './components/EnvironmentList.svelte';
	import FieldList from './components/FieldList.svelte';
	import { type Document } from './models/models';
	import { updateLspTypes } from './state';

	let document: Document = $state({
		name: '',
		description: '',
		environment: [
			{
				name: '',
				baseUrl: ''
			}
		],
		endpoints: [
			{
				name: '',
				url: '',
				description: '',
				req: {
					name: '',
					fields: [
						{
							name: '',
							type: ''
						}
					]
				},
				res: {
					name: '',
					fields: [
						{
							name: '',
							type: ''
						}
					]
				}
			}
		],
		additionalModels: [
			{
				name: '',
				fields: [
					{
						name: '',
						type: ''
					}
				]
			}
		]
	});

	let types = $derived.by(() => {
		return document.additionalModels.flatMap((model) => model.name);
	});

	$effect(() => {
		updateLspTypes(types);
	});
</script>

<div class="w-full pb-48 pt-24">
	<div class="mx-auto grid w-full grid-cols-1 p-2 md:max-w-4xl md:grid-cols-3">
		<div class="col-span-1 md:col-span-2">
			<div class="my-2 border-muted">
				<div class="text-sm font-bold text-primary">Service</div>
				<input
					placeholder="ServiceName"
					class="w-full border-none border-transparent bg-transparent text-2xl font-bold outline-none placeholder:text-muted active:border-none"
					bind:value={document.name} />

				<textarea
					class="w-full resize-none bg-transparent outline-none placeholder:text-muted"
					placeholder="This is an example of a service documentation"
					bind:value={document.description}></textarea>
				<EnvironmentList bind:props={document.environment} />
			</div>
			<div class="my-2 w-full rounded-lg">
				<div class="text-sm font-bold text-primary">Endpoints</div>
				<EndpointList bind:props={document.endpoints} />
			</div>
		</div>
		<div class="col-span-1">
			<div class="my-0 rounded-lg md:my-2">
				<div class="text-sm font-bold text-primary">Additional Models</div>

				{#each document.additionalModels as model}
					<input
						placeholder="ModelName"
						class="text-md w-full border-none border-transparent bg-transparent font-bold outline-none placeholder:text-muted active:border-none"
						bind:value={model.name} />

					<div class="flex w-full flex-row">
						<FieldList bind:props={model.fields} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<button
	onclick={() => {
		console.log(document);
	}}>save</button>

<style>
	textarea {
		field-sizing: content;
		resize: none;
	}
</style>
