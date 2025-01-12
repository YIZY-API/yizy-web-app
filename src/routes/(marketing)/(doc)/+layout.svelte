<script>
	import '../../../app.css';
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
	<div class="h-full px-2 pt-20 lg:ml-[300px]">
		<div class="h-full w-full overflow-auto">
			<div
				class="prose prose-slate mx-auto flex w-full !max-w-screen-lg flex-col px-4 pb-20 pt-10 dark:prose-invert md:prose-lg prose-h1:my-6 prose-h2:my-4 prose-p:my-2 prose-a:text-primary">
				{@render children?.()}
			</div>
		</div>
	</div>
</div>
