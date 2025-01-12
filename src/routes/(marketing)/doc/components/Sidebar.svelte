<script lang="ts">
	import { page } from '$app/stores';
	const docs = [
		{
			name: 'Introduction',
			href: '/doc/introduction'
		},
		{
			name: 'Getting Started',
			href: '/doc/getting-started'
		}
	];
</script>

<div class="mt-20 h-full overflow-y-auto bg-muted pb-20">
	<ul class="p-4">
		{#each docs as doc}
			{#if $page.url.pathname.includes(doc.href)}
				<a href={doc.href}><li class="text-primary hover:text-primary">{doc.name}</li></a>
			{:else}
				<a href={doc.href}><li class="hover:text-primary">{doc.name}</li></a>
			{/if}
		{/each}
	</ul>
</div>
