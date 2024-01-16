import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import "./style.css";
import App  from "./App.vue";
import HomeScreen from "./screens/HomeScreen.vue";
import EditScreen from "./screens/EditScreen.vue";

const routes = [
  { path: "/", component: HomeScreen },
  { path: "/:id", name: "invoice", component: EditScreen },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
