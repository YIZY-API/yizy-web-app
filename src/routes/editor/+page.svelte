<script lang="ts">
	import Endpoint from './components/Endpoint.svelte';
	import InputList from './components/InputList.svelte';
</script>

<div class="w-full pb-8 pt-24">
	<div class="mx-auto grid w-full grid-cols-1 p-2 md:max-w-4xl md:grid-cols-3">
		<div class="col-span-1 md:col-span-2">
			<div class="my-2 border-muted">
				<div class="text-sm font-bold text-primary">Service</div>
				<input
					placeholder="ServiceName"
					class="w-full border-none border-transparent bg-transparent text-2xl font-bold outline-none placeholder:text-muted active:border-none"
				/>

				<div
					class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground"
				>
					Doc
				</div>
				<textarea
					class="w-full bg-transparent outline-none placeholder:text-muted"
					placeholder="This is an example of an service documentation"
				></textarea>
				<InputList />
			</div>
			<div class="my-2 w-full rounded-lg">
				<div class="text-sm font-bold text-primary">Endpoints</div>
				<Endpoint />
			</div>
		</div>
		<div class="col-span-1">
			<div class="my-0 rounded-lg md:my-2">
				<div class="text-sm font-bold text-primary">Additional Models</div>

				<input
					placeholder="ModelName"
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
