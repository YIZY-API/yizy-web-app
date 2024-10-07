<script lang="ts">
	import HighlightCode from '$lib/components/ui/HighlightCode.svelte';
	import yaml from 'svelte-highlight/languages/yaml';
	import json from 'svelte-highlight/languages/json';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import { serviceInJson, serviceInYaml } from '$lib/state';
</script>

<Tabs.Root value="json" class="w-full">
	<Tabs.List class="grid w-[300px] grid-cols-2">
		<Tabs.Trigger value="json">Json</Tabs.Trigger>
		<Tabs.Trigger value="yaml">Yaml</Tabs.Trigger>
	</Tabs.List>

	<Tabs.Content value="yaml">
		<Card.Root>
			<Card.Header>
				<Card.Title>Yaml</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2">
				<HighlightCode language={yaml} code={$serviceInYaml} />
			</Card.Content>
		</Card.Root>
	</Tabs.Content>

	<Tabs.Content value="json">
		<Card.Root>
			<Card.Header>
				<Card.Title>Json</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2">
				<HighlightCode language={json} code={$serviceInJson} />
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>
