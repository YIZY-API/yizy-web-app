<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import TsJsonYamlDisplay from '$lib/components/ui/TsJsonYamlDisplay.svelte';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>YIZY API Spec</Card.Title>
		<Card.Description>
			Write it in Yaml, Json, or Typescript if you need code completion suggestions!
		</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
		<TsJsonYamlDisplay />
	</Card.Content>
</Card.Root>
