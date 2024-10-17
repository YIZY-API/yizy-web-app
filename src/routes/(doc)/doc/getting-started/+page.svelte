<script lang="ts">
	import * as Alert from '$lib/components/ui/alert/index.js';
	import HighlightCode from '$lib/components/ui/HighlightCode.svelte';
	import { shell } from 'svelte-highlight/languages/shell';
	import { typescript } from 'svelte-highlight/languages/typescript';
	import Label from '$lib/components/ui/label/label.svelte';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';

	let tsString: string = `
import { type Service,
        field,
        referenceType,
        nullableReferenceType,
        objectType } from '@yizy/specification';

export const secretService: Service = {
	serviceName: 'SecretService',
	baseUrls: ['http://localhost:8080'],
	endpoints: [
		{
			url: '/agents/getAgentByName',
			name: 'getAgentByName',
			requestModel: 
              objectType('GetAgentByNameRequest', [
                field('name', 'string')
              ]),
			responseModel: 
              objectType('GetAgentByNameResponse', [
				field('error', nullableReferenceType('Grenade')),
				field('agent', referenceType('Agent'))
			  ])
		}
	],
	referenceTypes: [
		objectType('Agent', [
			field('name', 'string'),
			field('age', 'int'),
			field('department', 'string')
		]),
		objectType('Grenade', [
          field('code', 'int'),
          field('msg', 'string'),
          field('name', 'string')])
	]
};

// Copy the output and paste it to the 
// website at https://yizy.rootxsnowstudio.com/app
const output = JSON.stringify(secretService);
`;
</script>

<svelte:head>
	<title>Getting Started</title>
</svelte:head>

<div
	class="prose prose-slate mx-auto w-full max-w-4xl px-4 pb-20 dark:prose-invert prose-a:text-primary"
>
	<Alert.Root class="my-4 border-destructive text-destructive">
		<TriangleAlert class="h-4 w-4 stroke-destructive" />
		<Alert.Title>Heads up!</Alert.Title>
		<Alert.Description>
			YIZY is still under active development and is <b>NOT PRODUCTION READY</b>.
		</Alert.Description>
	</Alert.Root>

	<h1>Getting Started with YIZY API</h1>
	<h2>Installation</h2>
	<div>
		Install the <a href="https://jsr.io/@yizy/specification">@yizy/specification</a> package to start
		writing YIZY Spec in Typescript!
	</div>

	<div class="my-2">
		<Label>Npm</Label>
		<HighlightCode language={shell} code={'npx jsr add @yizy/specification'}></HighlightCode>
	</div>

	<div class="my-2">
		<Label>Deno</Label>
		<HighlightCode language={shell} code={'deno add jsr:@yizy/specification'}></HighlightCode>
	</div>

	<div class="my-2">
		<Label>Bun</Label>
		<HighlightCode language={shell} code={'bunx jsr add @yizy/specification'}></HighlightCode>
	</div>

	<div class="my-2">
		<Label>Others (Yarn, Pnpm)</Label>
		<div>
			Checkout the package page on <a href="https://jsr.io/@yizy/specification">JSR</a> for more installation
			details.
		</div>
	</div>

	<h2>Example</h2>
	<HighlightCode language={typescript} code={tsString}></HighlightCode>

	<p>
		Copy and paste the output to the <a href="/app">app page</a>. That's it. It's that YIZY!
	</p>
</div>
