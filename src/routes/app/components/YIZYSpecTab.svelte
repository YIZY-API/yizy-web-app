<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import ImportDialog from './ImportDialog.svelte';
	import YizyEditor from '$lib/components/ui/editor/YizyEditor.svelte';
	import { yizySpecToDoc } from '$lib/components/ui/editor/models/models';
	import { secretService } from '$lib/yizySpec/examples/secretService';
	import Button from '$lib/components/ui/button/button.svelte';
	import { importService } from '$lib/state';

	let dialog: ImportDialog;

	let editor: YizyEditor;

	function onResetClicked() {
		editor.reset();
	}

	function onSaveClicked() {
		console.log(editor.save());
		importService(JSON.stringify(editor.save()));
	}
</script>

<Card.Root>
	<div class="flex flex-row justify-between">
		<Card.Header class="w-full">
			<div class="flex w-full flex-row justify-between">
				<div>
					<Card.Title>YIZY API Spec</Card.Title>
					<Card.Description>Write API spec in the browser.</Card.Description>
				</div>
				<div>
					<Button
						onclick={() => onResetClicked()}
						variant="outline"
						class="border-destructive text-destructive hover:bg-destructive">Reset</Button>
					<Button
						onclick={() => {
							onSaveClicked();
						}}>Save</Button>
				</div>
			</div>
		</Card.Header>
	</div>
	<Card.Content class="space-y-2 p-0">
		<YizyEditor bind:this={editor} doc={yizySpecToDoc(secretService)} />
	</Card.Content>
</Card.Root>
<ImportDialog bind:this={dialog} />
