<script>
	import Github from 'lucide-svelte/icons/github';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import Menu from 'lucide-svelte/icons/menu';
	import YizyLogo from './YIZYLogo.svelte';
	import { createEventDispatcher } from 'svelte';
	import Button from './button/button.svelte';

	const dispatch = createEventDispatcher();

	function openSidebar() {
		dispatch('openSidebarEvent');
	}
</script>

<div class="flex h-20 w-full flex-row justify-between align-middle">
	<a href="/" class="my-auto flex flex-row sm:pl-4">
		<div class="mx-2 h-12 w-12 text-xs">
			<YizyLogo />
		</div>
		<h1 class="my-auto hidden text-lg font-black text-primary md:block">YIZY</h1>
	</a>
	<div class="my-auto flex flex-row sm:pr-4">
		<a
			href="/"
			class="mx-2 my-auto hidden text-sm font-bold hover:text-primary sm:mx-4 sm:text-lg md:block"
			>Home</a>
		<a
			href="https://tally.so/r/me2BZQ"
			class="mx-2 my-auto hidden text-center text-sm font-bold hover:text-primary sm:mx-4 sm:text-left sm:text-lg md:block"
			>Get Early Access</a>

		<div class="ml-4 flex h-full">
			<a
				href="https://github.com/YIZY-API/yizy-web-app"
				class="hidden text-center text-sm font-bold hover:text-primary sm:text-left sm:text-lg md:flex">
				<Button variant="outline" size="icon" class="my-auto">
					<Github />
				</Button>
			</a>
		</div>
		<div class="my-auto ml-2 hidden md:block">
			<DarkModeToggle />
		</div>

		<Button onclick={() => openSidebar()} variant="ghost" size="icon" class="mx-2 md:hidden">
			<Menu class="h-[1.2rem] w-[1.2rem]" />
		</Button>
	</div>
</div>
