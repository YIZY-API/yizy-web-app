<script lang="ts">
	import Highlight from 'svelte-highlight';
	import { type LanguageType } from 'svelte-highlight/languages';
	import { cn } from '$lib/utils.js';

	export let language: LanguageType<string>;
	export let code: any;

	let className: string = '';
	export { className as class };

	let copyBtnText = 'Copy';
	function onCopyBtnClicked() {
		copyBtnText = 'Copied!';
		setTimeout(() => {
			copyBtnText = 'Copy';
		}, 1000);
		navigator.clipboard.writeText(code);
	}
</script>

<div class={cn('not-prose whitespace-pre-wrap rounded-lg bg-[#0d121c]', className)}>
	<button
		class="sticky right-6 top-6 z-10 float-right border-none pr-2 pt-2 text-primary"
		on:click={() => onCopyBtnClicked()}
	>
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
					d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
				/></svg
			>
			<span class="my-auto">{copyBtnText}</span>
		</div>
	</button>
	<Highlight {language} {code} />
</div>
