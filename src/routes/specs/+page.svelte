<script lang="ts">
	import Sidebar from './components/Sidebar.svelte';
	import YizyEditor from '$lib/components/ui/editor/YizyEditor.svelte';
	import { yizySpecToDoc } from '$lib/components/ui/editor/models/models';
	import { secretService } from '$lib/yizySpec/examples/secretService';
	import { Button } from '$lib/components/ui/button';

	let editor: ReturnType<typeof YizyEditor>;
</script>

<svelte:head>
	<title>Specs</title>
</svelte:head>

<div class="flex h-full w-full flex-row pt-20">
	<Sidebar />
	<div class="flex-grow overflow-y-scroll">
		<Button class="float-end mr-4 mt-4">save</Button>
		<YizyEditor bind:this={editor} doc={yizySpecToDoc(secretService)} />
	</div>
</div>
