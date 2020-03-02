import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/wallets",
    name: "Wallets",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Wallet/Wallets.vue")
  }, {
    path: "/exchange",
    name: "Exchange",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Exchange/Exchange.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
