<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Decoration from './components/Decoration.svelte';
	import {
		Languages,
		HardHat,
		Link,
		Zap,
		CakeSlice,
		File,
		ChevronLeftIcon,
		ChevronRightIcon
	} from 'lucide-svelte';
	import demoImg from '$lib/assets/yizy-demo.png';
	import docDemoImg from '$lib/assets/doc-demo.png';
	import codeDemoImg from '$lib/assets/code-demo.png';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { type EmblaCarouselType } from 'embla-carousel';

	let carousel: EmblaCarouselType | undefined;
</script>

<svelte:head>
	<title>YIZY API</title>
</svelte:head>
<section class="mx-auto w-full pb-20 pt-40">
	<div class="my-28 flex flex-col">
		<h1 class="mx-auto px-4 text-center text-5xl font-bold">Build Json API The YIZY Way</h1>
		<h1 class="text-md mx-auto max-w-[600px] px-4 py-2 text-center font-light">
			Write API Spec in the Browser with Code Completion and Generate Type-safe Server and Client
			Code Instantly with Zero Configs.
		</h1>
		<div class="my-4 flex flex-col">
			<div class="mx-auto flex gap-2">
				<a href="/app"
					><Button
						class="rounded-full border-primary font-bold text-primary hover:bg-primary"
						variant="outline">TRY BETA</Button
					></a>

				<a href="https://tally.so/r/me2BZQ">
					<Button class="rounded-full font-bold">JOIN WAITLIST</Button></a>
			</div>
		</div>
	</div>
</section>
<Decoration />
<section class="flex flex-col bg-primary p-8">
	<div class="mx-auto w-full max-w-screen-lg">
		<div class="flex flex-row">
			<h1 class="py-8 text-center text-4xl font-bold text-[#171F30] sm:col-span-3">
				Write Spec and Generate Code Instantly with Zero Configs
			</h1>
		</div>
		<Carousel.Root
			class="mx-auto w-full"
			setApi={(api: EmblaCarouselType | undefined) => {
				carousel = api;
			}}>
			<Carousel.Content>
				<Carousel.Item>
					<div class="mx-auto flex flex-row justify-between">
						<button
							class="text-[#171F30]"
							onclick={() => {
								if (carousel) {
									carousel.scrollPrev();
								}
							}}><ChevronLeftIcon /></button>

						<h1 class="text-center text-lg font-bold text-[#171f30] sm:text-2xl">
							1. Write Spec in the Browser with Code Completion
						</h1>

						<button
							class="text-[#171F30]"
							onclick={() => {
								if (carousel) {
									carousel.scrollNext();
								}
							}}><ChevronRightIcon /></button>
					</div>
					<div class=" col-span-1 sm:col-span-2">
						<img src={demoImg} alt="yizy editor" />
					</div>
				</Carousel.Item>
				<Carousel.Item>
					<div class="mx-auto flex flex-row justify-between">
						<button
							class="text-[#171F30]"
							onclick={() => {
								if (carousel) {
									carousel.scrollPrev();
								}
							}}><ChevronLeftIcon /></button>

						<h1 class="text-center text-lg font-bold text-[#171f30] sm:text-2xl">
							2. View Beautiful Documentation
						</h1>

						<button
							class="text-[#171F30]"
							onclick={() => {
								if (carousel) {
									carousel.scrollNext();
								}
							}}><ChevronRightIcon /></button>
					</div>
					<div class=" col-span-1 sm:col-span-2">
						<img src={docDemoImg} alt="yizy doc viewer" />
					</div>
				</Carousel.Item>
				<Carousel.Item>
					<div class="mx-auto flex flex-row justify-between">
						<button
							class="text-[#171F30]"
							onclick={() => {
								if (carousel) {
									carousel.scrollPrev();
								}
							}}><ChevronLeftIcon /></button>

						<h1 class="text-center text-lg font-bold text-[#171f30] sm:text-2xl">
							3. Generate Code Instantly with Zero Configuration
						</h1>

						<button
							class="text-[#171F30]"
							onclick={() => {
								if (carousel) {
									carousel.scrollNext();
								}
							}}><ChevronRightIcon /></button>
					</div>
					<div class=" col-span-1 sm:col-span-2">
						<img src={codeDemoImg} alt="yizy generator" />
					</div>
				</Carousel.Item>
			</Carousel.Content>
		</Carousel.Root>
	</div>
</section>
<Decoration rotate={true} />
<section
	class="mx-auto grid max-w-[280px] grid-cols-1 flex-wrap gap-4 px-4 py-16 sm:max-w-[650px] lg:max-w-screen-lg xl:grid-cols-3">
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
<Decoration />

<section class="flex flex-col bg-primary p-8">
	<div class="mx-auto w-full max-w-screen-lg">
		<h1 class="py-8 text-center text-4xl font-bold text-[#171F30] sm:col-span-3">FAQ</h1>
	</div>
	<Accordion.Root
		type="single"
		class="mx-auto w-full border-[#171f30] text-[#171f30] sm:max-w-[70%]">
		<Accordion.Item value="item-1" class="border-[#171f30]">
			<Accordion.Trigger>Is YIZY API Restful?</Accordion.Trigger>
			<Accordion.Content>
				<div>
					No. YIZY API is an opinionated style of building Json API that deviates from Restful
					practices. Here is the YIZY API Convention.
				</div>
				<ul class="m-5 list-item list-disc">
					<li>
						Use 'Action' instead of 'Resource' in url. Eg. /getUserById instead of /user/{'{id}'}
					</li>
					<li>Endpoints must only accept POST request with content type application/json.</li>
					<li>Endpoints must reply with a status code of 200 unless there is a network error</li>
					<li>
						Inputs to the endpoint should be transferred in POST request body. Configuration values
						such as API keys can be optionally supplied in request headers. Parameters in url are
						not allowed.
					</li>
					<li>
						All response body should include a nullable error object as well as a nullable result
						object.
					</li>
				</ul>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</section>

<Decoration rotate={true} />
<section class="h-20 bg-background"></section>
