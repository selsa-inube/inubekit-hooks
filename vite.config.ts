import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@hooks": resolve(__dirname, "src/hooks"),
    },
  },
  plugins: [react(), dts({ rollupTypes: true })],
});
