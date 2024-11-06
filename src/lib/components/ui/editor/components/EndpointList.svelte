<script lang="ts">
	import { PlusIcon, TrashIcon } from 'lucide-svelte';
	import Endpoint from './Endpoint.svelte';
	import { type Endpoint as EndpointProps } from '../models/models';

	let {
		props = $bindable([
			{
				name: '',
				description: '',
				url: '',
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
		])
	}: { props?: EndpointProps[] } = $props();

	function addNewItem(fromIndex: number) {
		const newItem: EndpointProps = {
			name: '',
			description: '',
			url: '',
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
		};
		const updatedItems = [...props];
		updatedItems.splice(fromIndex, 0, newItem);
		props = updatedItems;
	}

	function removeItem(fromIndex: number) {
		const updatedItems = [...props];
		if (updatedItems.length === 1) {
			return;
		}
		updatedItems.splice(fromIndex, 1);
		props = updatedItems;
	}
</script>

<div class="my-2 w-full">
	{#each props as _, index}
		<div role="none" class="group my-auto flex w-full flex-col">
			<div class="flex w-full flex-row">
				<button class="mt-2 flex h-6 w-4" onclick={() => addNewItem(index + 1)} tabindex="-1">
					<PlusIcon
						class="h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted" />
				</button>

				<button class="mt-2 flex h-6 w-4" onclick={() => removeItem(index)} tabindex="-1">
					<TrashIcon
						class="h-4 text-transparent hover:text-muted focus:text-muted active:text-muted group-hover:text-muted" />
				</button>

				<div class="ml-2 flex-grow">
					<Endpoint bind:props={props[index]} />
				</div>
			</div>
		</div>
	{/each}
</div>
