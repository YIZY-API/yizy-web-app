<script lang="ts">
	import { Marked, marked } from 'marked';
	import { markedHighlight } from 'marked-highlight';
	import hljs from 'highlight.js';

	// Define props using runes
	let { markdown = '' } = $props();

	// Use rune for reactive state
	let parsedHtml = $state('');

	// Marked setup with highlight.js
	const renderer = new marked.Renderer();
	renderer.code = ({ text, lang, escaped }) => {
		return `
<div class="relative">
  <button
    onclick="onCopyClicked(event)"
	class="absolute right-6 top-6 z-20 border-none text-primary">
	  <div class="flex flex-row">
	    <svg
		  xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-8 w-8 pr-2"
          ><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path
					d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
		  <span class="my-auto">Copy</span>
	  </div>
  </button>
  <pre>
      <code class="language-${lang || 'plaintext'}">
        ${'\n' + text.trim()}
      </code>
  </pre>
</div>`;
	};
	const m = new Marked(
		markedHighlight({
			emptyLangClass: 'hljs',
			langPrefix: 'hljs language-',
			highlight: function (code, lang) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			}
		})
	);

	// Reactive effect for parsing markdown
	$effect(() => {
		parsedHtml = m.parse(markdown, {
			renderer: renderer
		}) as string;
	});
</script>

<svelte:head>
	<script>
		function onCopyClicked(event) {
			const btn = event.currentTarget;
			const codeBlock = btn.nextElementSibling;
			const span = btn.childNodes[1].childNodes[3];
			console.log(span);
			const code = codeBlock.textContent || '';
			console.log(code);

			navigator.clipboard
				.writeText(code)
				.then(() => {
					span.textContent = 'Copied!';
					setTimeout(() => {
						span.textContent = 'Copy';
					}, 1000);
				})
				.catch((err) => {
					console.error('Failed to copy:', err);
				});
		}
	</script>
</svelte:head>

<div class="markdown-content">
	{@html parsedHtml}
</div>
