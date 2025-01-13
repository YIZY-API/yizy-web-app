<script lang="ts">
	import '../../app.css';
	import GoogleAnalytics from '$lib/GoogleAnalytics.svelte';
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<GoogleAnalytics />
<div>
	<div class="h-screen w-full">
		{@render children?.()}
	</div>
</div>

<style>
	:root {
		--background: 219 33% 14%;
		--foreground: 0 0% 95%;
		--card: 221 35% 14%;
		--card-foreground: 0 0% 95%;
		--popover: 0 0% 9%;
		--popover-foreground: 0 0% 95%;
		--primary: 193 43% 67%;
		--primary-foreground: 220 35% 8%;
		--secondary: 220 35% 8%;
		--secondary-foreground: 0 0% 98%;
		--muted: 218 17% 28%;
		--muted-foreground: 240 5% 64.9%;
		--accent: 179 25% 65%;
		--accent-foreground: 220 35% 8%;
		--destructive: 354 42% 56%;
		--destructive-foreground: 0 0% 98%;
		--border: 218 17% 28%;
		--input: 218 17% 28%;
		--ring: 193 43% 67%;
		--radius: 0.5rem;
		--sidebar-background: 240 5.9% 10%;
		--sidebar-foreground: 240 4.8% 95.9%;
		--sidebar-primary: 224.3 76.3% 48%;
		--sidebar-primary-foreground: 0 0% 100%;
		--sidebar-accent: 240 3.7% 15.9%;
		--sidebar-accent-foreground: 240 4.8% 95.9%;
		--sidebar-border: 240 3.7% 15.9%;
		--sidebar-ring: 217.2 91.2% 59.8%;
	}
</style>
