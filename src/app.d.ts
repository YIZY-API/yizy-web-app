// See https://kit.svelte.dev/docs/types#app
import type { SessionValidationResult } from "$lib/server/services/data/db/dbService";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      authState: SessionValidationResult | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export { };
