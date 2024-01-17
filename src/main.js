import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import HomeView from "./views/HomeView.vue";
import EditView from "./components/invoice/EditView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/:id", name: "invoice", component: EditView },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
