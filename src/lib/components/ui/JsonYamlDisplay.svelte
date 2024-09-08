<script lang="ts">
	import { onMount } from 'svelte';
	import Highlight from 'svelte-highlight';
	import yaml from 'svelte-highlight/languages/yaml';
	import json from 'svelte-highlight/languages/json';
	import typescript from 'svelte-highlight/languages/typescript';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import YAML from 'yaml';

	export let input: object;
	let jsonString: string = '';
	let yamlString: string = '';
	let tsString: string = `
export interface Service {
	serviceName: LanguageSpecificName[];
	baseUrls: string[];
	endpoints: Endpoint[];
	additionalTypes: Type[];
}

export interface Endpoint {
	url: string;
	requestModel: Field[];
	responseModel: Field[];
}

export interface Field {
	field: LanguageSpecificName[];
	type:
		| 'number'
		| 'float'
		| 'double'
		| 'string'
		| 'boolean'
		| 'int'
		| 'int32'
		| 'int64'
		| 'object'
		| 'array';
	itemType?:
		| 'number'
		| 'float'
		| 'double'
		| 'string'
		| 'boolean'
		| 'int'
		| 'int32'
		| 'int64'
		| 'object'
		| 'array'
		| string
		| null; // this field is ignored if type is a primative type
}

export interface LanguageSpecificName {
	language: 'default' | 'go' | 'js' | 'cs' | 'c'; // you get the idea
	name: string;
}

export interface Type {
	id: string;
	name: LanguageSpecificName[];
	fields: Field[];
}

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

JSON.stringify(animalService);
    `;

	onMount(() => {
		jsonString = JSON.stringify(input, null, 4);
		yamlString = YAML.stringify(input, {
			indent: 4
		});
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

<Tabs.Root value="yaml" class="w-full">
	<Tabs.List class="grid w-[300px] grid-cols-3">
		<Tabs.Trigger value="yaml">Yaml</Tabs.Trigger>
		<Tabs.Trigger value="json">Json</Tabs.Trigger>
		<Tabs.Trigger value="ts">Typescript</Tabs.Trigger>
	</Tabs.List>

	<Tabs.Content value="yaml">
		<Card.Root>
			<Card.Header>
				<Card.Title>Yaml</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2">
				<div class="whitespace-pre-wrap rounded-lg bg-[#0d121c] p-2">
					<Highlight language={yaml} code={yamlString} />
				</div>
			</Card.Content>
		</Card.Root>
	</Tabs.Content>

	<Tabs.Content value="json">
		<Card.Root>
			<Card.Header>
				<Card.Title>Json</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2">
				<div class="whitespace-pre-wrap rounded-lg bg-[#0d121c] p-2">
					<Highlight language={json} code={jsonString} />
				</div>
			</Card.Content>
		</Card.Root>
	</Tabs.Content>

	<Tabs.Content value="ts">
		<Card.Root>
			<Card.Header>
				<Card.Title>Typescript</Card.Title>
				<Card.CardDescription
					>Generate Spec from Typescript to get code completion suggestion</Card.CardDescription
				>
			</Card.Header>
			<Card.Content class="space-y-2">
				<div class="whitespace-pre-wrap rounded-lg bg-[#0d121c] p-2">
					<Highlight language={typescript} code={tsString} />
				</div>
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>
