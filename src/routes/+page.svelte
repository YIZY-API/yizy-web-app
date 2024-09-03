<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { type Service } from '$lib/apiSpec';
	import { onMount } from 'svelte';

	let animalService: Service = {
		name: [
			{
				language: 'default',
				name: 'AnimalService'
			},
			{
				language: 'go',
				name: 'animalService'
			}
		],
		baseUrls: ['localhost:8080'],
		endpoints: [
			{
				url: '/animals/getAnimalByName',
				requestModel: [
					{
						name: [{ language: 'default', name: 'name' }],
						type: 'string',
						modelTypeID: ''
					}
				],
				responseModel: [
					{
						name: [{ language: 'default', name: 'error' }],
						type: 'string',
						modelTypeID: ''
					},
					{
						name: [{ language: 'default', name: 'result' }],
						type: 'object',
						modelTypeID: 'Animal'
					}
				]
			}
		],
		models: [
			{
				id: 'Animal',
				name: [
					{
						language: 'default',
						name: 'Animal'
					}
				],
				fields: [
					{
						name: [
							{
								language: 'default',
								name: 'name'
							}
						],
						type: 'string',
						modelTypeID: ''
					},
					{
						name: [{ language: 'default', name: 'species' }],
						type: 'string',
						modelTypeID: ''
					}
				]
			}
		]
	};
	let res: string = 'hello';

	onMount(() => {
		res = JSON.stringify(animalService);
		console.log(res);
	});
</script>

<div>
	<Button>hello</Button>
	{res}
</div>
