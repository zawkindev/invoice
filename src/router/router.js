// router.js
import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {path: "/", name: "Home", component: () => import( "../views/HomeView.vue")},
  {
    path: "/:id", name: "Invoice", component: () => import("../views/InvoiceDetail.vue"), children: [
      {
        path: 'edit', name: "SideModal", component: import("../components/modal/SideModal.vue")
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
