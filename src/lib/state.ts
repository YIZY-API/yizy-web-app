import { animalService } from '$lib/yizySpec/examples/animalServiceSpec';
import { type Service } from '$lib/yizySpec/YIZYSpec';
import { derived, readonly, writable } from 'svelte/store';
import YAML from 'yaml';

const _service = writable<Service>(animalService);
export const currentService = readonly(_service);

export const serviceInJson = derived(currentService, ($currentService) => {
	return JSON.stringify($currentService, null, 4);
});

export const serviceInYaml = derived(currentService, ($currentService) => {
	return YAML.stringify($currentService, {
		indent: 4
	});
});

//UI Level Functions
export function importService(jsonString: string) {
	const service: Service = JSON.parse(jsonString);
	updateService(service);
}

//State Level Functions
function updateService(newService: Service) {
	_service.update(() => {
		return newService;
	});
}
