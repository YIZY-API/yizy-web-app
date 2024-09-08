<script lang="ts">
	import YAML from 'yaml';
	import { type Service } from '$lib/apiSpec';
	import { onMount } from 'svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import * as Accordion from '$lib/components/ui/accordion';
	import JsonYamlDisplay from '$lib/components/ui/JsonYamlDisplay.svelte';
	import go from 'svelte-highlight/languages/go';
	import typescript from 'svelte-highlight/languages/typescript';
	import Highlight from 'svelte-highlight';

	let selectedProgrammingLang = { label: 'Golang', value: 'Golang' };

	let tsInterfaces = `
export interface GetAnimalByNameRequest {
  Name: string;
}

export interface GetAnimalByNameResponse {
  Error: string;
  Result: Animal;
}

export interface Animal {
  Name: string;
  Species: string;
}
`;
	let golangInterfaces = `
    package main

    type GetAnimalByNameRequest struct {
    	Name    string \`json:"name"\`
    }

    type GetAnimalByNameResponse {
      Error string \`json:"error"\`
      Result Animal \`json:"animal"\`
    }

    type Animal struct {
    	Name    string \`json:"name"\`
    	Species string \`json:"species"\`
    }

    `;
	let golangString = `
    HTTP Client So You Don't Have to Craft Your Own.
    Coming Soon!
    `;
	let requestModelString = `
interface GetAnimalByNameRequest {
    name: string
}
    `;
	let responseModelString = `
interface GetAnimalByNameResponse {
    error: string;
    result: Animal;
}

interface Animal {
    name: string;
    species: string;
}
    `;

	let programmingLanguages = ['Golang', 'Typescript', 'You Get The Idea'];

	let animalService: Service = {
		serviceName: [
			{
				language: 'default',
				name: 'animal-service'
			},
			{
				language: 'go',
				name: 'AnimalService'
			}
		],
		baseUrls: [
			'http://localhost:8080',
			'https://dev-server.com',
			'https://staging-server.com',
			'https://server.com'
		],
		endpoints: [
			{
				url: '/animals/getAnimalByName',
				requestModel: [
					{
						field: [{ language: 'default', name: 'name' }],
						type: 'string'
					}
				],
				responseModel: [
					{
						field: [{ language: 'default', name: 'error' }],
						type: 'string'
					},
					{
						field: [{ language: 'default', name: 'result' }],
						type: 'object',
						itemType: 'Animal'
					}
				]
			}
		],
		additionalTypes: [
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
						field: [
							{
								language: 'default',
								name: 'name'
							}
						],
						type: 'string'
					},
					{
						field: [{ language: 'default', name: 'species' }],
						type: 'string'
					}
				]
			}
		]
	};
	let res: string = 'hello';

	onMount(() => {
		//res = JSON.stringify(animalService, null, 4); json
		res = YAML.stringify(animalService, {
			indent: 4
		});
		console.log(res);
	});
</script>

