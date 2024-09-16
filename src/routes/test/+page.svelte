<script lang="ts">
	//import { animalService } from '$lib/yizySpec/examples/animalServiceSpec';
	import { classifiiApi } from '$lib/yizySpec/examples/classifiiSpec';
	//import { classifiiApi } from '$lib/yizySpec/examples/classifiiSpec';
	import * as generator from '$lib/yizySpec/generators/php/modelGenerator';
	//import * as generator from '$lib/yizySpec/generators/php/sdkGenerator';
	//import { objectType, field } from '$lib/yizySpec/YIZYSpec';

	//console.log(
	//	generator.generateFunction('test', {
	//		name: 'testFunction',
	//		url: '/test',
	//		requestModel: objectType('TestReq', [field('name', 'string')]),
	//		responseModel: objectType('TestReq', [field('name', 'string')])
	//	})
	//);
	//console.log(generator.generateSdkFile('/baseUrl', animalService));
	console.log(generator.generateModelFile(classifiiApi));
</script>
