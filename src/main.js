import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import HomeView from "./views/HomeView.vue";
import EditView from "./views/EditView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/:id", name: "invoice", component: EditView },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
