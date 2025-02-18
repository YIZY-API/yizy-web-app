<script>
	import Markdown from '../../../../(app)/app/components/Markdown.svelte';
	import content from './content.md?raw';
</script>

<svelte:head>
	<title>Quick Start</title>
</svelte:head>

<Markdown markdown={content} />
