// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://nafuudelivery.com",
  // Pages are emitted as /about/index.html and linked without a trailing slash;
  // Vercel serves both forms (see vercel.json "trailingSlash": false).
  trailingSlash: "never",
  build: { format: "directory" },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap(),
    // Only the Font Awesome icons used on the site are bundled; each is inlined as SVG.
    icon({
      iconDir: "src/assets/icons",
      include: {
        "fa6-solid": [
          "arrow-left",
          "arrow-right",
          "arrow-up",
          "bars",
          "bell",
          "briefcase",
          "chart-line",
          "check",
          "chevron-down",
          "circle-check",
          "clock",
          "copy",
          "credit-card",
          "diamond-turn-right",
          "envelope",
          "face-smile",
          "hand-holding-dollar",
          "handshake",
          "heart-pulse",
          "id-card",
          "laptop-code",
          "location-dot",
          "mobile-screen",
          "money-bill-trend-up",
          "motorcycle",
          "paper-plane",
          "star",
          "store",
          "users",
          "utensils",
          "xmark",
        ],
        "fa6-brands": ["whatsapp"],
      },
    }),
  ],
});
