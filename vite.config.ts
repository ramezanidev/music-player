import Vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";
import { defineConfig } from 'vite'

import legacy from "@vitejs/plugin-legacy";
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'

const env = {
  baseURL: "http://localhost:8080/",
  ...process.env
};

const config = defineConfig({
  define: {
    'process.env': env
  },
  resolve: {
    alias: {
      "@/": `${resolve(__dirname, "src")}/`
    },
  },
  plugins: [
    Vue(),
    AutoImport({
      include: [
        /\.[tj]s?$/,
        /\.vue$/, /\.vue\?vue/
      ],
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head',
      ],
      dts: 'auto-imports.d.ts',
    }),
    WindiCSS({
      scan: {
        dirs: ['.'], 
        fileExtensions: ['vue', 'js', 'ts'],
      },
    }),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    VitePWA({
      mode: "development",
      base: "/",
      srcDir: "src",
      filename: "sw.ts",
      includeAssets: ["/favicon.png"],
      strategies: "injectManifest",
      manifest: {
        name: "Music Player",
        short_name: "Music Player",
        description: 'Music Player App',
        theme_color: "#131218",
        start_url: "/",
        display: "standalone",
        background_color: "#131218",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      injectManifest: {
        globPatterns: ["assets/*", "**/*.{js,css,html}"],
      } 
    }),
  ],
});

export default config;