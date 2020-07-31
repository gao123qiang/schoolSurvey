/*
配置全局变量的文件
*/

module.exports = {
  //路由模式，可选值为history或者hash
  routerMode: "history",
  //软件名称
  title: "Mr Gao Survey beautiful",
  //默认的接口地址
  baseURL: "http://127.0.0.1:8000",
  //配合后端数据的接受方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: "application/json;charset=UTF-8",
  //登录失败code
  invalidCode: 402,
  //无权限code
  noPermissionCode: 401,
  //最长请求时间
  requestTimeout: 5000,
  //操作正常code,
  successCode: [200, 0],
  //token名称
  tokenName: "accessToken",
  //需要加loading层的请求，防止重复提交
  debounce: ["doEdit"],
  //消息框消失的时间
  messageDuration: 3000,
  //token在localStorage,sessionStorage,cookie存储key的名称
  tokenTableName: "gao-vue-admin",
  //token存储的位置localstorage,sessionStorage,cookie
  storage: "localStorage",
  //是否开启登录的RSA加密
  loginRSA: true,
};