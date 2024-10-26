<script lang="ts">
	interface Props {
		rotate?: boolean;
	}

	let { rotate = false }: Props = $props();
</script>

<div class="flex w-full flex-col" style={rotate ? 'transform: rotate(180deg);' : ''}>
	<div
		style="
                z-index: 1;
                height: 2px;
                margin-top: -1px;
                margin-bottom: -1px;
                "
		class="bg-background"
	>
		&nbsp;
	</div>
	<svg
		class="bg-background"
		preserveAspectRatio="none"
		viewBox="0 0 1600 220"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M0 14L200.889 41L400 15L600.889 66L800 23L1000.89 19L1200 38L1400.89 26L1600 22V200H1400.89H1200H1000.89H800H600.889H400H200.889H0V14Z"
			class="fill-[#ffffff] dark:fill-[#171F30]"
		/>
		<path
			d="M0 14L200.889 41L400 15L600.889 66L800 23L1000.89 19L1200 38L1400.89 26L1600 22V200H1400.89H1200H1000.89H800H600.889H400H200.889H0V14Z"
			class="fill-[#e8f3f4] dark:fill-[#2a3a4d]"
		/>
		<path
			d="M0 90L200.889 95L400 101L600.889 96L800 56L1000.89 60L1200 88L1400.89 80L1600 103V200H1400.89H1200H1000.89H800H600.889H400H200.889H0V90Z"
			class="fill-[#d1e7ec] dark:fill-[#42596d]"
		/>

		<path
			d="M0 83L200.889 98L400 132L600.889 114L800 113L1000.89 119L1200 97L1400.89 131L1600 86V200H1400.89H1200H1000.89H800H600.889H400H200.889H0V83Z"
			fill="rgb(34.53% 47.777% 55.758%)"
			class="fill-[#b8d8e3] dark:fill-[#597a8f]"
		/>
		<path
			d="M0 114L200.889 140L400 151L600.889 114L800 135L1000.89 125L1200 150L1400.89 120L1600 151V200H1400.89H1200H1000.89H800H600.889H400H200.889H0V114Z"
			class="fill-[#a1cdd8] dark:fill-[#6e9daf]"
		/>
		<path
			d="M0 170L200.889 145L400 178L600.889 145L800 171L1000.89 169L1200 176L1400.89 155L1600 142V200H1400.89H1200H1000.89H800H600.889H400H200.889H0V170Z"
			class="fill-primary"
		/>
		<rect y="190" width="1600" height="40" class="fill-primary" />
	</svg>
	<div
		style="
                z-index: 1;
                height: 2px;
                margin-top: -1px;
                margin-bottom: -1px;
                "
		class="bg-primary"
	>
		&nbsp;
	</div>
</div>
