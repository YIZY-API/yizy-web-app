<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<svelte:head>
	<title>Login Or Register</title>
</svelte:head>

<div class="mx-auto h-full max-w-[400px] pb-8 pt-32">
	<Card.Root class="mt-20 p-2">
		<Card.Header>
			<Card.Title class="text-center">Login</Card.Title>
			<Card.Description class="text-center">Login with Google</Card.Description>
		</Card.Header>
		<Card.Content class="flex pt-4">
			<a class="m-auto" href="/api/auth/loginWithGoogle">
				<Button>Sign In With Google</Button>
			</a>
		</Card.Content>
	</Card.Root>
</div>

<!--
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
-->
