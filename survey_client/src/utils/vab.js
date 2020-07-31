import { title } from "config/settings"

const install = (Vue, opts= {}) => {
  //设置全局的标题
  Vue.prototype.$baseTitle = (() => {
    return title;
  })();
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default install;