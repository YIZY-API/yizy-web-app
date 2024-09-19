<script lang="ts">
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';
	import { onMount } from 'svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import YizySpecTab from './components/YIZYSpecTab.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import YizyDocTab from './components/YIZYDocTab.svelte';
	import YizyModelsTab from './components/YIZYModelsTab.svelte';
	import YizyClientSdkTab from './components/YIZYClientSDKTab.svelte';

	function onScreenResize() {
		if (window.innerWidth < 550) {
			isScreenTooSmall = true;
		} else {
			isScreenTooSmall = false;
		}
	}

	let isScreenTooSmall = false;

	onMount(() => {
		if (window.innerWidth < 550) {
			isScreenTooSmall = true;
		}
	});
</script>

<svelte:head>
	<title>Demo</title>
</svelte:head>

<svelte:window on:resize={onScreenResize} />

<div>
	{#if isScreenTooSmall}
		<Alert.Root class="my-4 border-destructive text-destructive">
			<TriangleAlert class="h-4 w-4 stroke-destructive" />
			<Alert.Title>Heads up!</Alert.Title>
			<Alert.Description>
				Oops, this page isn't mobile friendly yet. Tilt your screen to view it in landscape mode!
			</Alert.Description>
		</Alert.Root>
	{/if}

	<Tabs.Root value="yizy-api-spec" class="w-full">
		<Tabs.List class="grid w-full grid-cols-4">
			<Tabs.Trigger value="yizy-api-spec">YIZY API Spec</Tabs.Trigger>
			<Tabs.Trigger value="yizy-doc">YIZY Doc</Tabs.Trigger>
			<Tabs.Trigger value="models">Models</Tabs.Trigger>
			<Tabs.Trigger value="client-sdk">Client SDK</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="yizy-api-spec">
			<YizySpecTab />
		</Tabs.Content>
		<Tabs.Content value="yizy-doc">
			<YizyDocTab />
		</Tabs.Content>
		<Tabs.Content value="client-sdk">
			<YizyClientSdkTab />
		</Tabs.Content>
		<Tabs.Content value="models">
			<YizyModelsTab />
		</Tabs.Content>
	</Tabs.Root>
</div>
