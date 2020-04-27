/*
 * @Description: 请求封装
 * @Author: zhangping
 * @Date: 2019-07-19 17:40:49
 * @LastEditTime: 2019-09-24 17:37:29
 * @LastEditors: Please set LastEditors
 */
import Fly, { FlyRequestConfig } from "flyio";
import ApiUri from "./api";
import { Throttle } from "../utils/index";

// 节流
const Throttle_: any = Throttle();
// restful的参数
interface IBindVars {
  key: string;
  value: string | number;
}
// 请求参数类型
export interface IParams {
  uriCode: any;
  method?: string;
  id?: Number;
  bindVars?: IBindVars[];
  [key: string]: any;
}

interface FlyRequestProps extends FlyRequestConfig {
  params?: IParams;
}

//添加请求拦截器
Fly.interceptors.request.use((config: FlyRequestProps) => {
  config.baseURL = process.env.NODE_ENV === "production" ? "" : "";
  // 处理参数,针对于绑定id的路由
  if (config.body && Array.isArray(config.body.bindVars)) {
    config.body.bindVars.forEach((item: IBindVars) => {
      if (!!config.url) {
        config.url = config.url.replace(`:${item.key}`, `${item.value}`);
      }
    });
    delete config.body.bindVars;
  }
  config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
  config.timeout = 30000;
  return config;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
Fly.interceptors.response.use(
  (response: any) => {
    const { data, status } = response;
    if (status >= 200 && status < 300) {
      return data;
    } else {
      return new Promise((response, reject) => {
        reject(response);
      });
    }
  },
  (error: any) => {
    let errDescription = "fail";
    switch (error.status) {
      case 400:
        errDescription = error.data.detail || "Parameter error";
        break;
      case 404:
        errDescription = "Resource not found";
        break;
      case 500:
        errDescription = "fail";
        break;
      default:
        errDescription = "fail";
    }
    new Throttle_(() => {
      console.error(errDescription);
    }, 300);
    return new Promise((response, reject) => {
      reject(error);
    });
    //发生网络错误后会走到这里
    //promise.resolve("ssss")
  }
);

let newApiUri: any = ApiUri;
const Fetch = (params: IParams) => {
  // 当前api对象
  const uriObj = newApiUri[params[`uriCode`]];
  // 请求的url
  let uri = uriObj.restful ? uriObj.uri + "/" + params["id"] : uriObj.uri;
  // 请求的方法类型
  let method_: "get" | "post" | "patch" | "delete" | "put";
  if (!uriObj.method) {
    method_ = "get";
  } else {
    method_ = uriObj.method;
  }
  // 获取传给后端的参数
  let param = JSON.parse(JSON.stringify(params));
  delete param[`uriCode`];
  delete param.method;
  if (uriObj.restful) {
    delete param.id;
  }
  const _fly: any = Fly;
  return _fly[method_](uri, param);
};

export default Fetch;
