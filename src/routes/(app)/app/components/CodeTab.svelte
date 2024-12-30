<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import ModelsSdkTab from '../components/ModelsSdkTab.svelte';
	import ClientSdkTab from '../components/ClientSdkTab.svelte';
	import JsonYamlDisplay from '$lib/components/ui/JsonYamlDisplay.svelte';
	import * as oapi from '$lib/yizySpec/generators/open-api-spec/openApiSpec';
	import { type Document, docToYizySpec } from '$lib/components/ui/editor/models/models';

	let { doc = $bindable() }: { doc: Document } = $props();
</script>

<Card.Root class="border-none">
	<Card.Header>
		<Card.Title>YIZY Generator</Card.Title>
		<Card.Description
			>Generate request and response models, client SDK, Open API Spec in an instant</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
		<Tabs.Root value="yizy-models" class="w-full">
			<Tabs.List class="grid w-full grid-cols-3">
				<Tabs.Trigger value="yizy-models">Server Snippet</Tabs.Trigger>
				<Tabs.Trigger value="yizy-sdk">Client SDK</Tabs.Trigger>
				<Tabs.Trigger value="open-api-spec">Open API Spec</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content value="yizy-models">
				<ModelsSdkTab bind:doc />
			</Tabs.Content>
			<Tabs.Content value="yizy-sdk">
				<ClientSdkTab bind:doc />
			</Tabs.Content>
			<Tabs.Content value="open-api-spec">
				<div class="my-4">
					<JsonYamlDisplay
						jsonText={oapi.serviceToOpenApiSpec(docToYizySpec(doc), oapi.OpenAPISpecType.JSON)}
						yamlText={oapi.serviceToOpenApiSpec(docToYizySpec(doc), oapi.OpenAPISpecType.YAML)} />
				</div>
			</Tabs.Content>
		</Tabs.Root>
	</Card.Content>
</Card.Root>
