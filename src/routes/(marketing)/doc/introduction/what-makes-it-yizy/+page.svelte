<script>
	import content from './content.md?raw';

	import Markdown from '../../../../(app)/app/components/Markdown.svelte';
</script>

<svelte:head>
	<title>What Makes It Yizy?</title>
</svelte:head>

<Markdown markdown={content} />
