export const constantRoute = [{
        path: "/login",
        component: () =>
            import ("@/views/login/index.vue"),
        name: "login",
        meta: {
            title: "登录",
            isShowMenu: false,
        },
    },
    {
        path: "/",
        component: () =>
            import ("@/views/main/index.vue"),
        name: "Layout",
        redirect: "/home",
        meta: {
            title: "",
            isShowMenu: true,
            icon: "",
        },
        children: [{
            path: "/home",
            component: () =>
                import ("@/views/main/home/index.vue"),
            name: "home",
            meta: {
                title: "首页",
                isShowMenu: true,
                icon: "House",
                iconfont: ""
            },
        }, ],
    },
    {
        path: "/monitor",
        component: () =>
            import ("@/views/main/index.vue"),
        name: "Monitor",
        redirect: "/monitor/monitorsetting",
        meta: {
            title: "数据管理",
            isShowMenu: true,
            icon: "",
            iconfont: "icon-xitongguanli"
        },
        children: [{
                path: "/monitor/monitorsetting",
                component: () =>
                    import ("@/views/main/monitor/monitorsetting/index.vue"),
                name: "monitorsetting",
                meta: {
                    title: "数据映射",
                    isShowMenu: true,
                    icon: "",
                    iconfont: "icon-xitongguanli"
                },
            },
            //{
            // path: "/monitor/monitorsetting2",
            // component: () =>
            //     import ("@/views/main/monitor/monitorsetting2/index.vue"),
            // name: "monitorsetting2",
            // meta: {
            //     title: "监控设置2",
            //     isShowMenu: true,
            //     icon: "",
            //     iconfont: "icon-xitongguanli"
            // },
            //}
        ],
    },
    // {
    //     path: "/screen",
    //     component: () =>
    //         import("@/views/screen/index.vue"),
    //     name: "Screen",
    //     meta: {
    //         title: "数字大屏",
    //         isShowMenu: true,
    //         icon: "Monitor",
    //         iconfont: ""
    //     },
    // },
    // {
    //     path: "/sys",
    //     component: () =>
    //         import ("@/views/main/index.vue"),
    //     name: "Sys",
    //     redirect: "/sys/systest1",
    //     meta: {
    //         title: "测试",
    //         isShowMenu: true,
    //         icon: "",
    //         iconfont: "icon-xitongguanli"
    //     },
    //     children: [
    //         //{
    //         //         path: "/sys/systest1",
    //         //         component: () =>
    //         //             import ("@/views/main/sys/sysUser/index.vue"),
    //         //         name: "SysUser",
    //         //         meta: {
    //         //             title: "测试页面1",
    //         //             isShowMenu: true,
    //         //             icon: "",
    //         //             iconfont: "icon-xitongguanli"
    //         //         },
    //         //     },
    //         {
    //             path: "/sys/systest2",
    //             component: () =>
    //                 import ("@/views/main/sys/sysOrg/index.vue"),
    //             name: "SysOrg",
    //             meta: {
    //                 title: "测试页面2",
    //                 isShowMenu: true,
    //                 icon: "",
    //                 iconfont: "icon-xitongguanli"
    //             },
    //         },
    //         {
    //             path: "/sys/systest3",
    //             component: () =>
    //                 import ("@/views/main/sys/sysPosition/index.vue"),
    //             name: "SysPosition",
    //             meta: {
    //                 title: "测试页面3",
    //                 isShowMenu: true,
    //                 icon: "",
    //                 iconfont: "icon-xitongguanli"
    //             },
    //         },
    //         {
    //             path: "/sys/systest5",
    //             component: () =>
    //                 import ("@/views/main/sys/sysRole/index.vue"),
    //             name: "SysRole",
    //             meta: {
    //                 title: "测试页面bbb",
    //                 isShowMenu: true,
    //                 icon: "",
    //                 iconfont: "icon-jiaoseguanli"
    //             },
    //         },
    //         {
    //             path: "/sys/systest6",
    //             component: () =>
    //                 import ("@/views/main/sys/sysMenu/index.vue"),
    //             name: "SysMenu",
    //             meta: {
    //                 title: "测试页面aaa",
    //                 isShowMenu: true,
    //                 icon: "Menu",
    //                 iconfont: ""
    //             },
    //         }
    //     ],
    // },
    // {
    //     path: "/product",
    //     component: () =>
    //         import ("@/views/main/index.vue"),
    //     name: "Product",
    //     redirect: "/product/trademark",
    //     meta: {
    //         title: "商品管理",
    //         isShowMenu: true,
    //         icon: "Goods",
    //         iconfont: ""
    //     },
    //     children: [{
    //             path: "/product/trademark",
    //             component: () =>
    //                 import ("@/views/main/product/trademark/index.vue"),
    //             name: "Trademark",
    //             meta: {
    //                 title: "品牌管理",
    //                 isShowMenu: true,
    //                 icon: "",
    //                 iconfont: "icon-pinpaiguanli"
    //             },
    //         },
    //         {
    //             path: "/product/attr",
    //             component: () =>
    //                 import ("@/views/main/product/attr/index.vue"),
    //             name: "Attr",
    //             meta: {
    //                 title: "属性管理",
    //                 isShowMenu: true,
    //                 icon: "",
    //                 iconfont: "icon-shuxingguanli"
    //             },
    //         },
    //         {
    //             path: "/product/spu",
    //             component: () =>
    //                 import ("@/views/main/product/spu/index.vue"),
    //             name: "Spu",
    //             meta: {
    //                 title: "Spu管理",
    //                 isShowMenu: true,
    //                 icon: "",
    //                 iconfont: "icon-SPUguanli"
    //             },
    //         },
    //         {
    //             path: "/product/sku",
    //             component: () =>
    //                 import ("@/views/main/product/sku/index.vue"),
    //             name: "Sku",
    //             meta: {
    //                 title: "Sku管理",
    //                 isShowMenu: true,
    //                 icon: "",
    //                 iconfont: "icon-SKUguanli"
    //             },
    //         },
    //     ],
    // },


    {
        path: '/:catchAll(.*)',
        component: () =>
            import ("@/views/404/index.vue"),
        name: "404",
        meta: {
            title: "404",
            isShowMenu: false,
        },
    },
    // {
    //   path: "/404",
    //   component: () => import("@/views/404/index.vue"),
    //   name: "404",
    //   meta: {
    //     title: "404",
    //     isShowMenu: false,
    //   },
    // },
    // {
    //   path: "/:pathMatch(.*)*",
    //   redirect: "/404",
    //   name: "any",
    //   meta: {
    //     title: "任意路由",
    //     isShowMenu: false,
    //   },
    // },
];