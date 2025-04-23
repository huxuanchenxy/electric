import http from "./http.js";
export default {
    login: (params) => {
        return http.get("/login/login", params).then((res) => res.data);
    },
    saveSysUser: (params) => {
        return http.post("/login/saveSysUser", params).then((res) => res.data);
    },
    getMock: () => {
        return http.get("/api/user/info").then((res) => res.data);
    },
};


// import http from "./http.js";
// let ApiPathSuffix = {
//     LOGIN_URL: '/login',
//     USERINFO_URL: '/admin/acl/index/info',
//     LOGOUT_URL: '/admin/acl/index/logout',
// }
// export default {
//     login: (params) => {
//         return http.post(ApiPathSuffix.LOGIN_URL, params).then((res) => res);
//     },
// };