<script lang="ts">
	import GoogleAnalytics from '$lib/GoogleAnalytics.svelte';
	import { onMount, type Snippet } from 'svelte';
	import { ModeWatcher } from 'mode-watcher';

	let { children }: { children: Snippet } = $props();
	let isMounted = $state(false);
	onMount(() => {
		isMounted = true;
	});
</script>

<GoogleAnalytics />
{#if isMounted}
	<ModeWatcher />
	<div>
		<div class="h-screen w-full">
			{@render children?.()}
		</div>
	</div>
{/if}
