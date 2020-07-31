
//校验登录密码
export function isPassword(str) {
  let p = /^\w\w{5, 11}$/;
  return p.test(str);
}

//判断是否为数字
export function isNumber(value) {
  let reg = /^[0-9]*$/;
  return reg.test(value);
}

//判断是否是数组
export function isArray(arg) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}