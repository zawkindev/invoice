// router.js
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../src/views/HomeView.vue";
import EditView from "../src/components/invoice/EditView.vue";
// import HomeView from "../views/HomeView.vue";
// import EditView from "../components/invoice/EditView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/:id", name: "invoice", component: EditView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
