<script>
	import HighlightCode from '$lib/components/ui/HighlightCode.svelte';
	import { typescript } from 'svelte-highlight/languages';
</script>

<svelte:head>
	<title>Introduction</title>
</svelte:head>

<h1>Introduction</h1>

<h2>From the Author</h2>
<p>Hello there! 👋🏻</p>
<p>
	I am Kelvin. I have been building HTTP JSON APIs for most of my programming career. I started with
	Restful APIs where I’d build the server implementation and then write client code that talks to
	the server without any toolings. It bothers me that you don’t get type safety across the server
	and client because servers and clients are often written in different languages. I also don’t like
	having to read the server code or documentation everytime I need to send out a request to the
	backend.
</p>
<p>
	Soon I discovered Open API Specification. It’s basically a very complicated JSON document
	describing the endpoints a backend server would have, the shape of the request and response
	models, security schemes, as well as other useful information about the server. You can typically
	generate the Open API Specification from a backend framework if you add a few annotation in the
	backend code.
</p>
<p>
	Since Open API Specification describes the inputs and outputs of an endpoint in a machine readable
	way, there are a lot of open source code generators that will take the Open API Spec and generate
	client code so that you don’t have to write it yourself. I immediately fell in love with building
	HTTP APIs this way. Not only do you get type safety across the server and the client, but you also
	don’t have to write the client implementation.
</p>
<p>
	This code-first approach of building APIs works great until I had to generate client code in
	multiple languages. Open API Spec has a lot of optional fields and supports various ways to define
	complicated request and response models. It sounds good on paper, but in reality, most code
	generators only choose to support a subset of the features provided by Open API Spec. I started
	noticing that sometimes the generated spec would generate unuseable client code in some languages
	and I had to debug how the spec gets generated from code annotations and how the client code gets
	generated from the spec.
</p>
<p>
	Then I discovered a workflow called schema-first approach. In this approach, I’d start API
	development with writing the Open API Specification by hand, and then generate server and client
	code. With direct control over the content of the spec, I can debug the generators more easily
	without having to go through the pipeline of server code → spec → generated client code.
</p>
<p>
	The schema-first approach is by far my favorite approach to build APIs. It decouples the frontend
	and backend developers with a contract and enable the frontend and backend devs to work in
	parallel. It also reduces a lot of back and fourth communication between the teams and makes
	breaking changes very easy to spot.
</p>
<p>
	It has one caveat though. The amount of time and tedious effort it takes to set up the toolchain
	for schema-first design does not justify the benefits it brings. Convincing the devs to write Open
	API Spec by hand is already an uphill battle.
</p>
<p>
	So I decided to build Yizy. I am going to make building HTTP JSON APIs so unconventionally easy
	even your grandma could do it. Let's get started!
</p>

<h1>Building HTTP JSON API the YIZY way</h1>

<p>
	In order to make schema-first design unconventionally easy, I have to make a few unconventional
	design decisions by distilling the absolute essential components to send JSON over http.
</p>

<h2>HTTP Verbs? Just Use POST for Everything</h2>
<p>
	The easiest way to send JSON over HTTP is with a POST request. Why not just send everything with a
	POST request?
</p>
<h2>Ditch Query and Path Parameters in URL</h2>
<p>
	There are so many ways to pass information into an API endpoint. You’ve got query parameters, path
	parameters, request body, request headers, etc. Here is a better idea.
</p>

<ol>
	<li>
		Use URL as a place to convey intention, use verbs and actions in url such as `/getUserById`
		Avoid using the url to pass inputs to the endpoint.
	</li>
	<li>Use request body to store the input to the endpoint</li>
	<li>Use headers to store configuration values for authentication and authorization purposes</li>
</ol>

<h2>Status Code and Response</h2>
<p>Use consistent response model regardless of status code for a single endpoint.</p>
<HighlightCode
	language={typescript}
	code={`interface Response {
    result: Result | null;
    error: Error | null;
}`}></HighlightCode>
