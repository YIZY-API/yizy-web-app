<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Card } from '$lib/components/ui/card';
	import { ChevronRightIcon, SendIcon } from 'lucide-svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import Anthropic from '@anthropic-ai/sdk';
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';

	const helloWorldGoGuide: string = `Here's how to write a Hello World program in Go (Golang): 
1. First, create a new file with a \`.go\` extension, for example \`hello.go\`
2. Here's the basic Hello World program:
\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
\`\`\`

Let's break down what each part does:

- \`package main\`: This declares that this is the main package. Every Go program must have a \`main\` package.
- \`import "fmt"\`: This imports the format package, which contains functions for formatted I/O.
- \`func main()\`: This is the entry point of the program.
- \`fmt.Println()\`: This is a function that prints text to the console and adds a new line.

3. To run the program, you have two options:

Option 1 - Direct run:
\`\`\`bash
go run hello.go
\`\`\`

Option 2 - Build and then run:
\`\`\`bash
go build hello.go
./hello  # On Unix/Linux/Mac
hello.exe  # On Windows
\`\`\`

The output will be:
\`\`\`
Hello, World!
\`\`\`

That's it! This is the simplest Go program you can write. As you learn more about Go, you can expand on this basic structure to create more complex applications.`;
	let messages: Array<{ role: 'user' | 'assistant'; content: string }> = $state([
		//{
		//	role: 'assistant',
		//	content: helloWorldGoGuide
		//}
	]);
	let messageInput = $state('');
	let isLoading = $state(false);

	let chatBottom: HTMLDivElement;

	const anthropic = new Anthropic({
		apiKey: '', // Be sure to use environment variables in production
		dangerouslyAllowBrowser: true
	});

	function renderMd(content: string): string {
		console.log(content);
		const html = marked.parse(content, {
			async: false
		});
		const safeHtml: string = DOMPurify.sanitize(html);
		return safeHtml;
	}

	async function handleSubmit() {
		if (messageInput.trim()) {
			messages = [...messages, { role: 'user', content: messageInput.trim() }];
			messageInput = '';

			//placeholder
			messages = [...messages, { role: 'assistant', content: '' }];

			isLoading = true;
			scrollToBottom();

			try {
				let assistantResponse = '';
				const stream = anthropic.messages
					.stream({
						model: 'claude-3-5-sonnet-latest',
						max_tokens: 1024,
						messages: messages.slice(0, -1).map((msg) => ({
							role: msg.role,
							content: msg.content
						}))
					})
					.on('text', (text) => {
						assistantResponse += text;
						messages = [
							...messages.slice(0, -1),
							{ role: 'assistant', content: assistantResponse }
						];
						scrollToBottom();
					});

				const finalMsg: Anthropic.Message = await stream.finalMessage();
				isLoading = false;
			} catch (error) {
				console.error('Error calling Claude:', error);
				// Update the last message to show the error
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
		{#each messages as message}
			{#if message.role === 'user'}
				<Card class="mx-4 my-4 flex flex-row border-none bg-secondary p-4 text-foreground">
					<ChevronRightIcon class="text-primary" />
					<p class="whitespace-pre-wrap selection:bg-primary">{message.content}</p>
				</Card>
			{:else if isLoading}
				<Card class="mx-4 my-4 border-none bg-transparent px-4 text-foreground">
					<div>
						{message.content}
					</div>
				</Card>
			{:else}
				<Card class="mx-4 my-4 border-none bg-transparent px-4 text-foreground">
					<div
						class="prose prose-slate !max-w-none dark:prose-invert selection:bg-primary prose-a:text-primary
                    ">
						{@html renderMd(message.content)}
						<!--{message.content}-->
					</div>
				</Card>
			{/if}
		{/each}
		<div bind:this={chatBottom} class="mx-8 flex flex-col space-y-2">
			{#if isLoading}
				<div class="flex items-center justify-start space-x-1">
					<div class="h-2 w-2 animate-bounce rounded-full bg-primary" style="animation-delay: 0s;">
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
	</ScrollArea>

	<!-- Input container (20% height) -->
	<div class="flex h-[20%] flex-row p-4">
		<Textarea
			bind:value={messageInput}
			placeholder="Type your message..."
			class="flex-1 resize-none"
			onkeydown={handleKeyDown} />
		<Button
			class="ml-2 h-10 w-10 self-center p-0"
			aria-label="Send message"
			onclick={() => {
				handleSubmit();
			}}>
			<SendIcon class="h-5 w-5" />
		</Button>
	</div>
</div>
