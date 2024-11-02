<script lang="ts" module>
	export interface FieldValue {
		name: string;
		type: string;
	}
	export interface EndpointProps {
		name: string;
		url: string;
		doc: string;
		reqName: string;
		reqFields: FieldValue[];
		resName: string;
		resFields: FieldValue[];
	}
</script>

<script lang="ts">
	import FieldList from './FieldList.svelte';

	let {
		props = $bindable({
			name: '',
			url: '',
			doc: '',
			reqName: '',
			reqFields: [],
			resName: '',
			resFields: []
		})
	}: { props: EndpointProps } = $props();
</script>

<input
	placeholder="endpointName"
	class="w-full border-none border-transparent bg-transparent text-xl font-bold outline-none placeholder:text-muted active:border-none" />

<input
	placeholder="/route/endpointName"
	class="text-md w-full border-none border-transparent bg-transparent font-bold outline-none placeholder:text-muted active:border-none" />

<textarea
	class="w-full bg-transparent outline-none placeholder:text-muted"
	placeholder="This is an example of an endpoint documentation"></textarea>

<div class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground">
	Request
</div>
<input
	placeholder="NameOfRequest"
	class="text-md w-full border-none border-transparent bg-transparent font-bold outline-none placeholder:text-muted active:border-none" />

<FieldList />

<div class="my-2 w-fit rounded-r-full bg-primary px-2 text-xs font-bold text-primary-foreground">
	Response
</div>
<input
	placeholder="NameOfResponse"
	class="text-md w-full border-none border-transparent bg-transparent font-bold outline-none placeholder:text-muted active:border-none" />

<FieldList />

<style>
	textarea {
		field-sizing: content;
		resize: none;
	}
</style>
