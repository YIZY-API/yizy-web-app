import { type Readable, readonly, type Writable, writable } from "svelte/store";

export const _lspTypes: Writable<string[]> = writable<string[]>([]);
export const lspTypes: Readable<string[]> = readonly(_lspTypes);

export function updateLspTypes(types: string[]) {
  _lspTypes.update(() => {
    const res: string[] = [];
    types.forEach((t: string) => {
      res.push(t);
      res.push(t + "?");
      res.push(t + "[]");
    });
    return res;
  });
}
