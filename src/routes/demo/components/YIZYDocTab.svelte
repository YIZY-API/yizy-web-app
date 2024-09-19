<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import * as Accordion from '$lib/components/ui/accordion';
	import { currentService } from '$lib/state';
	import ProgrammingLanguagesDropdown from '$lib/components/ui/ProgrammingLanguagesDropdown.svelte';
	import YizyModelDocDisplay from './YIZYModelDocDisplay.svelte';
	import { ProgrammingLanguage } from '$lib/models/constants';
	import { findObjectTypeFromReferenceType } from '$lib/yizySpec/YIZYSpec';
	import YizyEndpointModelsView from './YIZYEndpointModelsView.svelte';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>YIZY Doc</Card.Title>
		<Card.Description>API Documentation</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
		<div class="w-full rounded-lg border p-4">
			<div class="prose prose-slate w-full max-w-none dark:prose-invert">
				<h2 class="my-2 font-bold">{$currentService.serviceName}</h2>
				<h4>Base Url</h4>
				<div class="my-2">
					<Select.Root portal={null}>
						<Select.Trigger class="w-[300px]">
							<Select.Value placeholder="Select a base url" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Base Urls</Select.Label>
								{#each $currentService.baseUrls as url}
									<Select.Item value={url} label={url}>{url}</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input name="favoriteUrl" />
					</Select.Root>
				</div>

				<h4>Endpoints</h4>
				{#each $currentService.endpoints as e}
					<Accordion.Root>
						<Accordion.Item value="item-1" class="px-4">
							<Accordion.Trigger class="font-bold hover:no-underline">
								<div class="not-prose rounded-r-full bg-primary px-4 text-primary-foreground">
									{e.url}
								</div>
							</Accordion.Trigger>
							<Accordion.Content>
								<YizyEndpointModelsView
									reqModel={findObjectTypeFromReferenceType($currentService, e.requestModel)}
									resModel={findObjectTypeFromReferenceType($currentService, e.responseModel)}
								/>
							</Accordion.Content>
						</Accordion.Item>
					</Accordion.Root>
				{/each}
			</div>
		</div>
	</Card.Content>
</Card.Root>
