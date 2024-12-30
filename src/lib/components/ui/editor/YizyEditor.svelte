<script lang="ts">
	import { onMount, tick } from 'svelte';
	import EndpointList from './components/EndpointList.svelte';
	import EnvironmentList from './components/EnvironmentList.svelte';
	import { docToYizySpec, type Document } from './models/models';
	import { updateLspTypes } from './state';
	import AdditionalModelList from './components/AdditionalModelList.svelte';
	import type { Service } from '@yizy/spec';

	let { doc = $bindable() }: { doc?: Document } = $props();

	export function toYizySpec(): Service {
		if (document) {
			return docToYizySpec(document);
		}
		throw new Error('doc is not defined!');
	}

	const defaultState: Document = {
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
	};

	export function reset(): void {
		document = defaultState;
	}

	export function updateDoc(doc: Document): void {
		document = doc;
	}

	let firstEditableItem: HTMLElement;
	onMount(async () => {
		if (doc) {
			document = doc;
			await tick();
			firstEditableItem.focus();
		}
	});

	let document: Document = $state(defaultState);

	let types = $derived.by(() => {
		return document.additionalModels.flatMap((model) => model.name);
	});

	$effect(() => {
		updateLspTypes(types);
	});
</script>

<div class="w-full pb-20">
	<div class="mx-auto grid w-full grid-cols-1 rounded-lg lg:grid-cols-5 lg:gap-2">
		<div class="col-span-1 rounded-lg px-6 pr-10 pt-4 lg:col-span-3 lg:pb-4">
			<div class="mt-4 border-muted lg:mb-2">
				<div
					class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground">
					Service
				</div>
				<input
					bind:this={firstEditableItem}
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
				<div
					class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground">
					Endpoints
				</div>
				<EndpointList bind:props={document.endpoints} />
			</div>
		</div>
		<div class="col-span-1 rounded-lg px-6 lg:col-span-2 lg:py-6">
			<div class="my-0 rounded-lg md:my-2">
				<div
					class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground">
					Additional Models
				</div>

				<AdditionalModelList bind:props={document.additionalModels} />
			</div>
		</div>
	</div>
</div>

<style>
	textarea {
		field-sizing: content;
		resize: none;
		word-break: break-all;
	}
</style>
