<script>
	import DarkModeToggle from './DarkModeToggle.svelte';
	import YizyLogo from './YIZYLogo.svelte';
</script>

<div class="flex h-20 w-full flex-row justify-between align-middle">
	<a href="/" class="my-auto flex flex-row px-4">
		<div class="mx-2 h-12 w-12 text-xs">
			<YizyLogo />
		</div>
		<h1 class="my-auto hidden text-lg font-black text-primary md:block">YIZY API Specification</h1>
	</a>
	<div class="my-auto flex flex-row px-4">
		<a href="/" class="mx-4 my-auto font-bold hover:text-primary">Home</a>
		<a href="/demo" class="my-auto mr-4 font-bold hover:text-primary">Demo</a>
		<DarkModeToggle />
	</div>
</div>
