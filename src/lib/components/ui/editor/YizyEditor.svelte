<script lang="ts">
	import { onMount, tick } from 'svelte';
	import EndpointList from './components/EndpointList.svelte';
	import EnvironmentList from './components/EnvironmentList.svelte';
	import { docToYizySpec, type Document } from './models/models';
	//import { updateLspTypes } from './state.svelte';
	import AdditionalModelList from './components/AdditionalModelList.svelte';
	import type { Service } from '@yizy/spec';
	import { defaultState, updateDocumentState, documentState } from './state.svelte';

	let { doc = defaultState }: { doc: Document } = $props();

	export function toYizySpec(): Service {
		if (documentState) {
			return docToYizySpec(documentState);
		}
		throw new Error('doc is not defined!');
	}

	export function reset(): void {
		updateDocumentState(defaultState);
	}

	let firstEditableItem: HTMLElement;
	onMount(async () => {
		if (doc) {
			updateDocumentState(doc);
			await tick();
			firstEditableItem.focus();
		}
	});
</script>

<div class="w-full pb-20 @container">
	<div class="mx-auto grid w-full grid-cols-1 rounded-lg @lg:grid-cols-12 @lg:gap-2">
		<div class="col-span-1 rounded-lg px-6 pr-10 pt-4 @lg:col-span-7 @lg:pb-4">
			<div class="mt-4 border-muted @lg:mb-2">
				<div
					class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground">
					Service
				</div>
				<input
					bind:this={firstEditableItem}
					placeholder="ServiceName"
					class="w-full break-words border-none border-transparent bg-transparent text-2xl font-bold outline-none placeholder:text-muted active:border-none"
					bind:value={documentState.name} />

				<textarea
					class="w-full resize-none bg-transparent outline-none placeholder:text-muted"
					placeholder="This is an example of a service documentation"
					bind:value={documentState.description}></textarea>
				<EnvironmentList bind:props={documentState.environment} />
			</div>
			<div class="my-2 w-full rounded-lg">
				<div
					class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground">
					Endpoints
				</div>
				<EndpointList bind:props={documentState.endpoints} />
			</div>
		</div>
		<div class="col-span-1 rounded-lg px-6 @lg:col-span-5 @lg:py-6">
			<div class="my-0 rounded-lg md:my-2">
				<div
					class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground">
					Additional Models
				</div>

				<AdditionalModelList bind:props={documentState.additionalModels} />
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
