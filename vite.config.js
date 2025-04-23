import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig, loadEnv } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  //console.log("环境变量=1111》",env,  env.VITE_IsMock, );
  return {
    base: env.VITE_APP_CONTEXT_PATH,
    server: {
      open: true,
      port: 8800,
      host: "0.0.0.0"
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api"],
          javascriptEnabled: true,
          //additionalData: '@import "./src/assets/styles/variable.scss";',
          additionalData: `@use "./src/assets/styles/variable.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue", "vue-router"],
        dirs: ["src/views/**", "src/components/**"],
        dts: "./typings/auto-imports.d.ts",
      }),
      Components({
        dirs: ["src/components"],
        extensions: ["vue"],
        deep: true,
        resolvers: [],
        dts: "./typings/components.d.ts",
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({ mockPath: "mock", enable: env.VITE_IsMock === "1" }),
    ],
  };
});