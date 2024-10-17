<script lang="ts">
	import * as Alert from '$lib/components/ui/alert/index.js';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';
	import HighlightCode from '$lib/components/ui/HighlightCode.svelte';
	import * as code from '$lib/constants';
	import typescript from 'svelte-highlight/languages/typescript';
</script>

<svelte:head>
	<title>Introduction</title>
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
	<h1>What is YIZY API?</h1>
	<p>
		YIZY API is an opinionated framework that helps you build Json API easily. You've probably heard
		of Restful APIs, it's a set of rules that governs how your API should be built. YIZY API is also
		a set of rules that governs how Json API should be built.
	</p>
	<p>
		What makes an API 'Restful'? I get different answers talking to different engineers. When should
		a server return a 404 Not Found and not a 200 OK with null in the response body? I am not sure.
		What I do know is that in my experience, trying to follow Restful convention isn't as restful as
		the name suggests, so I decided to built my own convention.
	</p>

	<h2>YIZY API Convention and Practices</h2>
	<p>Let's start by violating restful practices 😈</p>
	<img src="/assets/doc/yizy-api-convention.png" alt="Yizy API Convention" class="w-[300px]" />

	<h2>YIZY API Specification</h2>
	<p>
		Open API Spec is a very popular format for documenting 'Restful-ish' APIs, YIZY API also has its
		own specification format called the YIZY API Spec. YIZY API Spec is a lean api specification
		format following YIZY API conventions and practices. It's also a subset of Open API spec which
		means it can be converted into an Open API Spec format easily. You can write an YIZY API Spec in
		Typescript with code completion as well as Json and Yaml.
	</p>

	<div class=" col-span-1 sm:col-span-2">
		<HighlightCode
			language={typescript}
			code={code.tsSpec}
			class="h-[500px] overflow-auto text-sm"
		/>
	</div>

	<h2>YIZY Code Generators</h2>
	<p>
		One of the most important benefit of having an API spec is that code can be generated to enforce
		end to end type-safety across the server and the client. Traditional code generators usually
		requires tedious installation and configuration to get up and running. YIZY API Code Generators
		takes a different approach. Upload your spec and you will see generated code you can copy and
		paste into your favorite editor with zero configuration!
	</p>
</div>