<svelte:head>
	<style>
		pre code.hljs {
			display: block;
			overflow-x: auto;
			padding: 1em;
		}
		code.hljs {
			padding: 3px 5px;
		}
		.hljs {
			background: #0d121c;
		}
		.hljs,
		.hljs-subst {
			color: #d8dee9;
		}
		.hljs-selector-tag {
			color: #81a1c1;
		}
		.hljs-selector-id {
			color: #8fbcbb;
			font-weight: bold;
		}
		.hljs-selector-class {
			color: #8fbcbb;
		}
		.hljs-selector-attr {
			color: #8fbcbb;
		}
		.hljs-property {
			color: #88c0d0;
		}
		.hljs-selector-pseudo {
			color: #88c0d0;
		}
		.hljs-addition {
			background-color: rgba(163, 190, 140, 0.5);
		}
		.hljs-deletion {
			background-color: rgba(191, 97, 106, 0.5);
		}
		.hljs-built_in,
		.hljs-type {
			color: #8fbcbb;
		}
		.hljs-class {
			color: #8fbcbb;
		}
		.hljs-function {
			color: #88c0d0;
		}
		.hljs-title.hljs-function,
		.hljs-function > .hljs-title {
			color: #88c0d0;
		}
		.hljs-keyword,
		.hljs-literal,
		.hljs-symbol {
			color: #81a1c1;
		}
		.hljs-number {
			color: #b48ead;
		}
		.hljs-regexp {
			color: #ebcb8b;
		}
		.hljs-string {
			color: #a3be8c;
		}
		.hljs-title {
			color: #8fbcbb;
		}
		.hljs-params {
			color: #d8dee9;
		}
		.hljs-bullet {
			color: #81a1c1;
		}
		.hljs-code {
			color: #8fbcbb;
		}
		.hljs-emphasis {
			font-style: italic;
		}
		.hljs-formula {
			color: #8fbcbb;
		}
		.hljs-strong {
			font-weight: bold;
		}
		.hljs-link:hover {
			text-decoration: underline;
		}
		.hljs-quote {
			color: #4c566a;
		}
		.hljs-comment {
			color: #4c566a;
		}
		.hljs-doctag {
			color: #8fbcbb;
		}
		.hljs-meta,
		.hljs-meta .hljs-keyword {
			color: #5e81ac;
		}
		.hljs-meta .hljs-string {
			color: #a3be8c;
		}
		.hljs-attr {
			color: #8fbcbb;
		}
		.hljs-attribute {
			color: #d8dee9;
		}
		.hljs-name {
			color: #81a1c1;
		}
		.hljs-section {
			color: #88c0d0;
		}
		.hljs-tag {
			color: #81a1c1;
		}
		.hljs-variable {
			color: #d8dee9;
		}
		.hljs-template-variable {
			color: #d8dee9;
		}
		.hljs-template-tag {
			color: #5e81ac;
		}
		.language-abnf .hljs-attribute {
			color: #88c0d0;
		}
		.language-abnf .hljs-symbol {
			color: #ebcb8b;
		}
		.language-apache .hljs-attribute {
			color: #88c0d0;
		}
		.language-apache .hljs-section {
			color: #81a1c1;
		}
		.language-arduino .hljs-built_in {
			color: #88c0d0;
		}
		.language-aspectj .hljs-meta {
			color: #d08770;
		}
		.language-aspectj > .hljs-title {
			color: #88c0d0;
		}
		.language-bnf .hljs-attribute {
			color: #8fbcbb;
		}
		.language-clojure .hljs-name {
			color: #88c0d0;
		}
		.language-clojure .hljs-symbol {
			color: #ebcb8b;
		}
		.language-coq .hljs-built_in {
			color: #88c0d0;
		}
		.language-cpp .hljs-meta .hljs-string {
			color: #8fbcbb;
		}
		.language-css .hljs-built_in {
			color: #88c0d0;
		}
		.language-css .hljs-keyword {
			color: #d08770;
		}
		.language-diff .hljs-meta {
			color: #8fbcbb;
		}
		.language-ebnf .hljs-attribute {
			color: #8fbcbb;
		}
		.language-glsl .hljs-built_in {
			color: #88c0d0;
		}
		.language-groovy .hljs-meta:not(:first-child) {
			color: #d08770;
		}
		.language-haxe .hljs-meta {
			color: #d08770;
		}
		.language-java .hljs-meta {
			color: #d08770;
		}
		.language-ldif .hljs-attribute {
			color: #8fbcbb;
		}
		.language-lisp .hljs-name {
			color: #88c0d0;
		}
		.language-lua .hljs-built_in {
			color: #88c0d0;
		}
		.language-moonscript .hljs-built_in {
			color: #88c0d0;
		}
		.language-nginx .hljs-attribute {
			color: #88c0d0;
		}
		.language-nginx .hljs-section {
			color: #5e81ac;
		}
		.language-pf .hljs-built_in {
			color: #88c0d0;
		}
		.language-processing .hljs-built_in {
			color: #88c0d0;
		}
		.language-scss .hljs-keyword {
			color: #81a1c1;
		}
		.language-stylus .hljs-keyword {
			color: #81a1c1;
		}
		.language-swift .hljs-meta {
			color: #d08770;
		}
		.language-vim .hljs-built_in {
			color: #88c0d0;
			font-style: italic;
		}
		.language-yaml .hljs-meta {
			color: #d08770;
		}
	</style>
</svelte:head>

