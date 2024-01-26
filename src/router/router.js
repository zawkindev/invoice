// router.js
import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {path: "/", name: "home", component: () => import( "../views/HomeView.vue")},
  {
    path: "/:id", name: "invoice", component: () => import("../views/InvoiceDetail.vue"), children: [
      {
        path: 'edit', name: "sideModal", component: import("../components/modal/SideModal.vue")
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
