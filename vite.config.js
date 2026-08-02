import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5173,
    // strictPort : échoue plutôt que de basculer sur un autre port — garantit
    // qu'on reste bien sur le 5173 que tu as ouvert sur ta box.
    strictPort: true,
    // 0.0.0.0 : écoute sur toutes les interfaces réseau (LAN + accès externe
    // via redirection de port), pas seulement localhost.
    host: "0.0.0.0",
    // allowedHosts: true : autorise n'importe quel Host (IP publique, DDNS...).
    // Sans ça, Vite bloque les requêtes venant de l'extérieur (protection
    // anti DNS-rebinding).
    // ⚠️ À n'utiliser que temporairement pour tester : un serveur de DEV
    //    exposé sur internet n'a aucune authentification. Referme tes ports
    //    quand tu as fini, et préfère `npm run build` + `npm run preview`
    //    (ou un tunnel type cloudflared/ngrok) pour une démo publique durable.
    allowedHosts: true,
    proxy: {
      '/api-proxy': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-proxy/, ''),
      },
    },
  },
});
