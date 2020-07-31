import axios from "axios";
import {
  baseURL,
  contentType,
  invalidCode,
  messageDuration,
  noPermissionCode,
  requestTimeout,
  successCode,
  tokenName,
  debounce,
} from "config/settings";
import { Loading, Message } from "element-ui";
import router from "router";
import qs from "qs";
import store from "store";
import { isArray, isNumber} from "utils/validate";
import _ from "loadsh"

const service = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    "Content-Type": contentType,
  },
});

let loadingInstance;
service.interceptors.request.use(
  (config) => {
    if (store.getters["user/accessToken"]) {
      config.headers[tokenName] = store.getters["user/accessToken"];
    }
    if (config.data) {
      config.data = _.pickBy(config.data, _.identity);
    }
    //暂时确实qs的序列化
    const needLoading = () => {
      let status = false;
      debounce.forEach((item) => {
        if (_.includes(config.url, item)) {
          status = true;
        }
      });
      return status;
    };
    if (needLoading()) {
      loadingInstance = Loading.service();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const errorMsg = (message) => {
  return Message({
    message: message,
    type: "error",
    duration: messageDuration,
  });
};

service.interceptors.response.use(
  (response) => {
    if (loadingInstance) {
      loadingInstance.close();
    }
    const {status, data, config} = response;
    const {code, msg} = data;
    let codeVerification = "";

    if (isNumber(successCode)) {
      codeVerification = successCode;
    }
    if (isArray(successCode)) {
      for (let i = 0; i < successCode.length; i++) {
        if (code === successCode[i]) {
          codeVerification = successCode[i];
          break;
        }
      }
    }
    if (code !== codeVerification) {
      switch (code) {
        case invalidCode:
          errorMsg(msg || `后端接口${code}异常`);
          store.dispatch("user/resetAccessToken");
          break;
        case noPermissionCode:
          router.push({
            path: "/401",
          });
          break;
        default:
          errorMsg(msg || `后端接口${code}异常`);
          break;
      }
      return Promise.reject(
        "gao-vue-admin请求异常拦截" +
        JSON.stringify({url: config.url, code, msg}) || "Error"
      );
    } else {
      return data;
    }
},
  (error) => {
    if (loadingInstance) {
      loadingInstance.close();
    }
    let { message } = error;
    if (message === "Network Error") {
      message = "后端接口连接异常";
    }
    if (message.includes("timeout")) {
      message = "后端接口请求超时";
    }
    if (message.includes("Request failed with status code")) {
      message = "后端接口" + message.substr(message.length - 3) + "异常";
    }
    errorMsg(message || "后端接口未知异常");
    return Promise.reject(error);
  }
);

export default service;
