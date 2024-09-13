<script lang="ts">
	import { classifiiApi } from '$lib/yizySpec/examples/classifiiSpec';
	import * as generator from '$lib/yizySpec/generators/php/modelGenerator';

	console.log(generator.generateModelFile(classifiiApi));
</script>
