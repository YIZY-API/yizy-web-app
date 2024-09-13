<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import php from 'svelte-highlight/languages/php';
	import Highlight from 'svelte-highlight';
	import ProgrammingLanguagesDropdown from '$lib/components/ui/ProgrammingLanguagesDropdown.svelte';
	import { animalService } from '$lib/yizySpec/examples/animalServiceSpec';
	import { generateModelFile } from '$lib/yizySpec/generators/php/modelGenerator';
	import { ProgrammingLanguage } from '$lib/models/constants';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Models</Card.Title>
		<Card.Description>Request and Response Models in Every Languages</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
		<ProgrammingLanguagesDropdown defaultLang={ProgrammingLanguage.Php} />
		<div class="whitespace-pre-wrap rounded-lg bg-secondary">
			<div class="rounded-lg bg-[#0d121c] p-2">
				<Highlight language={php} code={generateModelFile(animalService)} />
			</div>
		</div>
	</Card.Content>
</Card.Root>
