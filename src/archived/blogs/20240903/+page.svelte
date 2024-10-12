<svelte:head>
	<title>2024 Sep 03</title>
</svelte:head>

<div class="prose prose-slate mx-auto dark:prose-invert">
	<p>
		I find Open API Specification and the surrounding toolchains frustrating to work with. There are
		a lot of new startups trying to solve existing problems surrounding Open API Spec. Companies
		like Speakeasy, Fern, and Liblab are all trying to improve developer experience surrounding Open
		API Spec. I want to take a different approach.
	</p>

	<p>
		I believe the frustrations surrounding the Open API toolchain is due to how bloated Open API
		Spec is. I build JSON APIs mostly, and I need a quick and easy way to write a spec for my APIs,
		generate server request and response models as well as http clients to get end-to-end type
		safety across my services. If I can get API documentation out of this process, even better.
	</p>

	<p>
		Instead, doing what is supposed to be simple proves to be nearly impossible with Open API Spec.
		First, I have to struggle my way through writing the spec in YAML with no code completion help,
		and let’s face it, there are way too many fields in Open API Spec supporting all kinds of weird
		API use cases. Writing it by hand is a tedious and annoying process.
	</p>
	<p>
		Once I finally come up with a well-crafted Open API spec, I then have to wrestle my way through
		tons of “official” and “unofficial” code generators out there with varying degrees of Open API
		Spec support. 🫠
	</p>

	<p>
		I finally find a good generator only to realize the generator outputs different code depending
		on how you write your spec. Now I am tweaking the spec to get the generator to produce the
		output I want. Oops, now my changes in the spec break the output of another generator. At this
		point I might as well just develop the whole stack in a dynamically typed language and call it a
		day.
	</p>

	<p>
		Enough is enough. I am going to build my own tooling for Open API. Let me try parsing the spec
		first.
	</p>

	<p>I gave up within 5 minutes. Open API Spec is so open-ended it’s impossible to work with.</p>

	<p>
		Time to design a new API spec from scratch. Something more lightweight and human-friendly.
		Something tailored for code generation. Maybe it’s even time to ditch ‘restful’ practices
		altogether and do everything with POST requests. I find restful practices a lot less ‘restful’
		than the name suggests. I don’t know. What do you guys think? Leave your complaints in the
		survey and let me know your pain points with Open API Spec.
	</p>
</div>
