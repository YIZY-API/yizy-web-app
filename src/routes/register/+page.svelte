<script lang="ts">
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import * as yizyClient from '$lib/api-client/yizyClient';
	import { v4 as uuidv4 } from 'uuid';
	import { Cookie } from 'lucide-svelte';

	let signUpEmail = $state('');
	let signUpPassword = $state('');
	let signUpInProgress = $state(false);
	let signUpError = $state('');

	let loginEmail = $state('');
	let loginPassword = $state('');
	let loginInProgress = $state(false);
	let loginError = $state();

	let defaultMode = $state('login');

	onMount(() => {
		if ($page.url.searchParams.has('mode')) {
			const m = $page.url.searchParams.get('mode')?.toLowerCase();
			if (m == 'signup' || m == 'login') {
				defaultMode = m;
			}
		}
	});

	async function onSignUpClicked() {
		signUpInProgress = true;
		console.log('todo');
		signUpInProgress = false;
	}

	async function onLoginClicked() {
		loginInProgress = true;
		console.log('login clicked');
		const res = await yizyClient.login({ email: uuidv4() + 'test@gmail.com' });
		console.log(res);
		if (res.error === null && res.result != null) {
			localStorage.setItem('sessionToken', res.result.token);
		}
		//if (error != null) {
		//	loginError = 'something went wrong, try again later';
		//} else {
		//	console.log('login success', data);
		//}
		loginInProgress = false;
	}
</script>

<svelte:head>
	<title>Login Or Register</title>
</svelte:head>

<Tabs.Root value={defaultMode} class="mx-auto max-w-[400px] pb-8 pt-32">
	<Tabs.List class="grid w-full grid-cols-2">
		<Tabs.Trigger value="login">Login</Tabs.Trigger>
		<Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="login">
		<Card.Root>
			<Card.Header>
				<Card.Title class="text-center">Login</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2">
				<div class="space-y-1">
					<Label for="loginEmail">Email</Label>
					<Input id="loginEmail" bind:value={loginEmail} />
				</div>
				<div class="space-y-1">
					<Label for="loginPassword">Password</Label>
					<Input id="loginPassword" type="password" bind:value={loginPassword} />
				</div>
			</Card.Content>
			<Card.Footer class="flex flex-col">
				<small class="pb-2 text-destructive">{loginError}</small>
				{#if loginInProgress}
					<Button disabled class="mx-auto">
						<LoaderCircle class="animate-spin" />
						Please wait
					</Button>
				{:else}
					<Button onclick={() => onLoginClicked()} class="mx-auto">Log In</Button>
				{/if}
			</Card.Footer>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="signup">
		<Card.Root>
			<Card.Header>
				<Card.Title class="text-center">Sign Up</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2">
				<div class="space-y-1">
					<Label for="signUpEmail">Email</Label>
					<Input id="signUpEmail" bind:value={signUpEmail} />
				</div>
				<div class="space-y-1">
					<Label for="signUpPassword">Password</Label>
					<Input id="signUpPassword" bind:value={signUpPassword} type="password" />
				</div>
			</Card.Content>
			<Card.Footer class="flex flex-col">
				<small class="pb-2 text-destructive">{signUpError}</small>
				{#if signUpInProgress}
					<Button disabled class="mx-auto">
						<LoaderCircle class="animate-spin" />
						Please wait
					</Button>
				{:else}
					<Button onclick={() => onSignUpClicked()} class="mx-auto">Sign up</Button>
				{/if}
			</Card.Footer>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>
