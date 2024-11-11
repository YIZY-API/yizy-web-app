<script>
	import GoogleAnalytics from '$lib/GoogleAnalytics.svelte';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import * as Sheet from '$lib/components/ui/sheet';
	import DarkModeToggle from '$lib/components/ui/DarkModeToggle.svelte';
	let { children } = $props();

	let isSidebarOpened = $state(false);
	function openSidebar() {
		isSidebarOpened = true;
	}
	function closeSidebar() {
		isSidebarOpened = false;
	}
</script>

<GoogleAnalytics />
<ModeWatcher />
<div>
	<div class="fixed top-0 z-20 w-full border-b border-b-muted bg-background">
		<Navbar on:openSidebarEvent={() => openSidebar()} />
	</div>
	<div class="h-screen w-full">
		{@render children?.()}
	</div>
</div>

<Sheet.Root bind:open={isSidebarOpened}>
	<Sheet.Content side="right" class="overflow-y-scroll">
		<a href="/" onclick={() => closeSidebar()}
			><h1 class="my-2 font-bold hover:text-primary">Home</h1></a>
		<a href="/app" onclick={() => closeSidebar()}
			><h1 class="my-2 font-bold hover:text-primary">Getting Started</h1></a>
		<div class="my-4">
			<DarkModeToggle />
		</div>
	</Sheet.Content>
</Sheet.Root>
