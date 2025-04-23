import http from "./http.js";
let ApiPathSuffix = {
    MONITOR: '/motior',
    USERINFO_URL: '/admin/acl/index/info',
    LOGOUT_URL: '/admin/acl/index/logout',
}
export default {
    getMonitorList: (params) => {
        return http.get(ApiPathSuffix.MONITOR, params).then((res) => res);
    },
    saveMonitor: (params) => {
        return http.post(ApiPathSuffix.MONITOR, params).then((res) => res);
    },
};