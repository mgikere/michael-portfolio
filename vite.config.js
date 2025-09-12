import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.md"],

  resolve: {
    alias: {
      "@": "/src", // optional alias
    },
  },

  build: {
    outDir: "dist", // where Netlify will serve from
    sourcemap: true, // helps you debug blank screens
  },

  base: "/", // 👈 ensures assets load correctly on Netlify
});
