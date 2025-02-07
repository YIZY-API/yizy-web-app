<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';

	let { onUpdate }: { onUpdate: (key: string) => void } = $props();
	let inputValue = $state('');

	const handleUpdate = () => {
		onUpdate(inputValue);
	};
</script>

<Card class="w-full">
	<div class="p-6">
		<div class="space-y-2">
			<h3 class="text-2xl font-semibold">Enter Anthropic API Key</h3>
			<p class="text-sm text-gray-500 dark:text-gray-400">
				The key is stored locally in session storage and will be deleted if the browser or the tab
				is closed
			</p>
		</div>

		<div class="mt-6 space-y-4">
			<div>
				<Label for="api-key">Anthropic API Key</Label>
				<Input
					id="api-key"
					type="password"
					bind:value={inputValue}
					class="mt-1"
					placeholder="Enter your API key" />
			</div>
		</div>

		<div class="mt-6">
			<Button onclick={handleUpdate} class="w-full">Update API Key</Button>
		</div>
	</div>
</Card>
