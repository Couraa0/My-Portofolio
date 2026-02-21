import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    headers: {
      // Allow eval only in dev (HMR needs it); production won't use this header
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.emailjs.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.emailjs.com; img-src 'self' data: blob:;",
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "esbuild",
    sourcemap: false,   // Tidak pakai source map di production → tidak perlu eval
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});
