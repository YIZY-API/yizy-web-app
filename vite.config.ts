import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    allowedHosts: ["7d90-156-34-178-107.ngrok-free.app"],
  },
});
