import logoSetting from "@/config/logoSetting.js";
import { constantRoute } from "@/config/routes.js";
// import pinia from '@/store';
// import userStore from "@/store/modules/userStore.js";
import { GetToken } from "@/utils/common.js";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { createRouter, createWebHashHistory } from "vue-router";

NProgress.configure({ showSpinner: false });
const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoute,
    scrollBehavior() {
        return {
            left: 0,
            top: 0,
        };
    },
});

//路由拦截
router.beforeEach(async(to, from, next) => {
    document.title = `${logoSetting.title}-${to.meta.title}`;
    NProgress.start();
    let token = GetToken();
    if (token) {
        if (to.path == '/login') {
            next({ path: '/' })
        } else {
            // try {
            next();
            // } catch (error) {
            //     RemoveToken();
            //     next({ path: '/login', query: { redirect: to.path } })
            // } 
        }
    } else {
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
});
//登录后
router.afterEach((transition) => {
    NProgress.done();
});
export default router;