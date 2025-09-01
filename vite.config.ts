import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"

export default defineConfig({
  plugins: [react()],
  base: "/job-portal-ui-Version1/", 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

