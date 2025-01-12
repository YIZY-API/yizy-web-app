<script>
	import Slack from '$lib/components/ui/icons/Slack.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { Mail } from 'lucide-svelte';
</script>

<div class="mx-auto h-full max-w-[400px] pb-8 pt-32">
	<div class="mt-20 flex h-full flex-col text-primary">
		<a
			class="mx-auto my-4 flex flex-row gap-2"
			href="https://join.slack.com/t/yizy/shared_invite/zt-2wl6jdf1z-aA9UKJ6w8MqpnEkHEVsoww">
			<div class="h-6">
				<Slack></Slack>
			</div>
			Join Us on Slack</a>
		<Separator />
		<a class="mx-auto my-4 flex flex-row gap-2" href="mailto:kelvin@yizy.dev">
			<div class="h-6">
				<Mail></Mail>
			</div>
			Send Me an Email</a>
	</div>
</div>
