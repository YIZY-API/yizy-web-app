<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Decoration from './components/Decoration.svelte';
	import HighlightCode from '$lib/components/ui/HighlightCode.svelte';
	import typescript from 'svelte-highlight/languages/typescript';
	import json from 'svelte-highlight/languages/json';
	import * as code from '$lib/constants';
	import { Languages, HardHat, Link, Zap, CakeSlice, File } from 'lucide-svelte';

	type Selection = 'ts' | 'json' | 'sdk';

	let currentSelection = $state<Selection>('ts');
	const selectBtnClass =
		'w-full justify-start text-wrap rounded-lg border-2 border-solid border-[#171F30] px-4 py-2 text-left text-sm text-[#171F30] lg:max-w-64 hover:bg-[#171F30] hover:text-primary';
	const selectedBtnClass =
		'w-full justify-start text-wrap rounded-lg border-2 border-solid border-[#171F30] px-4 py-2 text-left text-sm text-primary lg:max-w-64 bg-[#171F30] font-bold';
	let tsSelectBtnClass = $derived(currentSelection === 'ts' ? selectedBtnClass : selectBtnClass);

	let jsonSelectBtnClass = $derived(
		currentSelection === 'json' ? selectedBtnClass : selectBtnClass
	);
	let sdkSelectBtnClass = $derived(currentSelection === 'sdk' ? selectedBtnClass : selectBtnClass);
</script>

<svelte:head>
	<title>YIZY API</title>
</svelte:head>
<section class="mx-auto w-full pb-20 pt-40">
	<div class="my-28 flex flex-col">
		<h1 class="mx-auto px-4 text-center text-5xl font-bold">Build Json API The YIZY Way</h1>
		<h1 class="text-md mx-auto max-w-[600px] px-4 py-2 text-center font-light">
			Forget About Restful Practices, Write API Spec in Typescript and Generate Type-safe Server and
			Client Code Instantly with Zero Configs.
		</h1>
		<div class="my-4 flex flex-col">
			<div class="mx-auto flex gap-2">
				<a href="/app"
					><Button class="rounded-full border-primary font-bold text-primary" variant="outline"
						>TRY BETA</Button
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
					onclick={() => {
						currentSelection = 'ts';
					}}
				>
					1. Write YIZY Spec
				</button>
				<button
					class={jsonSelectBtnClass}
					onclick={() => {
						currentSelection = 'json';
					}}
				>
					2. Upload Json
				</button>
				<button
					class={sdkSelectBtnClass}
					onclick={() => {
						currentSelection = 'sdk';
					}}
				>
					3. Generate Code Instantly
				</button>
			</div>
			{#if currentSelection === 'ts'}
				<div class=" col-span-1 sm:col-span-2">
					<HighlightCode
						language={typescript}
						code={code.tsSpec}
						class="h-[500px] overflow-auto text-sm"
					/>
				</div>
			{:else if currentSelection === 'json'}
				<div class=" col-span-1 sm:col-span-2">
					<HighlightCode
						language={json}
						code={code.jsonSpec}
						class="h-[500px] overflow-auto text-sm"
					/>
				</div>
			{:else if currentSelection === 'sdk'}
				<div class="col-span-1 sm:col-span-2">
					<HighlightCode
						language={typescript}
						code={code.tsClient}
						class="h-[500px] overflow-auto text-sm"
					/>
				</div>
			{/if}
		</div>
	</div>
</section>
<Decoration rotate={true} />
<section
	class="mx-auto grid max-w-[280px] grid-cols-1 flex-wrap gap-4 px-4 py-16 sm:max-w-[650px] lg:max-w-screen-lg xl:grid-cols-3"
>
	<h1 class="col-span-full py-8 text-center text-4xl font-bold text-primary">
		What Makes it YIZY?
	</h1>
	<div class="mx-auto flex h-48 w-full max-w-80 rounded-lg border-2 border-primary">
		<div class="m-auto flex flex-col">
			<File class="mx-auto text-primary" />
			<h1 class="pt-2 text-center text-lg font-bold text-primary">Schema First Design</h1>
			<p class="px-4 text-center text-sm font-light text-foreground">
				Tailored for Schema First API Design, Decoupling Frontend and Backend
			</p>
		</div>
	</div>
	<div class="mx-auto flex h-48 w-full max-w-80 rounded-lg border-2 border-primary">
		<div class="m-auto flex flex-col">
			<HardHat class="mx-auto text-primary" />
			<h1 class="pt-2 text-center text-lg font-bold text-primary">E2E Type Safety</h1>
			<p class="px-4 text-center text-sm font-light text-foreground">
				Request and Response Model Generation for Server and Client
			</p>
		</div>
	</div>
	<div class="mx-auto flex h-48 w-full max-w-80 rounded-lg border-2 border-primary">
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
	<div class="mx-auto flex h-48 w-full max-w-80 rounded-lg border-2 border-primary">
		<div class="m-auto flex flex-col">
			<Languages class="mx-auto text-primary" />
			<h1 class="pt-2 text-center text-lg font-bold text-primary">Language Agnostic</h1>
			<p class="px-4 text-center text-sm font-light text-foreground">Multi-Language Support</p>
		</div>
	</div>
	<div class="mx-auto flex h-48 w-full max-w-80 rounded-lg border-2 border-primary">
		<div class="m-auto flex flex-col">
			<CakeSlice class="mx-auto text-primary" />
			<h1 class="pt-2 text-center text-lg font-bold text-primary">Aggressively Simple</h1>
			<p class="px-4 text-center text-sm font-light text-foreground">POST Request Under the Hood</p>
		</div>
	</div>
	<div class="mx-auto flex h-48 w-full max-w-80 rounded-lg border-2 border-primary">
		<div class="m-auto flex flex-col">
			<Link class="mx-auto text-primary" />
			<h1 class="pt-2 text-center text-lg font-bold text-primary">Open API Spec Support</h1>
			<p class="px-4 text-center text-sm font-light text-foreground">
				Generate Open API Spec for Tool Chain Support
			</p>
		</div>
	</div>
</section>
