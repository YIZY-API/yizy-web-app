<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';
	import { LoaderCircle } from 'lucide-svelte';

	let { data } = $props();

	onMount(() => {
		console.log(data);
		if (data.authState != null) {
			window.location.href = '/';
		}
	});
</script>

<svelte:head>
	<title>Login Or Register</title>
</svelte:head>

<div class="mx-auto h-full max-w-[400px] pb-8 pt-32">
	{#if data.authState != null}
		<LoaderCircle class="mx-auto animate-spin" />
	{:else}
		<Card.Root class="mt-20 p-2">
			<Card.Header>
				<Card.Title class="text-center">Login</Card.Title>
				<Card.Description class="text-center">
					<p class="mx-auto px-4 text-sm text-muted-foreground">
						You agree to our <a href="/termsAndConditions" class="text-primary underline"
							>terms and conditions</a>
						and
						<a href="/privacyPolicy" class="text-primary underline">privacy policy</a> by signing up.
					</p>
				</Card.Description>
			</Card.Header>
			<Card.Content class="flex pt-4">
				<a
					class="m-auto"
					href={data.postLoginPath
						? '/api/auth/loginWithGoogle' + '?postLoginPath=' + encodeURI(data.postLoginPath)
						: '/api/auth/loginWithGoogle'}>
					<Button>Sign In With Google</Button>
				</a>
			</Card.Content>
		</Card.Root>
	{/if}
</div>
