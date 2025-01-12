<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import YizyModelsTab from '../components/YIZYModelsTab.svelte';
	import YizyClientSdkTab from '../components/YIZYClientSDKTab.svelte';
</script>

<Card.Root>
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
				<!--<Tabs.Trigger value="open-api-spec">Open API Spec</Tabs.Trigger>-->
			</Tabs.List>

			<Tabs.Content value="yizy-models">
				<YizyModelsTab />
			</Tabs.Content>
			<Tabs.Content value="yizy-sdk">
				<YizyClientSdkTab />
			</Tabs.Content>
			<!--
			<Tabs.Content value="open-api-spec">
				<div class="my-4">
					<JsonYamlDisplay
						jsonText={oapi.serviceToOpenApiSpec($currentService, oapi.OpenAPISpecType.JSON)}
						yamlText={oapi.serviceToOpenApiSpec($currentService, oapi.OpenAPISpecType.YAML)} />
				</div>
			</Tabs.Content>
            -->
		</Tabs.Root>
	</Card.Content>
</Card.Root>
