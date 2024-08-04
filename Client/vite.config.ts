import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      /**
       * any request going through the vite server at localhost 3000 will
       * target the backend server at localhost 4000
       *
       * so any request to localhost:3000/api... will be proxied
       * to localhost:4000
       */
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
