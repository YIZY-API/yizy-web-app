<script>
	import GoogleAnalytics from '$lib/GoogleAnalytics.svelte';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
</script>

<GoogleAnalytics />
<ModeWatcher />
<div>
	<div class="fixed top-0 z-20 w-full border-b border-b-muted bg-background">
		<Navbar />
	</div>
	<div class="h-screen w-full">
		<slot></slot>
	</div>
</div>
