<script>
	import '../../app.css';
	import Sidebar from './components/Sidebar.svelte';
</script>

<div class="hidden h-screen w-[300px] bg-secondary lg:fixed lg:block">
	<Sidebar />
</div>
<div class="h-screen w-full">
	<div class="px-2 pt-20 lg:ml-[300px]">
		<slot></slot>
	</div>
</div>