<div>
	<Tabs.Root value="yizi-api-spec" class="w-full">
		<Tabs.List class="grid w-full grid-cols-4">
			<Tabs.Trigger value="yizi-api-spec">YIZI API Spec</Tabs.Trigger>
			<Tabs.Trigger value="yizi-doc">YIZI Doc</Tabs.Trigger>
			<Tabs.Trigger value="models">Models</Tabs.Trigger>
			<Tabs.Trigger value="client-sdk">Client SDK</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="yizi-api-spec">
			<Card.Root>
				<Card.Header>
					<Card.Title>YIZI API Spec</Card.Title>
					<Card.Description>
						Write it in Yaml, Json, or Typescript if you need code completion suggestions!
					</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-2">
					<JsonYamlDisplay input={animalService} />
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="yizi-doc">
			<Card.Root>
				<Card.Header>
					<Card.Title>YIZI Doc</Card.Title>
					<Card.Description>API Documentation</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-2">
					<div class="w-full rounded-lg border p-4">
						<div class="prose prose-slate w-full max-w-none dark:prose-invert">
							<h2 class="my-2 font-bold">Animal Service</h2>
							<h4>Base Url</h4>
							<div class="my-2">
								<Select.Root portal={null}>
									<Select.Trigger class="w-[300px]">
										<Select.Value placeholder="Select a base url" />
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											<Select.Label>Base Urls</Select.Label>
											{#each animalService.baseUrls as url}
												<Select.Item value={url} label={url}>{url}</Select.Item>
											{/each}
										</Select.Group>
									</Select.Content>
									<Select.Input name="favoriteUrl" />
								</Select.Root>
							</div>

							<h4>Endpoints</h4>
							<div>
								<Accordion.Root>
									<Accordion.Item value="item-1" class="px-4">
										<Accordion.Trigger class="font-bold hover:no-underline">
											<div class="not-prose rounded-r-full bg-primary px-4 text-primary-foreground">
												{animalService.endpoints[0].url}
											</div>
										</Accordion.Trigger>
										<Accordion.Content>
											<div class="my-2">
												<h4 class="pl-2 font-bold">Request Model</h4>
												<div class="not-prose whitespace-pre-wrap rounded-lg bg-[#0d121c] p-2">
													<Highlight language={typescript} code={requestModelString} />
												</div>
											</div>
											<div class="my-4">
												<h4 class="pl-2 font-bold">Response Model</h4>
												<div class="not-prose whitespace-pre-wrap rounded-lg bg-[#0d121c] p-2">
													<Highlight language={typescript} code={responseModelString} />
												</div>
											</div>
										</Accordion.Content>
									</Accordion.Item>
								</Accordion.Root>
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="client-sdk">
			<Card.Root>
				<Card.Header>
					<Card.Title>Client SDK</Card.Title>
					<Card.Description>
						Generate Http Client From the Spec So You Don't Have to Craft Your Own!
					</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-2">
					<Label class="mt-4 text-sm font-bold">Programming Language</Label>
					<Select.Root portal={null} selected={{ value: 'Golang', label: 'Golang' }}>
						<Select.Trigger class="w-[300px]">
							<Select.Value placeholder="Select a programming language" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Programming Language</Select.Label>
								{#each programmingLanguages as lang}
									<Select.Item value={lang} label={lang}>{lang}</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input name="favoriteLang" />
					</Select.Root>
					<div class="whitespace-pre-wrap rounded-lg bg-secondary">{golangString}</div>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>

		<Tabs.Content value="models">
			<Card.Root>
				<Card.Header>
					<Card.Title>Models</Card.Title>
					<Card.Description>Request and Response Models in Every Languages</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-2">
					<Label class="mt-4 text-sm font-bold">Programming Language</Label>
					<Select.Root portal={null} bind:selected={selectedProgrammingLang}>
						<Select.Trigger class="w-[300px]">
							<Select.Value placeholder="Select a programming language" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Programming Language</Select.Label>
								{#each programmingLanguages as lang}
									<Select.Item value={lang} label={lang}>{lang}</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input name="favoriteLang" />
					</Select.Root>
					<div class="whitespace-pre-wrap rounded-lg bg-secondary">
						<div class="rounded-lg bg-[#0d121c] p-2">
							{#if selectedProgrammingLang.value === 'Golang'}
								<Highlight language={go} code={golangInterfaces} />
							{:else if selectedProgrammingLang.value === 'Typescript'}
								<Highlight language={typescript} code={tsInterfaces} />
							{:else}
								<Highlight language={typescript} code={`console.log('You Get The Idea.')`} />
							{/if}
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</div>
