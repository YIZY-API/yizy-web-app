<script>
	import '../../app.css';
	import Sidebar from './components/Sidebar.svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="hidden h-screen w-[300px] bg-secondary lg:fixed lg:block">
	<Sidebar />
</div>
<div class="h-screen w-full">
	<div class="px-2 pt-20 lg:ml-[300px]">
		{@render children?.()}
	</div>
</div>
