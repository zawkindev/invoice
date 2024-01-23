import { createApp, watch } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from 'pinia'
import "./style.css";
import App from "./App.vue";
import HomeView from "./views/HomeView.vue";
import EditView from "./components/invoice/EditView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/:id", name: "invoice", component: EditView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
const pinia = createPinia()

app.use(pinia)
app.use(router);
app.mount("#app");

