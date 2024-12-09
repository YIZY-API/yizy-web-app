<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Accordion from '$lib/components/ui/accordion';
	import { currentService } from '$lib/state';
	import { findObjectTypeFromReferenceType } from '@yizy/spec';
	import YizyEndpointModelsView from './YIZYEndpointModelsView.svelte';

	let url: string = $state($currentService.environment[0].url ?? '');
	const triggerContent = $derived.by(() => {
		return $currentService.environment.find((e) => e.url === url)
			? $currentService.environment.find((e) => e.url === url)?.name +
					': ' +
					$currentService.environment.find((e) => e.url === url)?.url
			: 'Select an environment';
	});
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>YIZY Doc</Card.Title>
		<Card.Description>API Documentation</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
		<div class="w-full rounded-lg border p-4">
			<div class="prose prose-slate dark:prose-invert w-full max-w-none">
				<h2 class="my-2 font-bold">{$currentService.serviceName}</h2>
				<h4>Environment</h4>
				<div class="my-2">
					<Select.Root
						type="single"
						name="baseUrl"
						bind:value={url as string}
						onValueChange={(val) => {
							if (val != '') {
								url = val;
							}
						}}
						controlledValue={true}>
						<Select.Trigger class="w-[300px]">
							{triggerContent}
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.GroupHeading>Environments</Select.GroupHeading>
								{#each $currentService.environment as env}
									<Select.Item value={env.url} label={env.url} onUnhighlight={() => {}}
										>{env.name + ': ' + env.url}</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
					</Select.Root>
				</div>

				<h4>Endpoints</h4>
				{#each $currentService.endpoints as e}
					<Accordion.Root type="single" class="w-full">
						<Accordion.Item value="item-1" class="px-4">
							<Accordion.Trigger class="font-bold hover:no-underline">
								<div class="not-prose rounded-r-full bg-primary px-4 text-primary-foreground">
									{e.url}
								</div>
							</Accordion.Trigger>
							<Accordion.Content>
								<YizyEndpointModelsView
									reqModel={findObjectTypeFromReferenceType($currentService, e.requestModel!)}
									resModel={findObjectTypeFromReferenceType($currentService, e.responseModel!)} />
							</Accordion.Content>
						</Accordion.Item>
					</Accordion.Root>
				{/each}
			</div>
		</div>
	</Card.Content>
</Card.Root>
