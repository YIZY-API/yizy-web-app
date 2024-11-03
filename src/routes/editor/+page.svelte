<script lang="ts">
	import EndpointList from './components/EndpointList.svelte';
	import EnvironmentList from './components/EnvironmentList.svelte';
	import FieldList from './components/FieldList.svelte';
</script>

<div class="w-full pb-48 pt-24">
	<div class="mx-auto grid w-full grid-cols-1 p-2 md:max-w-4xl md:grid-cols-3">
		<div class="col-span-1 md:col-span-2">
			<div class="my-2 border-muted">
				<div class="text-sm font-bold text-primary">Service</div>
				<input
					placeholder="ServiceName"
					class="w-full border-none border-transparent bg-transparent text-2xl font-bold outline-none placeholder:text-muted active:border-none" />

				<textarea
					class="w-full resize-none bg-transparent outline-none placeholder:text-muted"
					placeholder="This is an example of a service documentation"></textarea>
				<EnvironmentList />
			</div>
			<div class="my-2 w-full rounded-lg">
				<div class="text-sm font-bold text-primary">Endpoints</div>
				<EndpointList />
			</div>
		</div>
		<div class="col-span-1">
			<div class="my-0 rounded-lg md:my-2">
				<div class="text-sm font-bold text-primary">Additional Models</div>

				<input
					placeholder="ModelName"
					class="text-md w-full border-none border-transparent bg-transparent font-bold outline-none placeholder:text-muted active:border-none" />

				<div class="flex w-full flex-row">
					<FieldList />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	textarea {
		field-sizing: content;
		resize: none;
	}
</style>
