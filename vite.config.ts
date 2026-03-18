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
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.emailjs.com https://va.vercel-scripts.com https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://vercel.live; font-src 'self' https://fonts.gstatic.com https://vercel.live; connect-src 'self' https://api.emailjs.com https://smtp.emailjs.com https://vitals.vercel-insights.com https://vercel.live https://*.supabase.co; img-src 'self' data: blob: https://cdn.simpleicons.org https: https://vercel.live; frame-src https://vercel.live;",
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
    sourcemap: false,
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});