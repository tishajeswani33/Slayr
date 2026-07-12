import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile()],
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    watch: {
      ignored: ['**/android/**']
    }
  },
  optimizeDeps: {
    entries: ['index.html', 'src/**/*.{ts,tsx,js,jsx}'],
    exclude: ['@capacitor/android']
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
