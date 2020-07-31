import Vue from "vue";
import VueRouter from "vue-router";
import { routerMode } from "config/settings";

const Login = () => import('views/login/Login');


Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: "/login",
    component: Login,
    hidden: true,
  }
];

const router = new VueRouter({
  mode: routerMode,
  routes: constantRoutes,
});

export function resetRouter() {
  router.matcher = new VueRouter({
    mode: routerMode,
    routes: constantRoutes,
  }).matcher
}

export default router;
