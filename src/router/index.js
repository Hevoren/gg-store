import { createRouter, createWebHashHistory } from "vue-router";
import GgRegister from "@/views/Register.vue";
import GgLogin from "@/views/Login.vue";
import GgProducts from "@/views/Products.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: GgProducts,
  },
  {
    path: "/register",
    name: "register",
    component: GgRegister,
  },
  {
    path: "/login",
    name: "login",
    component: GgLogin,
  },
  {
    path: "/products",
    name: "products",
    component: GgProducts,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
