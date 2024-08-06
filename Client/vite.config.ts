import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      /**
       * any request going through the vite server at localhost:3000/api will
       * be forwarded to the backend server at localhost 4000
       */
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
