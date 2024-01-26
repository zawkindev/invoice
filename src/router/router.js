// router.js
import {createRouter, createWebHistory} from "vue-router";
import CModal from "../components/modal/CModal.vue";
import SideModal from "../components/modal/SideModal.vue";
//
// const NewModal = {
//   template: `<CModal class="left-28"><SideModal @close-modal="closeModal"/></CModal>`
// }

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
    children: [
      {
        path: 'add',
        name: 'AddModal',
        component: () => import("../components/modal/SideModal.vue"),
        meta: {mode: "add"}
      }
    ]
  },
  {
    path: "/:id",
    name: "Invoice",
    component: () => import("../views/InvoiceDetail.vue"),
    children: [
      {
        path: 'edit',
        name: "EditModal",
        component: () => import("../components/modal/SideModal.vue"),
        meta: {
          mode: 'edit'
        },
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
