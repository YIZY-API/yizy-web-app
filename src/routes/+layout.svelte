<script lang="ts">
	import GoogleAnalytics from '$lib/GoogleAnalytics.svelte';
	import type { Snippet } from 'svelte';
	import { ModeWatcher } from 'mode-watcher';

	let { children }: { children: Snippet } = $props();
</script>

<ModeWatcher />
<GoogleAnalytics />
<div>
	<div class="h-screen w-full">
		{@render children?.()}
	</div>
</div>
