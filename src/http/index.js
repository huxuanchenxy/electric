import axios from "axios";
import { ElMessage } from "element-plus";
import { ElLoading } from "element-plus";
import { ref } from "vue";
import { GetServiceUrl } from "./baseUrl";

// 创建一个 axios 实例
const instance = axios.create({
  baseURL: GetServiceUrl(), // 所有的请求地址前缀部分 比如/Api
  timeout: 60000, // 请求超时时间毫秒
  //withCredentials: true, // 异步请求携带cookie
  // headers: {
  //     // 设置后端需要的传参类型
  //     'Content-Type': 'application/json',
  //     'token': 'your token',
  //     'X-Requested-With': 'XMLHttpRequest',
  // },
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // let token = sessionStorage.getItem('token');
    // if (token) {
    //     config.headers['token'] = token
    // }

    addLoading();

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    //console.log(response, response.data)
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // dataAxios 是 axios 返回数据中的 data
    cancelLoading();
    const dataAxios = response.data;
    // // 这个状态码是和后端约定的
    // const code = dataAxios.reset
    //console.log("response.data.data",response.data);
    return dataAxios;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    cancelLoading();
    if (error && error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          ElMessage.error("请求错误");
          break;
        case 401:
          ElMessage.error("未授权，请重新登录");
          break;
        case 403:
          ElMessage.error("登录过期，请重新登录");
          break;
        case 404:
          ElMessage.error("请求错误，未找到相应的资源");
          break;
        case 408:
          ElMessage.error("请求超时");
          break;
        case 500:
          ElMessage.error("服务器错误");
          break;
        case 504:
          ElMessage.error("网络超时");
          break;
        default:
          ElMessage.error("请求失败");
      }
    } else {
      if (JSON.stringify(error).includes("timeout")) {
        error.code = "TIMEOUT";
        error.message = "服务器响应超时，请重试或联系管理员";
        ElMessage.error(error.message);
      }
    }
    console.log(`axios error:${error}`);
    return Promise.reject(error);
  }
);


// -------------------------4.配置全局loading-----------------------
let loadCount = 0;
let loadingInstance = ref(null);
// 加载loading
const addLoading = () => {
  loadCount++;
  if (loadCount === 1) {
    loadingInstance.value = ElLoading.service({
      fullscreen: true,
      lock: true,
      text: "数据加载中....",
      background: "rgba(0, 0, 0, 0.1)",
    });
  }
};
// 取消加载loading
const cancelLoading = () => {
  loadCount--;
  if (loadCount === 0) {
    loadingInstance.value.close();
  }
};
// -------------------------配置全局loading-----------------------

export default instance;
