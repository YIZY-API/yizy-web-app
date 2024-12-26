<script lang="ts">
	import { Files, User, Plus } from 'lucide-svelte';

	import YizyLogo from '$lib/components/ui/YIZYLogo.svelte';
</script>

<div class="flex h-full flex-row">
	<div class="flex h-full w-1/5 flex-col border-r">
		<div class="flex h-full flex-row">
			<div class="flex h-full w-12 flex-col gap-3 bg-secondary px-2 py-4">
				<button class="w-full"><Files class="h-8 w-8" /></button>
				<button class="w-full"><User class="h-8 w-8 text-muted" /></button>
			</div>
			<div class="flex flex-grow flex-col">
				<div class="mx-auto my-4 h-12 w-12 text-xs">
					<YizyLogo />
				</div>
				<div class="flex flex-row justify-between bg-border px-2 py-1">
					<div class="my-auto text-sm">My Specs</div>
					<button class="my-auto h-5"><Plus class="h-full" /></button>
				</div>
			</div>
		</div>
	</div>
	<div class="flex w-4/5 p-2">
		<div class="m-auto">Create a new spec</div>
	</div>
</div>
