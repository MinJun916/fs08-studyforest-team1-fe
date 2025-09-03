import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(new URL("./src", import.meta.url).pathname),
      "@config": path.resolve(
        new URL("./src/config", import.meta.url).pathname
      ),
      "@components": path.resolve(
        new URL("./src/components", import.meta.url).pathname
      ),
      "@pages": path.resolve(new URL("./src/pages", import.meta.url).pathname),
    },
  },
});
