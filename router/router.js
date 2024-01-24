// router.js
import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {path: "/", name: "home", component: () => import( "../src/views/HomeView.vue")},
  {
    path: "/:id", name: "invoice", component: () => import("../src/components/invoice/EditView.vue"), children: [
      {
        path: '/edit', name:"sideModal", components: {
          modal: () => import("../src/components/modal/SideModal.vue")
        }
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
