import { secretService } from "$lib/yizySpec/examples/secretService";
import { derived, readonly, writable } from "svelte/store";
import YAML from "yaml";
import { type Service } from "@yizy/spec";

//const _service = writable<Service>(classifiiApi);
const _service = writable<Service>(secretService);
export const currentService = readonly(_service);

export const serviceInJson = derived(currentService, ($currentService) => {
  return JSON.stringify($currentService, null, 4);
});

export const serviceInYaml = derived(currentService, ($currentService) => {
  return YAML.stringify($currentService, {
    indent: 4,
  });
});

//UI Level Functions
export function importService(jsonString: string) {
  // TODO validate json here
  const service: Service = JSON.parse(jsonString);
  updateService(service);
}

//State Level Functions
function updateService(newService: Service) {
  _service.update(() => {
    return newService;
  });
}

const _isUserLoggedIn = writable<boolean>(false);
export const isUserLoggedIn = readonly(_isUserLoggedIn);

export function onLogIn(){
  _isUserLoggedIn.set(true);
  window.location.href = "/specs";
}

export function onLogOut(){
  _isUserLoggedIn.set(false);
}
