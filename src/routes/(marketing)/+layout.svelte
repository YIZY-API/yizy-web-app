<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import type { LayoutData } from './$types';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import '../../marketing.css';
	import { ModeWatcher } from 'mode-watcher';
	import * as Sheet from '$lib/components/ui/sheet';
	import DarkModeToggle from '$lib/components/ui/DarkModeToggle.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Snippet } from 'svelte';
	import Github from '$lib/components/ui/icons/Github.svelte';
	import { User } from 'lucide-svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	let isSidebarOpened = $state(false);
	function openSidebar() {
		isSidebarOpened = true;
	}
	function closeSidebar() {
		isSidebarOpened = false;
	}

	function isUserLoggedIn(): boolean {
		return data.authState !== null;
	}
</script>

<ModeWatcher />
<div>
	<div class="fixed top-0 z-20 w-full border-b border-b-muted bg-background">
		<Navbar onOpenSidebarBtnClicked={openSidebar} isUserLoggedIn={isUserLoggedIn()} />
	</div>
	<div class="h-screen w-full">
		{@render children?.()}
	</div>
</div>

<Sheet.Root bind:open={isSidebarOpened}>
	<Sheet.Content side="right" class="overflow-y-scroll">
		<a href="/" onclick={() => closeSidebar()}
			><h1 class="my-2 font-bold hover:text-primary">Home</h1></a>
		{#if !isUserLoggedIn()}
			<a
				href="/login"
				onclick={() => {
					closeSidebar();
				}}>
				<h1 class="my-2 font-bold hover:text-primary">Login</h1>
			</a>
		{/if}

		<a href="/demo" onclick={() => closeSidebar()}
			><h1 class="my-2 font-bold hover:text-primary">Demo</h1></a>
		<div class="my-4 flex flex-row gap-2">
			<a
				href="https://github.com/YIZY-API/yizy-web-app"
				class="text-center text-sm font-bold hover:text-primary sm:text-left sm:text-lg">
				<Button variant="outline" size="icon" class="my-auto">
					<Github></Github>
				</Button>
			</a>
			<DarkModeToggle />
			{#if isUserLoggedIn()}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<div class="text-center text-sm font-bold hover:text-primary sm:text-left sm:text-lg">
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
		</div>
	</Sheet.Content>
</Sheet.Root>
