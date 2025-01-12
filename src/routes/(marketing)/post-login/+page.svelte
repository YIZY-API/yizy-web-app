<script lang="ts">
	import { LoaderCircle } from 'lucide-svelte';
	import * as localStorageService from '$lib/localStorageService';
	import { onMount } from 'svelte';

	onMount(() => {
		localStorageService.setClientSideLoginState();
		const path = localStorageService.getPostLoginPath();
		console.log(path);
		localStorageService.setPostLoginPath('');
		window.location.href = path;
	});
</script>

<div class="mx-auto flex h-full max-w-[400px] pb-8 pt-32">
	<LoaderCircle class="mx-auto animate-spin" />
</div>
