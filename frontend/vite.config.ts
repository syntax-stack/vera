import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "silence-chrome-devtools-error",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.includes(".well-known/appspecific/com.chrome.devtools.json")) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({}));
            return;
          }
          next();
        });
      },
    },
    tailwindcss(),
    reactRouter()
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
