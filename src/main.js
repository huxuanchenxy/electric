import { createApp } from "vue";
// import './style.css'
//引入模板的全局的样式
import "@/assets/styles/index.scss";
import '@/assets/icons/iconfont/iconfont.css';
import '@/assets/icons/iconfont/iconfont.js';
import App from "./App.vue";
import router from "./router/index";
import ElementPlus from "element-plus";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import "element-plus/dist/index.css";
//暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import pinia from "./store";
//svg插件需要配置代码
import "virtual:svg-icons-register";
// const pinia = createPinia();
console.log("main.js 环境变量=》",
    import.meta.env);

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(router).use(ElementPlus, {
    locale: zhCn, // 设置全局中文
  }).use(pinia).mount("#app");