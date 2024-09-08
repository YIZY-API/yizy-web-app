<script>
	import GoogleAnalytics from '$lib/GoogleAnalytics.svelte';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
</script>

<GoogleAnalytics />
<ModeWatcher />
<Navbar />
<div class="w-screen px-8">
	<slot></slot>
</div>
