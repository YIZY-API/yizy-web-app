<script lang="ts">
	import { page } from '$app/state';
	const sections = [
		{
			heading: 'Introduction',
			docs: [
				{
					name: 'A Message From The Author',
					href: '/doc/introduction/message-from-author'
				},
				{
					name: 'What Makes It Yizy?',
					href: '/doc/introduction/what-makes-it-yizy'
				},
				{
					name: 'Quick Start',
					href: '/doc/introduction/quick-start'
				}
			]
		}
	];
</script>

<div class="mt-20 h-full overflow-y-auto border-r pb-20">
	<ul class="p-4">
		{#each sections as sec}
			<h1 class="font-bold">{sec.heading}</h1>
			<div class="ml-2">
				{#each sec.docs as doc}
					{#if page.url.pathname.includes(doc.href)}
						<a href={doc.href}><li class="text-primary hover:text-primary">{doc.name}</li></a>
					{:else}
						<a href={doc.href}><li class="hover:text-primary">{doc.name}</li></a>
					{/if}
				{/each}
			</div>
		{/each}
	</ul>
</div>
