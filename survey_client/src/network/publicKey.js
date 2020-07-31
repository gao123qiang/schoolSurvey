import request from "utils/request"

//去服务器获取公钥的接口
export function getPublicKey() {
  return request({
    url: "/publicKey",
    method: "post",
  })
}