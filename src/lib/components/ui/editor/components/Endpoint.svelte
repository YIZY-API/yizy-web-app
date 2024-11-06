<script lang="ts">
	import FieldList from './FieldList.svelte';
	import { type Endpoint as EndpointProps } from '../models/models';

	let {
		props = $bindable({
			name: '',
			description: '',
			url: '',
			doc: '',
			req: {
				name: '',
				fields: [
					{
						name: '',
						type: ''
					}
				]
			},
			res: {
				name: '',
				fields: [
					{
						name: '',
						type: ''
					}
				]
			}
		})
	}: { props: EndpointProps } = $props();
</script>

<div class="w-full pb-4">
	<input
		placeholder="endpointName"
		class="w-full border-none border-transparent bg-transparent text-xl font-bold outline-none placeholder:text-muted active:border-none"
		bind:value={props.name} />

	<input
		placeholder="/route/endpointName"
		class="w-full border-none border-transparent bg-transparent font-light text-primary outline-none placeholder:text-muted active:border-none"
		bind:value={props.url} />

	<textarea
		class="w-full bg-transparent outline-none placeholder:text-muted"
		placeholder="This is an example of an endpoint documentation"
		bind:value={props.description}></textarea>

	<div class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground">
		Request
	</div>
	<input
		placeholder="NameOfRequest"
		class="w-full border-none border-transparent bg-transparent font-light text-accent outline-none placeholder:text-muted active:border-none"
		bind:value={props.req.name} />

	<FieldList bind:props={props.req.fields} />

	<div class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground">
		Response
	</div>
	<input
		placeholder="NameOfResponse"
		class="w-full border-none border-transparent bg-transparent font-light text-accent outline-none placeholder:text-muted active:border-none"
		bind:value={props.res.name} />

	<FieldList bind:props={props.res.fields} />
</div>

<style>
	textarea {
		field-sizing: content;
		resize: none;
		word-break: break-all;
	}
</style>
