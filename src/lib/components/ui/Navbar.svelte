<script>
	import DarkModeToggle from './DarkModeToggle.svelte';
	import YizyLogo from './YIZYLogo.svelte';
</script>

<div class="flex h-20 w-full flex-row justify-between align-middle">
	<a href="/" class="my-auto flex flex-row sm:pl-4">
		<div class="mx-2 h-12 w-12 text-xs">
			<YizyLogo />
		</div>
		<h1 class="my-auto hidden text-lg font-black text-primary md:block">YIZY API</h1>
	</a>
	<div class="my-auto flex flex-row sm:pr-4">
		<a href="/" class="mx-2 my-auto text-sm font-bold hover:text-primary sm:mx-4 sm:text-lg">Home</a
		>
		<a
			href="/getting-started"
			class="mx-2 my-auto text-center text-sm font-bold hover:text-primary sm:mx-4 sm:text-left sm:text-lg"
			>Getting Started</a
		>
		<a href="/demo" class="mx-2 my-auto text-sm font-bold hover:text-primary sm:mr-4 sm:text-lg"
			>Demo</a
		>
		<DarkModeToggle />
	</div>
</div>
