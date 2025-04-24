import http from "./http.js";
import { GetServiceUrl } from "./energyUrl";

let ApiUrl = GetServiceUrl();
export default {
    nox_company: (params) => {
        return http.get(ApiUrl + '/system/dict/data/type/nox_company', params).then((res) => res);
    }
};