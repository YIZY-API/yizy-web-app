<script lang="ts">
	import type { Tokens } from 'marked';
	import Slugger from 'github-slugger';
	//import { Lexer, type TokensList } from 'marked';

	type MarkdownOptions = {
		/**
		 * The base path to your application.
		 * This is required when the application does not run in root context to generate the links properly.
		 */
		baseUrl: `/${string}`;

		/**
		 * The slugger used to generate header IDs in marked.
		 *
		 * It is discouraged to set this option, because the slugger needs to be re-created when the source is changed.
		 */
		slugger: Slugger;
	};
	type RendererType = string;
	type Renderers = Record<RendererType, ConstructorOfATypedSvelteComponent>;
	let {
		token,
		options,
		renderers
	}: { token: Tokens.Image; options: MarkdownOptions; renderers: Renderers } = $props();
</script>

<img src={token.href} title={token.title} alt={token.text} class="custom-image" />

<style>
	.custom-image {
		max-width: 50%;
	}
</style>
