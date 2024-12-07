<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Decoration from './components/Decoration.svelte';
	import { Languages, HardHat, Link, Zap, CakeSlice, File } from 'lucide-svelte';
	import demoImg from '$lib/assets/yizy-demo.png';
	import docDemoImg from '$lib/assets/doc-demo.png';
	import codeDemoImg from '$lib/assets/code-demo.png';
	import openApiImg from '$lib/assets/openapi.png';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
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
				<a href="https://tally.so/r/me2BZQ">
					<Button class="rounded-full font-bold">Get Early Access</Button></a>
			</div>
		</div>
	</div>
</section>
<Decoration />
<section class="flex flex-col bg-primary p-8">
	<div class="mx-auto w-full max-w-screen-lg">
		<div class="flex flex-row">
			<h1 class="mx-auto py-8 text-center text-4xl font-bold text-[#171F30]">How It Works</h1>
		</div>
		<div class="mx-auto flex flex-col">
			<h1 class="px-4 text-lg font-bold text-[#171f30] sm:px-10 sm:text-2xl">
				1. Write API Spec in the Browser with Code Completion
			</h1>
			<div class="text-md px-4 font-light text-[#171f30] sm:px-10 sm:text-xl">
				Export the specification in JSON format and version control the spec with Git. Import it
				later to update the spec and re-run code generation.
			</div>
			<img src={demoImg} alt="yizy editor" />
		</div>
		<div class="mx-auto flex flex-col">
			<h1 class="px-4 text-lg font-bold text-[#171f30] sm:px-10 sm:text-2xl">
				2. Generate and View Beautiful Documentation
			</h1>
			<div class="text-md px-4 font-light text-[#171f30] sm:px-10 sm:text-xl">
				View API documentation and send request directly from the browser.
			</div>
			<img src={docDemoImg} alt="yizy doc viewer" />
		</div>
		<div class="mx-auto flex flex-col">
			<h1 class="px-4 text-lg font-bold text-[#171f30] sm:px-10 sm:text-2xl">
				3. Generate Code Instantly with Zero Configuration
			</h1>
			<div class="text-md px-4 font-light text-[#171f30] sm:px-10 sm:text-xl">
				Generate Server and Client code instantly in the browser instantly
			</div>
			<img src={codeDemoImg} alt="yizy generator" />
		</div>

		<div class="mx-auto flex flex-col">
			<h1 class="px-4 text-lg font-bold text-[#171f30] sm:px-10 sm:text-2xl">
				4. Open API Support
			</h1>
			<div class="text-md px-4 font-light text-[#171f30] sm:px-10 sm:text-xl">
				Convert YIZY Spec to Open API Spec and leverage open source tools in the Open API ecosystem.
				Generate mock server, Postman collections, and more!
			</div>
			<img src={openApiImg} alt="yizy generator" />
		</div>
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
				<div>
					YIZY API is a Contract First RPC (Remote Procedure Call) based on POST requests. It's an
					alternative to Restful API, GraphQL, tRPC, and gRPC.
				</div>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</section>

<Decoration rotate={true} />
<section class="h-20 bg-background"></section>
