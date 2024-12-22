<script lang="ts">
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';
	import { onMount } from 'svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import YizySpecTab from './components/YIZYSpecTab.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import YizyDocTab from './components/YIZYDocTab.svelte';
	import YizyGeneratorTab from './components/YIZYGeneratorTab.svelte';

	function onScreenResize() {
		if (window.innerWidth < 550) {
			isScreenTooSmall = true;
		} else {
			isScreenTooSmall = false;
		}
	}

	let isScreenTooSmall = $state(false);

	onMount(() => {
		if (window.innerWidth < 550) {
			isScreenTooSmall = true;
		}
	});
</script>

<svelte:head>
	<title>Demo</title>
</svelte:head>

<svelte:window onresize={onScreenResize} />

<div class="w-full pb-8 pt-24">
	{#if isScreenTooSmall}
		<Alert.Root class="my-4 border-destructive text-destructive">
			<TriangleAlert class="h-4 w-4 stroke-destructive" />
			<Alert.Title>Heads up!</Alert.Title>
			<Alert.Description>
				Oops, this page isn't mobile friendly yet. Tilt your screen to view it in landscape mode!
			</Alert.Description>
		</Alert.Root>
	{/if}

	<Tabs.Root value="yizy-api-spec" class="px-4">
		<Tabs.List class="grid w-full grid-cols-3">
			<Tabs.Trigger value="yizy-api-spec">1. Edit Spec</Tabs.Trigger>
			<Tabs.Trigger value="yizy-doc">2. See Documentation</Tabs.Trigger>
			<Tabs.Trigger value="yizy-gen">3. Generate Code</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="yizy-api-spec">
			<YizySpecTab />
		</Tabs.Content>
		<Tabs.Content value="yizy-doc">
			<YizyDocTab />
		</Tabs.Content>
		<Tabs.Content value="yizy-gen">
			<YizyGeneratorTab />
		</Tabs.Content>
	</Tabs.Root>
</div>
