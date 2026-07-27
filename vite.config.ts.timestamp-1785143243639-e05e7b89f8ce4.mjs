// vite.config.ts
import { defineConfig } from "file:///C:/Users/Rakha/OneDrive/Documents/Web%20Portofolio/My-Portofolio/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Rakha/OneDrive/Documents/Web%20Portofolio/My-Portofolio/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\Rakha\\OneDrive\\Documents\\Web Portofolio\\My-Portofolio";
var vite_config_default = defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false
    },
    headers: {
      "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.emailjs.com https://va.vercel-scripts.com https://vercel.live https://www.instagram.com https://*.instagram.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://vercel.live; font-src 'self' https://fonts.gstatic.com https://vercel.live; connect-src 'self' https://api.emailjs.com https://smtp.emailjs.com https://vitals.vercel-insights.com https://vercel.live https://*.supabase.co https://github-contributions-api.jogruber.de https://api.groq.com; img-src 'self' data: blob: https://cdn.simpleicons.org https: https://vercel.live; frame-src 'self' https://vercel.live https://www.instagram.com https://*.instagram.com https://www.linkedin.com https://*.linkedin.com;"
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    minify: "esbuild",
    sourcemap: false
  },
  esbuild: {
    drop: ["console", "debugger"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxSYWtoYVxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcV2ViIFBvcnRvZm9saW9cXFxcTXktUG9ydG9mb2xpb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcUmFraGFcXFxcT25lRHJpdmVcXFxcRG9jdW1lbnRzXFxcXFdlYiBQb3J0b2ZvbGlvXFxcXE15LVBvcnRvZm9saW9cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1Jha2hhL09uZURyaXZlL0RvY3VtZW50cy9XZWIlMjBQb3J0b2ZvbGlvL015LVBvcnRvZm9saW8vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6IFwiOjpcIixcclxuICAgIHBvcnQ6IDgwODAsXHJcbiAgICBobXI6IHtcclxuICAgICAgb3ZlcmxheTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICBcIkNvbnRlbnQtU2VjdXJpdHktUG9saWN5XCI6XHJcbiAgICAgICAgXCJkZWZhdWx0LXNyYyAnc2VsZic7IHNjcmlwdC1zcmMgJ3NlbGYnICd1bnNhZmUtaW5saW5lJyAndW5zYWZlLWV2YWwnIGh0dHBzOi8vYXBpLmVtYWlsanMuY29tIGh0dHBzOi8vdmEudmVyY2VsLXNjcmlwdHMuY29tIGh0dHBzOi8vdmVyY2VsLmxpdmUgaHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbSBodHRwczovLyouaW5zdGFncmFtLmNvbTsgc3R5bGUtc3JjICdzZWxmJyAndW5zYWZlLWlubGluZScgaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbSBodHRwczovL3ZlcmNlbC5saXZlOyBmb250LXNyYyAnc2VsZicgaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbSBodHRwczovL3ZlcmNlbC5saXZlOyBjb25uZWN0LXNyYyAnc2VsZicgaHR0cHM6Ly9hcGkuZW1haWxqcy5jb20gaHR0cHM6Ly9zbXRwLmVtYWlsanMuY29tIGh0dHBzOi8vdml0YWxzLnZlcmNlbC1pbnNpZ2h0cy5jb20gaHR0cHM6Ly92ZXJjZWwubGl2ZSBodHRwczovLyouc3VwYWJhc2UuY28gaHR0cHM6Ly9naXRodWItY29udHJpYnV0aW9ucy1hcGkuam9ncnViZXIuZGUgaHR0cHM6Ly9hcGkuZ3JvcS5jb207IGltZy1zcmMgJ3NlbGYnIGRhdGE6IGJsb2I6IGh0dHBzOi8vY2RuLnNpbXBsZWljb25zLm9yZyBodHRwczogaHR0cHM6Ly92ZXJjZWwubGl2ZTsgZnJhbWUtc3JjICdzZWxmJyBodHRwczovL3ZlcmNlbC5saXZlIGh0dHBzOi8vd3d3Lmluc3RhZ3JhbS5jb20gaHR0cHM6Ly8qLmluc3RhZ3JhbS5jb20gaHR0cHM6Ly93d3cubGlua2VkaW4uY29tIGh0dHBzOi8vKi5saW5rZWRpbi5jb207XCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBtaW5pZnk6IFwiZXNidWlsZFwiLFxyXG4gICAgc291cmNlbWFwOiBmYWxzZSxcclxuICB9LFxyXG4gIGVzYnVpbGQ6IHtcclxuICAgIGRyb3A6IFtcImNvbnNvbGVcIiwgXCJkZWJ1Z2dlclwiXSxcclxuICB9LFxyXG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQTRYLFNBQVMsb0JBQW9CO0FBQ3paLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFGakIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLElBQ1g7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLDJCQUNFO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTSxDQUFDLFdBQVcsVUFBVTtBQUFBLEVBQzlCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
