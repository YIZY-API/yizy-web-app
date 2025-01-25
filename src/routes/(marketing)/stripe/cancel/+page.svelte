<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Slack from '$lib/components/ui/icons/Slack.svelte';
	import { Mail, TriangleAlertIcon } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Stripe Payment Failed</title>
</svelte:head>

<div class="mx-auto h-full max-w-[400px] pb-8 pt-32">
	<Card.Root class="w-[380px]">
		<Card.Header>
			<Card.Title class="flex flex-row">
				<TriangleAlertIcon class="text-destructive" />
				<span class="my-auto ml-2">Oops!</span>
			</Card.Title>
			<Card.Description>Try again later</Card.Description>
		</Card.Header>
		<Card.Content class="flex flex-col">
			<p class="mb-4">
				Something went wrong. Try again later. If the problem persists, contact me!
			</p>
			<div>
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
</div>
