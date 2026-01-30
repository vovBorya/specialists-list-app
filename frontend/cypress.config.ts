import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.VITE_APP_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});