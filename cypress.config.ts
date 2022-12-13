import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://ihdk-movie-database.netlify.app/",
    env: {
      appNameText: "Movie Database",
    }
  },
});
