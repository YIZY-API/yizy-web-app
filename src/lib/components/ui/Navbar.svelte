<script>
	import DarkModeToggle from './DarkModeToggle.svelte';
	import YizyLogo from './YIZYLogo.svelte';
</script>

<div class="flex h-20 w-full flex-row justify-between align-middle">
	<a href="/" class="my-auto flex flex-row px-4">
		<div class="mx-2 h-12 w-12 text-xs">
			<YizyLogo />
		</div>
		<h1 class="my-auto text-lg font-black text-primary">YIZY API Specification</h1>
	</a>
	<div class="my-auto px-4">
		<DarkModeToggle />
	</div>
</div>
