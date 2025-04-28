import http from "./http.js";
import { GetServiceUrl } from "./energyUrl";

let ApiUrl = GetServiceUrl();
export default {
    nox_company: (params) => {
        return http.get(ApiUrl + '/system/dict/data/type/nox_company', params).then((res) => res);
    },
    csvmap: (params) => {
        return http.get(ApiUrl + '/csvmap', params).then((res) => res);
    },
    csvmapall: (params) => {
        return http.post(ApiUrl + '/csvmap/all', params).then((res) => res);
    },
    toCsv: (params) => {
        return http.post(ApiUrl + '/noxao/toCsv', params).then((res) => res);
    },
    noxaoadd: (params) => {
        return http.post(ApiUrl + '/noxao/add', params).then((res) => res);
    },
};