<script lang="ts">
	import Github from 'lucide-svelte/icons/github';
	import GoogleAnalytics from '$lib/GoogleAnalytics.svelte';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import * as Sheet from '$lib/components/ui/sheet';
	import DarkModeToggle from '$lib/components/ui/DarkModeToggle.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { supabase } from '$lib/supabase/client';
	import { type Subscription } from '@supabase/supabase-js';
	import { onDestroy, onMount } from 'svelte';
	import { onLogIn, onLogOut } from '$lib/state';
	let { children } = $props();

	let isSidebarOpened = $state(false);
	function openSidebar() {
		isSidebarOpened = true;
	}
	function closeSidebar() {
		isSidebarOpened = false;
	}

	let supabaseSub: Subscription | null = $state(null);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			supabaseSub = data.subscription;
			if (event === 'SIGNED_IN') {
				onLogIn();
			} else if (event === 'SIGNED_OUT') {
				onLogOut();
			}
		});
	});

	onDestroy(() => {
		if (supabaseSub) {
			supabaseSub.unsubscribe();
		}
	});
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
		<a
			href="/register"
			onclick={() => {
				closeSidebar();
			}}>
			<h1 class="my-2 font-bold hover:text-primary">Login</h1>
		</a>

		<a href="/demo" onclick={() => closeSidebar()}
			><h1 class="my-2 font-bold hover:text-primary">Demo</h1></a>
		<div class="my-4 flex flex-row gap-2">
			<a
				href="https://github.com/YIZY-API/yizy-web-app"
				class="text-center text-sm font-bold hover:text-primary sm:text-left sm:text-lg">
				<Button variant="outline" size="icon" class="my-auto">
					<Github />
				</Button>
			</a>
			<DarkModeToggle />
		</div>
	</Sheet.Content>
</Sheet.Root>
