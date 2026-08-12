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
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.emailjs.com https://va.vercel-scripts.com https://vercel.live https://www.instagram.com https://*.instagram.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://vercel.live; font-src 'self' https://fonts.gstatic.com https://vercel.live; connect-src 'self' https://api.emailjs.com https://smtp.emailjs.com https://vitals.vercel-insights.com https://vercel.live https://*.supabase.co https://github-contributions-api.jogruber.de https://api.groq.com; img-src 'self' data: blob: https://cdn.simpleicons.org https: https://vercel.live; frame-src 'self' https://vercel.live https://www.instagram.com https://*.instagram.com https://www.linkedin.com https://*.linkedin.com;",
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
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-supabase": ["@supabase/supabase-js"],
          "vendor-i18n": ["i18next", "react-i18next"],
          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-toast",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-slot",
          ],
          "vendor-charts": ["recharts"],
          "vendor-embla": ["embla-carousel-react"],
          "vendor-query": ["@tanstack/react-query"],
        },
      },
    },
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});