import request from "utils/request"
import { encrypteData } from "utils/psaEncrypt";
import { loginRSA } from "config/settings"

export async function login(data) {
  if (loginRSA) {
    data = await encrypteData(data);
  }
  return request({
    url: "/login",
    method: "post",
    data
  })
}