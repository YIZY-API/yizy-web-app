<script lang="ts">
	import { Check } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import Decoration from './components/Decoration.svelte';
	import { Languages, HardHat, Link, Zap, File, ArrowRight, BicepsFlexed } from 'lucide-svelte';
	import { onMount } from 'svelte';

	onMount(() => {});

	const plans = [
		{
			name: 'Community',
			price: 'Free Forever',
			description: 'Free Forever!',
			features: [
				'Edit API Spec with in Browser Editor',
				'Unlimited Spec Import and Export in JSON',
				'Unlimited Model Generation',
				'Unlimited Client Code Generation',
				'Community support',
				'One Spec Limit',
				'AI Assistant'
			],
			ctaText: 'Get Started',
			popular: false
		},
		{
			name: 'Indie Hacker',
			price: '$5',
			description: 'Monthly',
			features: [
				'Edit API Spec with in Browser Editor',
				'Unlimited Spec Import and Export in JSON',
				'Unlimited Model Generation',
				'Unlimited Client Code Generation',
				'Community support',
				'Auto API Spec Versioning',
				'Spec Storage and Management',
				'Unlimited Spec',
				'AI Assistant'
			],
			ctaText: 'Get Started',
			popular: false
		},
		{
			name: 'Team',
			price: '$5',
			description: 'Monthly per member with a minimum of 3 users',
			features: [
				'Edit API Spec with in Browser Editor',
				'Unlimited Spec Import and Export in JSON',
				'Unlimited Model Generation',
				'Unlimited Client Code Generation',
				'Community support',
				'Auto API Spec Versioning',
				'Spec Storage and Management',
				'AI Assistant',
				'Team Collaboration (Coming Soon!)',
				'Github Actions (Coming Soon!)',
				'CLI Tool (Coming Soon!)',
				'Self-Hosting'
			],
			ctaText: 'Contact Us',
			popular: false
		}
	];

	function onCTAClicked(name: string) {
		const Community = 0;
		const IndieHacker = 1;
		const Team = 2;
		if (name === plans[Community].name) {
			window.location.href = '/app';
		}

		if (name === plans[IndieHacker].name) {
			window.location.href = '/upgrade';
		}

		if (name === plans[Team].name) {
			window.location.href = '/contact';
		}
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="mx-auto w-full pb-20 pt-40 xl:pb-0">
	<div class="my-24 flex flex-col">
		<h1 class="mx-auto px-4 text-center text-3xl font-bold md:text-5xl">
			Documentation First API Dev
		</h1>
		<h1 class="mx-auto mb-2 px-4 text-center text-3xl font-bold md:text-5xl">
			Made <spen class=" animate-pulse-slow text-primary">Yizy</spen>
		</h1>
		<h1 class=" mx-auto max-w-2xl px-4 py-2 text-center text-xl text-muted-foreground md:text-xl">
			Document and Build Typesafe JSON APIs with Instant Code Generation. Boost Development
			Productivity with AI.
		</h1>
		<div class="mx-auto my-2 flex flex-col gap-2 sm:flex-row">
			<Button
				class="mx-auto my-2 rounded-full font-bold"
				onclick={() => {
					window.location.href = '/app';
				}}>Start Now</Button>
			<a href="/doc/introduction/quick-start" class="mx-auto my-2">
				<Button class="mx-auto rounded-full font-bold" variant="outline">View Documentation</Button>
			</a>
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
			<!--<img src={demoImg} alt="yizy editor" />-->
			<div class="p-8">
				<video class="rounded-lg" controls>
					<source src="https://assets.yizy.dev/edit.mov" type="video/mp4" />
					<track kind="captions" />
				</video>
			</div>
		</div>
		<div class="mx-auto flex flex-col">
			<h1 class="px-4 text-lg font-bold text-[#171f30] sm:px-10 sm:text-2xl">
				2. Generate Model Definition and Client SDK Instantly From Documentation
			</h1>
			<div class="text-md px-4 font-light text-[#171f30] sm:px-10 sm:text-xl">
				Generate Model Definition and Client code instantly in the browser instantly
			</div>
			<!--<img src={codeDemoImg} alt="yizy generator" />-->

			<div class="p-8">
				<video class="rounded-lg" controls>
					<source src="https://assets.yizy.dev/codegen.mov" type="video/mp4" />
					<track kind="captions" />
				</video>
			</div>
		</div>

		<div class="mx-auto flex flex-col">
			<h1 class="px-4 text-lg font-bold text-[#171f30] sm:px-10 sm:text-2xl">
				3. Chat with a LLM that knows about your API Spec
			</h1>
			<div class="text-md px-4 font-light text-[#171f30] sm:px-10 sm:text-xl">
				Generate curl command, request body in JSON, backend boilerplate code, you name it!
			</div>
			<div class="p-8">
				<video class="rounded-lg" controls>
					<source src="https://assets.yizy.dev/llm.mov" type="video/mp4" />
					<track kind="captions" />
				</video>
			</div>
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
			<BicepsFlexed class="mx-auto text-primary" />
			<h1 class="pt-2 text-center text-lg font-bold text-primary">AI Power</h1>
			<p class="px-4 text-center text-sm font-light text-foreground">Chat With Context Aware AI</p>
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
		<h1 class="py-8 text-center text-4xl font-bold text-[#171F30] sm:col-span-3">Pricing</h1>
	</div>

	<div class="mx-auto w-full max-w-6xl py-8">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each plans as plan}
				<Card.Root
					class={`flex flex-col ${plan.popular ? 'border-primary shadow-lg' : 'border-border'}`}>
					<Card.Header>
						{#if plan.popular}
							<div class="mb-2 text-sm font-medium text-primary">Most Popular</div>
						{/if}
						<Card.Title class="text-xl font-bold text-primary">{plan.name}</Card.Title>
						<div class="mt-2">
							<span class="text-3xl font-bold">{plan.price}</span>
						</div>
						<Card.Description class="mt-2">
							{plan.description}
						</Card.Description>
					</Card.Header>

					<Card.Content class="flex-grow">
						<ul class="space-y-3">
							{#each plan.features as feature}
								<li class="flex items-center gap-2">
									<Check class="h-4 w-4 text-primary" />
									<span>{feature}</span>
								</li>
							{/each}
						</ul>
					</Card.Content>

					<Card.Footer class="pt-6">
						<Button
							class="w-full hover:bg-primary"
							variant={'outline'}
							onclick={() => onCTAClicked(plan.name)}>
							{plan.ctaText}
						</Button>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</div>
</section>

<Decoration rotate={true} />
<section class="flex flex-col bg-background py-20">
	<h2 class="mx-auto mb-6 text-4xl font-bold">Ready to Build APIs the Yizy Way?</h2>
	<p class="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">Experience the Yizy Way</p>
	<Button
		size="lg"
		class="mx-auto animate-bounce rounded-full"
		onclick={() => {
			window.location.href = '/app';
		}}>
		Start Building Now <ArrowRight class="ml-2" />
	</Button>
</section>

<Decoration rotate={false} />

<section class="flex h-20 flex-col bg-primary"></section>
