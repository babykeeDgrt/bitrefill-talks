import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  // remove during deployment
  server: {
    allowedHosts: ["petite-beans-take.loca.lt"],
  },
});
