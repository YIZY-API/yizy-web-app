<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	let search: string = $state('');
</script>

<input
	placeholder="endpointName"
	class="w-full border-none border-transparent bg-transparent text-xl font-bold outline-none placeholder:text-muted active:border-none"
/>

<input
	placeholder="/route/endpointName"
	class="text-md w-full border-none border-transparent bg-transparent font-bold outline-none placeholder:text-muted active:border-none"
/>

<textarea
	class="w-full bg-transparent outline-none placeholder:text-muted"
	placeholder="This is an example of an endpoint documentation"
></textarea>

<div class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground">
	Request
</div>
<input
	placeholder="NameOfRequest"
	class="text-md w-full border-none border-transparent bg-transparent font-bold outline-none placeholder:text-muted active:border-none"
/>

<div class="flex w-full flex-row">
	<input
		placeholder="field"
		class="text-md w-full flex-grow border-none border-transparent bg-transparent outline-none placeholder:text-muted active:border-none"
	/>
	<Command.Root class="border-none bg-transparent">
		<Command.Input
			bind:value={search}
			placeholder="type"
			class="text-md w-full flex-grow border-none border-transparent bg-transparent text-primary outline-none placeholder:text-muted active:border-none"
		/>
		{#if search !== ''}
			<Command.List class="absolute z-10 my-10 rounded-b-lg bg-muted">
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group heading="Primitive Types">
					<Command.Item>int</Command.Item>
					<Command.Item>string</Command.Item>
					<Command.Item>boolean</Command.Item>
				</Command.Group>
				<Command.Separator />
				<Command.Group heading="Additional Types">
					<Command.Item>UserDefinedModel1</Command.Item>
					<Command.Item>UserDefinedModel2</Command.Item>
					<Command.Item>UserDefinedModel3</Command.Item>
				</Command.Group>
			</Command.List>
		{/if}
	</Command.Root>
</div>
<div class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground">
	Response
</div>
<input
	placeholder="NameOfResponse"
	class="text-md w-full border-none border-transparent bg-transparent font-bold outline-none placeholder:text-muted active:border-none"
/>

<div class="flex w-full flex-row">
	<input
		placeholder="field"
		class="text-md w-full flex-grow border-none border-transparent bg-transparent outline-none placeholder:text-muted active:border-none"
	/>
	<input
		placeholder="type"
		class="text-md w-full flex-grow border-none border-transparent bg-transparent text-primary outline-none placeholder:text-muted active:border-none"
	/>
</div>

<div class="flex w-full flex-row">
	<input
		placeholder="field"
		class="text-md w-full flex-grow border-none border-transparent bg-transparent outline-none placeholder:text-muted active:border-none"
	/>
	<input
		placeholder="type"
		class="text-md w-full flex-grow border-none border-transparent bg-transparent text-primary outline-none placeholder:text-muted active:border-none"
	/>
</div>

<style>
	textarea {
		field-sizing: content;
		resize: none;
	}
</style>
