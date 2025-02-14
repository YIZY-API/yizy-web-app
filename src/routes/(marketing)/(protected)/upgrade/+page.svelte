<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Rocket } from 'lucide-svelte';
	import type { PageData } from './$types';
	import Slack from '$lib/components/ui/icons/Slack.svelte';
	import { Mail } from 'lucide-svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();
	const hasSessionId = page.url.searchParams.has('session_id');
	onMount(() => {
		console.log(hasSessionId);
	});
</script>

<svelte:head>
	<title>Upgrade</title>
</svelte:head>

<div class="mx-auto h-full max-w-[400px] pb-8 pt-32">
	{#if !data.authState?.user.isSubscribed}
		{#if hasSessionId}
			<Card.Root class="w-[380px]">
				<Card.Header>
					<Card.Title>🙏🏻<span class="ml-2">Thanks for Subscribing</span></Card.Title>
					<Card.Description
						>We are confirming your payment status, come back later! If you can't navigate to /app
						after 5 min. Contact me at kelvin@yizy.dev</Card.Description>
				</Card.Header>
				<Card.Content class="flex flex-col">
					<a href="/app" class="mx-auto"><Button>Start Hacking</Button></a>
					<Separator class="my-6" />
					<div>
						<p class="text-md mb-2 text-center text-sm font-bold leading-none">Have a question?</p>
						<div class="flex h-full flex-col text-sm text-primary">
							<a
								class="mx-auto my-4 flex flex-row gap-2 text-sm"
								href="https://join.slack.com/t/yizy/shared_invite/zt-2wl6jdf1z-aA9UKJ6w8MqpnEkHEVsoww">
								<div class="h-6">
									<Slack></Slack>
								</div>
								Join Us on Slack</a>
							<a class=" mx-auto my-4 flex flex-row gap-2 text-sm" href="mailto:kelvin@yizy.dev">
								<div class="h-6">
									<Mail></Mail>
								</div>
								Send Me an Email</a>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		{:else}
			<Card.Root class="w-[380px]">
				<Card.Header>
					<Card.Title>👋🏻<span class="ml-2">Welcome</span></Card.Title>
					<Card.Description>Subscribe To Indie Hacker's Plan</Card.Description>
				</Card.Header>
				<Card.Content>
					<p class="text-md mb-2 font-medium leading-none">
						Subscribe to store the spec on Yizy's server and get automatic versioning every time you
						save the spec!
					</p>
				</Card.Content>
				<Card.Footer class="flex flex-col">
					<form action="/api/stripe/createCheckoutSession" method="POST">
						<input type="hidden" name="lookupKey" value="price_1QhucLEAz7NBJIGc3cEywC7q" />
						<Button id="checkout-and-portal-button" type="submit" class="w-full">
							<Rocket />
							Subscribe</Button>
					</form>
				</Card.Footer>
			</Card.Root>
		{/if}
	{:else}
		<Card.Root class="w-[380px]">
			<Card.Header>
				<Card.Title>🙏🏻<span class="ml-2">Thanks for Subscribing</span></Card.Title>
				<Card.Description>Happy Hacking!</Card.Description>
			</Card.Header>
			<Card.Content class="flex flex-col">
				<a href="/app" class="mx-auto"><Button>Start Hacking</Button></a>
				<Separator class="my-6" />
				<div>
					<p class="text-md mb-2 text-center text-sm font-bold leading-none">Have a question?</p>
					<div class="flex h-full flex-col text-sm text-primary">
						<a
							class="mx-auto my-4 flex flex-row gap-2 text-sm"
							href="https://join.slack.com/t/yizy/shared_invite/zt-2wl6jdf1z-aA9UKJ6w8MqpnEkHEVsoww">
							<div class="h-6">
								<Slack></Slack>
							</div>
							Join Us on Slack</a>
						<a class=" mx-auto my-4 flex flex-row gap-2 text-sm" href="mailto:kelvin@yizy.dev">
							<div class="h-6">
								<Mail></Mail>
							</div>
							Send Me an Email</a>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	{/if}
</div>
