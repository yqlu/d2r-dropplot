import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: "src/setupTests.js",
    deps: {
      inline: ["javascript-color-gradient"],
    },
  },
});
