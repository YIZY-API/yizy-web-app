<script>
	import GoogleAnalytics from '$lib/GoogleAnalytics.svelte';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import * as Sheet from '$lib/components/ui/sheet';
	import DarkModeToggle from '$lib/components/ui/DarkModeToggle.svelte';
	import * as Accordion from '$lib/components/ui/accordion/index';

	let isSidebarOpened = false;
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
		<slot></slot>
	</div>
</div>

<Sheet.Root bind:open={isSidebarOpened}>
	<Sheet.Content side="right" class="overflow-y-scroll">
		<a href="/" on:click={() => closeSidebar()}
			><h1 class="my-2 font-bold hover:text-primary">Home</h1></a
		>
		<a href="/doc/introduction" on:click={() => closeSidebar()}
			><h1 class="my-2 font-bold hover:text-primary">What is YIZY API?</h1></a
		>
		<a href="/doc/getting-started" on:click={() => closeSidebar()}
			><h1 class="my-2 font-bold hover:text-primary">Getting Started</h1></a
		>
		<a href="/app" on:click={() => closeSidebar()}
			><h1 class="my-2 font-bold hover:text-primary">Try Beta Version</h1></a
		>
		<Accordion.Root class="w-full">
			<Accordion.Item value="item-1">
				<Accordion.Trigger class="font-bold hover:text-primary">Documentation</Accordion.Trigger>
				<Accordion.Content>
					<a href="/doc/introduction" on:click={() => closeSidebar()}
						><h1 class="my-2 font-bold hover:text-primary">Introduction</h1></a
					>
					<a href="/doc/getting-started" on:click={() => closeSidebar()}
						><h1 class="my-2 font-bold hover:text-primary">Getting Started</h1></a
					>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
		<div class="my-4">
			<DarkModeToggle />
		</div>
	</Sheet.Content>
</Sheet.Root>
