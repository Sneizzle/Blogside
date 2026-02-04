import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * GitHub Pages base path:
 *   https://<user>.github.io/Blogside/  -> base: "/Blogside/"
 * If you rename the repo, change this value.
 */
export default defineConfig({
  base: "/Blogside/",
  plugins: [react()],
  build: {
    sourcemap: true,
    target: "es2019",
  },
});
