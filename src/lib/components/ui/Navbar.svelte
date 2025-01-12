<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Github from '$lib/components/ui/icons/Github.svelte';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import Menu from 'lucide-svelte/icons/menu';
	import YizyLogo from './YIZYLogo.svelte';
	import Button from './button/button.svelte';
	import { User } from 'lucide-svelte';

	let {
		onOpenSidebarBtnClicked,
		isUserLoggedIn
	}: { onOpenSidebarBtnClicked?: () => void; isUserLoggedIn: boolean } = $props();

	function openSidebar() {
		if (onOpenSidebarBtnClicked) {
			onOpenSidebarBtnClicked();
		}
	}
</script>

<div class="flex h-20 w-full flex-row justify-between align-middle">
	<a href="/" class="my-auto flex flex-row sm:pl-4">
		<div class="mx-2 h-12 w-12 text-xs">
			<YizyLogo />
		</div>
		<h1 class="my-auto hidden text-lg font-black text-primary md:block">YIZY</h1>
	</a>
	<div class="my-auto flex flex-row sm:pr-4">
		<a
			href="/"
			class="mx-2 my-auto hidden text-sm font-bold hover:text-primary sm:mx-4 sm:text-lg md:block"
			>Home</a>

		<a
			href="/demo"
			class="mx-2 my-auto hidden text-center text-sm font-bold hover:text-primary sm:mx-4 sm:text-left sm:text-lg md:block"
			>Demo</a>

		<a
			href="/doc/introduction"
			class="mx-2 my-auto hidden text-center text-sm font-bold hover:text-primary sm:mx-4 sm:text-left sm:text-lg md:block"
			>Documentation</a>

		{#if !isUserLoggedIn}
			<a
				href="/login"
				class="mx-2 my-auto hidden text-center text-sm font-bold hover:text-primary sm:mx-4 sm:text-left sm:text-lg md:block"
				>Login</a>
		{/if}
		<div class="ml-4 flex h-full">
			<a
				href="https://github.com/YIZY-API/yizy-web-app"
				class="hidden text-center text-sm font-bold hover:text-primary sm:text-left sm:text-lg md:flex">
				<Button variant="outline" size="icon" class="my-auto">
					<Github />
				</Button>
			</a>
		</div>
		<div class="my-auto ml-2 hidden md:block">
			<DarkModeToggle />
		</div>
		{#if isUserLoggedIn}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<div class="my-auto ml-2 hidden md:block">
						<Button variant="outline" size="icon" class="my-auto">
							<User />
						</Button>
					</div>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="mr-4 bg-secondary">
					<DropdownMenu.Group>
						<DropdownMenu.GroupHeading>My Account</DropdownMenu.GroupHeading>
						<DropdownMenu.Separator />
						<DropdownMenu.Item><a href="/api/auth/logout">Log out</a></DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{/if}

		<Button onclick={() => openSidebar()} variant="ghost" size="icon" class="mx-2 md:hidden">
			<Menu class="h-[1.2rem] w-[1.2rem]" />
		</Button>
	</div>
</div>
