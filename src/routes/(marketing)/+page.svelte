<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Decoration from './components/Decoration.svelte';
	import { Languages, HardHat, Link, Zap, CakeSlice, File } from 'lucide-svelte';
	import demoImg from '$lib/assets/yizy-demo.png';
	import docDemoImg from '$lib/assets/doc-demo.png';
	import codeDemoImg from '$lib/assets/code-demo.png';
	import openApiImg from '$lib/assets/openapi.png';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import exampleSpecImg from '$lib/assets/exampleSpec.png';
</script>

<svelte:head>
	<title>YIZY</title>
</svelte:head>
<section class="mx-auto w-full pb-20 pt-40">
	<div class="my-28 flex flex-col">
		<h1 class="mx-auto px-4 text-center text-5xl font-bold">From Schema to Type-Safe Code</h1>
		<h1 class="mx-auto px-4 text-center text-5xl font-bold">All in Your Browser</h1>
		<h1 class="text-md mx-auto max-w-[600px] px-4 py-2 text-center font-bold">
			Build Json API The YIZY Way
		</h1>
		<div class="my-2 flex flex-col">
			<div class="mx-auto flex gap-2">
				<a href="/demo">
					<Button class="rounded-full font-bold">Let's Go!</Button>
				</a>
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
			<Accordion.Trigger>Why YIZY?</Accordion.Trigger>
			<Accordion.Content>
				<div>
					I am a big fan of schema-first / contract-first design where I’d write an Open API spec
					and then use code generators to generate server and client code. It’s a pretty good
					workflow when it works, but it requires a lot of fiddling and setup to get everything to
					work nicely across the stack such as
				</div>
				<ul class="m-4 list-item list-disc">
					<li>
						writing the spec in json / yaml is tedious since there is limited code completion and a
						ton of optional fields, I find myself having to read the documentation constantly while
						writing the spec
					</li>
					<li>picking (installing, configuring, and testing) a generator that works</li>
					<li>
						finding the perfect combination between the spec style and the generated code (things
						like whether to define models inline or in the #components section, or sometimes the
						generator would outright ignore what I have in the spec
					</li>
					<li>always forgetting to update the version after changing the spec</li>
				</ul>
				<div class="font-bold">Simplify Open API Spec by Giving up Restful Conventions</div>
				<div>
					Here is a crazy thought. What if we give up Restful conventions and use Open API Spec for
					a simple POST-request-based JSON RPC described below?
				</div>
				<ul class="m-5 list-item list-disc">
					<li>
						Use 'Action' instead of 'Resource' in url. Eg. /getUserById instead of /user/{'{id}'}
					</li>
					<li>Endpoints must only accept POST request with content type application/json.</li>
					<li>
						endpoint must only allow POST requests with headers and a body. Query and path
						Parameters are ignored
					</li>
					<li>
						endpoint must return a response body with consistent schema regardless of status code
					</li>
				</ul>
				<div class="font-bold">Further Simplifying Open API Spec by Distilling It</div>

				<ul class="m-5 list-item list-disc">
					<li>
						remove security (this can be documented either in the service description or endpoint
						description
					</li>
					<li>remove validation rules (this can be documented in the field description)</li>
					<li>remove the ability to define inline model</li>
				</ul>

				<div class="font-bold">The Result</div>
				We end up with a minimalistic spec that is both machine and human friendly.
				<img src={exampleSpecImg} alt="yizy spec example" />
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</section>

<Decoration rotate={true} />
<section class="h-20 bg-background"></section>
