import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/", //"https://ihdk-movie-database.netlify.app/",
    env: {
      appNameText: "Movie Database",
    }
  },
});
