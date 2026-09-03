import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("jspdf") || id.includes("html2canvas")) {
              return "vendor-pdf";
            }
            if (id.includes("recharts") || id.includes("react-circular-progressbar")) {
              return "vendor-charts";
            }
            if (id.includes("firebase")) {
              return "vendor-firebase";
            }
            if (id.includes("react-router-dom") || id.includes("@reduxjs/toolkit") || id.includes("react-redux")) {
              return "vendor-app-core";
            }
            if (id.includes("motion") || id.includes("animejs") || id.includes("gsap") || id.includes("lenis")) {
              return "vendor-animations";
            }
            if (id.includes("react-icons")) {
              return "vendor-icons";
            }
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-is") || id.includes("scheduler")) {
              return "vendor-react";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
