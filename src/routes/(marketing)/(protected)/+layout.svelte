<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
	import '../../../marketing.css';
</script>

{@render children?.()}
