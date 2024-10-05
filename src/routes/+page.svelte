<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Decoration from './components/Decoration.svelte';
	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import json from 'svelte-highlight/languages/json';
	import * as code from './components/constants';
	import { Languages, HardHat, Link, Zap, CakeSlice, File } from 'lucide-svelte';

	enum Selection {
		ts,
		json,
		sdk
	}

	let currentSelection = Selection.ts;
	const selectBtnClass =
		'w-full justify-start text-wrap rounded-lg border-2 border-solid border-[#171F30] px-4 py-2 text-left text-sm text-[#171F30] lg:max-w-64 hover:bg-[#171F30] hover:text-primary';
	const selectedBtnClass =
		'w-full justify-start text-wrap rounded-lg border-2 border-solid border-[#171F30] px-4 py-2 text-left text-sm text-primary lg:max-w-64 bg-[#171F30] font-bold';
	$: tsSelectBtnClass = currentSelection == Selection.ts ? selectedBtnClass : selectBtnClass;
	$: jsonSelectBtnClass = currentSelection == Selection.json ? selectedBtnClass : selectBtnClass;
	$: sdkSelectBtnClass = currentSelection == Selection.sdk ? selectedBtnClass : selectBtnClass;
</script>

<svelte:head>
	<title>YIZY API</title>
</svelte:head>
<section class="mx-auto w-full py-20">
	<div class="my-16 flex flex-col">
		<h1 class="mx-auto px-4 text-center text-5xl font-bold">Aggressively Simple Json RPC</h1>
		<h1 class="mx-auto px-4 text-center text-5xl font-bold">Powered By Post Request</h1>
		<h1 class="text-md mx-auto max-w-[600px] px-4 py-2 text-center font-light">
			Write API Spec in Typescript and Generate Typesafe Models, Http Client SDKs, API
			Documentation, and Open API Specification in an Instant with Zero Configs.
		</h1>
		<div class="my-4 flex flex-col">
			<div class="mx-auto flex gap-2">
				<a href="/demo"
					><Button class="rounded-full border-primary font-bold text-primary" variant="outline"
						>DEMO</Button
					></a
				>

				<a href="https://tally.so/r/me2BZQ">
					<Button class="rounded-full font-bold">JOIN WAITLIST</Button></a
				>
			</div>
		</div>
	</div>
</section>
<Decoration />
<section class="flex flex-col bg-primary p-8">
	<div class="mx-auto w-full max-w-screen-xl">
		<div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
			<h1 class="py-8 text-center text-4xl font-bold text-[#171F30] sm:col-span-3">
				Instant Code Generation with Zero Config
			</h1>
			<div class="col-span-1 flex flex-col items-end gap-1 text-wrap">
				<button
					class={tsSelectBtnClass}
					on:click={() => {
						currentSelection = Selection.ts;
					}}
				>
					1. Define Spec in Typescript
				</button>
				<button
					class={jsonSelectBtnClass}
					on:click={() => {
						currentSelection = Selection.json;
					}}
				>
					2. Upload Json
				</button>
				<button
					class={sdkSelectBtnClass}
					on:click={() => {
						currentSelection = Selection.sdk;
					}}
				>
					3. Generate Code Instantly
				</button>
			</div>
			{#if currentSelection === Selection.ts}
				<div
					class="not-prose col-span-1 h-[500px] overflow-scroll whitespace-pre-wrap rounded-lg border-solid bg-[#0d121c] p-2 sm:col-span-2"
				>
					<Highlight language={typescript} code={code.tsSpec} class="text-sm" />
				</div>
			{:else if currentSelection === Selection.json}
				<div
					class="not-prose col-span-1 h-[500px] overflow-scroll whitespace-pre-wrap rounded-lg border-solid bg-[#0d121c] p-2 sm:col-span-2"
				>
					<Highlight language={json} code={code.jsonSpec} class="text-sm" />
				</div>
			{:else if currentSelection === Selection.sdk}
				<div
					class="not-prose col-span-1 h-[500px] overflow-scroll whitespace-pre-wrap rounded-lg border-solid bg-[#0d121c] p-2 sm:col-span-2"
				>
					<Highlight language={typescript} code={code.tsClient} class="text-sm" />
				</div>
			{/if}
		</div>
	</div>
</section>
<Decoration rotate={true} />
<section
	class="mx-auto grid max-w-[280px] grid-cols-1 flex-wrap gap-4 py-16 sm:max-w-[650px] sm:grid-cols-2 lg:max-w-screen-lg lg:grid-cols-3"
>
	<h1 class="py-8 text-center text-4xl font-bold text-primary sm:col-span-3">
		What Makes it YIZY?
	</h1>
	<div class="mx-auto flex h-48 w-full rounded-lg border-2 border-primary">
		<div class="m-auto flex flex-col">
			<File class="mx-auto text-primary" />
			<h1 class="pt-2 text-center text-lg font-bold text-primary">Schema First Design</h1>
			<p class="px-4 text-center text-sm font-light text-foreground">
				Tailored for Schema First API Design, Decoupling Frontend and Backend
			</p>
		</div>
	</div>
	<div class="mx-auto flex h-48 w-full rounded-lg border-2 border-primary">
		<div class="m-auto flex flex-col">
			<HardHat class="mx-auto text-primary" />
			<h1 class="pt-2 text-center text-lg font-bold text-primary">E2E Type Safety</h1>
			<p class="px-4 text-center text-sm font-light text-foreground">
				Request and Response Model Generation for Server and Client
			</p>
		</div>
	</div>
	<div class="mx-auto flex h-48 w-full rounded-lg border-2 border-primary">
		<div class="m-auto flex flex-col">
			<Zap class="mx-auto  text-primary" />
			<h1 class="pt-2 text-center text-lg font-bold text-primary">
				Blazingly Fast Code Genenration
			</h1>
			<p class="px-4 text-center text-sm font-light text-foreground">
				Instant Code Generation with Zero Configuration
			</p>
		</div>
	</div>
	<div class="mx-auto flex h-48 w-full rounded-lg border-2 border-primary">
		<div class="m-auto flex flex-col">
			<Languages class="mx-auto text-primary" />
			<h1 class="pt-2 text-center text-lg font-bold text-primary">Language Agnostic</h1>
			<p class="px-4 text-center text-sm font-light text-foreground">Multi-Language Support</p>
		</div>
	</div>
	<div class="mx-auto flex h-48 w-full rounded-lg border-2 border-primary">
		<div class="m-auto flex flex-col">
			<CakeSlice class="mx-auto text-primary" />
			<h1 class="pt-2 text-center text-lg font-bold text-primary">Aggressively Simple</h1>
			<p class="px-4 text-center text-sm font-light text-foreground">POST Request Under the Hood</p>
		</div>
	</div>
	<div class="mx-auto flex h-48 w-full rounded-lg border-2 border-primary">
		<div class="m-auto flex flex-col">
			<Link class="mx-auto text-primary" />
			<h1 class="pt-2 text-center text-lg font-bold text-primary">Open API Spec Support</h1>
			<p class="px-4 text-center text-sm font-light text-foreground">
				Generate Open API Spec for Tool Chain Support
			</p>
		</div>
	</div>
</section>
