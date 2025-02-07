<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Card } from '$lib/components/ui/card';
	import { ChevronRightIcon, SendIcon } from 'lucide-svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import Anthropic from '@anthropic-ai/sdk';
	import Markdown from './Markdown.svelte';
	import ApiKeyPrompt from './ApiKeyPrompt.svelte';
	import { buildSystemPrompt } from '../utils/llmUtil';
	import * as yizySpec from '@yizy/spec';
	//import { helloWorldGoGuide } from './constant';
	let { service }: { service: yizySpec.Service } = $props();

	let anthropicKey = $state('');
	let messages: Array<{ role: 'user' | 'assistant'; content: string }> = $state([
		//{
		//	role: 'assistant',
		//	content: helloWorldGoGuide
		//}
		//{
		//	role: 'user',
		//	content: 'hello world'
		//}
	]);
	let messageInput = $state('');
	let isLoading = $state(false);

	let chatBottom: HTMLDivElement | null = $state(null);

	const anthropic = new Anthropic({
		dangerouslyAllowBrowser: true
	});

	async function handleSubmit() {
		if (messageInput.trim()) {
			messages = [...messages, { role: 'user', content: messageInput.trim() }];
			messageInput = '';

			messages = [...messages, { role: 'assistant', content: '' }];

			isLoading = true;
			scrollToBottom();

			try {
				let assistantResponse = '';
				anthropic.apiKey = sessionStorage.getItem('anthropic-api-key');

				const stream = anthropic.messages
					.stream({
						model: 'claude-3-5-sonnet-latest',
						max_tokens: 1024,
						messages: messages.slice(0, -1).map((msg) => ({
							role: msg.role,
							content: msg.content
						})),
						system: buildSystemPrompt(JSON.stringify(service))
					})
					.on('text', (text) => {
						assistantResponse += text;
						messages = [
							...messages.slice(0, -1),
							{ role: 'assistant', content: assistantResponse }
						];
						scrollToBottom();
					});

				await stream.finalMessage();
				isLoading = false;
			} catch (error) {
				console.error('Error calling Claude:', error);
				messages = [
					...messages.slice(0, -1),
					{
						role: 'assistant',
						content: 'I apologize, but I encountered an error processing your request.'
					}
				];
			} finally {
				isLoading = false;
				scrollToBottom();
			}
		}
	}

	function scrollToBottom() {
		setTimeout(() => {
			if (chatBottom) {
				chatBottom.scrollIntoView({ behavior: 'smooth' });
			}
		}, 0);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSubmit();
		}
	}
</script>

<div class="flex h-full flex-col">
	<ScrollArea class="flex-grow ">
		{#if anthropicKey === ''}
			<ApiKeyPrompt
				onUpdate={(key: string) => {
					anthropicKey = key;
					sessionStorage.setItem('anthropic-api-key', anthropicKey);
				}} />
		{:else}
			{#each messages as message}
				{#if message.role === 'user'}
					<Card class="mx-4 my-4 flex flex-row border-none bg-secondary p-4 text-foreground">
						<ChevronRightIcon class="mr-2 text-primary" />
						<p class="whitespace-pre-wrap font-semibold selection:bg-primary">{message.content}</p>
					</Card>
				{:else}
					<Card class="mx-4 my-4 border-none bg-transparent px-4 text-foreground">
						<div
							class="prose prose-slate !max-w-none dark:prose-invert selection:bg-primary prose-a:text-primary
                    ">
							<Markdown markdown={message.content} />
						</div>
					</Card>
				{/if}
			{/each}
			<div bind:this={chatBottom} class="mx-8 flex flex-col space-y-2">
				{#if isLoading}
					<div class="flex items-center justify-start space-x-1">
						<div
							class="h-2 w-2 animate-bounce rounded-full bg-primary"
							style="animation-delay: 0s;">
						</div>
						<div
							class="h-2 w-2 animate-bounce rounded-full bg-primary"
							style="animation-delay: 0.2s;">
						</div>
						<div
							class="h-2 w-2 animate-bounce rounded-full bg-primary"
							style="animation-delay: 0.4s;">
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</ScrollArea>

	<!-- Input container (20% height) -->
	<div class="flex h-[20%] flex-row p-4">
		<Textarea
			disabled={anthropicKey === ''}
			bind:value={messageInput}
			placeholder="Type your message..."
			class="flex-1 resize-none"
			onkeydown={handleKeyDown} />
		<Button
			disabled={anthropicKey === ''}
			class="ml-2 h-10 w-10 self-center p-0"
			aria-label="Send message"
			onclick={() => {
				handleSubmit();
			}}>
			<SendIcon class="h-5 w-5" />
		</Button>
	</div>
</div>
