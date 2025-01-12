<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Rocket } from 'lucide-svelte';
</script>

<div class="mx-auto h-full max-w-[400px] pb-8 pt-32">
	<Card.Root class="w-[380px]">
		<Card.Header>
			<Card.Title>👋🏻<span class="ml-2">Welcome</span></Card.Title>
			<Card.Description>A message from Kelvin</Card.Description>
		</Card.Header>
		<Card.Content>
			<p class="text-md mb-2 font-medium leading-none">
				Hey there! <br /> Thanks for trying out the Indie Hacker Plan. Here are some good news for you.
			</p>
			<p class="text-md mb-2 font-medium leading-none">
				I am still working on the Stripe integration. So you can use the Indie Hacker Plan for free
				until I finish building the integration.
			</p>
			<p class="text-md mb-2 font-medium leading-none">Happy Hacking!</p>
		</Card.Content>
		<Card.Footer>
			<Button
				class="w-full"
				onclick={() => {
					window.location.href = '/app';
				}}>
				<Rocket />
				Let's Go!</Button>
		</Card.Footer>
	</Card.Root>
</div>
