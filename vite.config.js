import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { templateCompilerOptions } from "@tresjs/core";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      ...templateCompilerOptions,
    }),
    tailwindcss(),
  ],
  resolve: {
    dedupe: ["three"],
    alias: {
      three: "three",
    },
  },
  optimizeDeps: {
    include: ["three", "@tresjs/core", "@tresjs/cientos"],
    esbuildOptions: {
      alias: {
        three: "three",
      },
    },
  },
});
