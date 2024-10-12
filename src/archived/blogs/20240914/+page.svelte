<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import HighlightCode from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';

	const errorExample = ` 
export interface ResponseObject {
    error: Error | null;
    result: Result;
} 
    `;
</script>

<svelte:head>
	<title>2024 Sep 14</title>
</svelte:head>

<div class="prose prose-slate mx-auto dark:prose-invert">
	<h1>My First Attempt to Replace Open API Spec</h1>
	<small>2024 Sep 14</small>

	<p>
		I’ve decided to support writing the spec in Typescript for code completion, as well as YAML/JSON
		for people who like to suffer 😉. The site will generate API docs, request and response models,
		and client SDK code right in the browser so you can see the result right away and copy the code
		right into your editor without having to set up any tooling yourself. Salute to shadcn.
	</p>
	<a href="/app" class="text-primary">Check out the Beta Version</a>
	<p>
		The approach I am taking to simplify the spec aggressively is to only support POST requests and
		standardize the response model regardless of the returned http status code. The response will
		look similar to the return type of a Golang function. You get to decide the schema of the error
		as long as it’s the same across all of your responses.
	</p>

	<HighlightCode language={typescript} code={errorExample} />
	<p>
		As of now the site does not support uploading the spec yet and it only generates php code that
		might not work, because I am desperately trying to avoid writing php code at work and I am doing
		everything in a hurry. 🫠
	</p>

	<p>Any feedback is appreciated!</p>

	<div class="mb-8 mt-2 flex flex-col">
		<a href="https://tally.so/r/me2BZQ" class="mx-auto my-2 text-primary">
			<Button class="rounded-full font-bold">Get on the Waitlist</Button></a
		>
		<a href="mailto:whkelvin.hsu@gmail.com" class="mx-auto text-primary"
			><small>Send me an Email!</small></a
		>
	</div>
</div>
