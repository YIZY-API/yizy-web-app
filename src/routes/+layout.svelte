<script lang="ts">
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
