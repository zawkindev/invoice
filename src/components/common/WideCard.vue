<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {formatDate, generateID} from "../../utils/helper";


import Badge from "./Badge.vue";
import CButton from "../base/CButton.vue";
import SideModal from "../modal/SideModal.vue";
import DeleteModal from "../modal/DeleteModal.vue";
import {useInvoiceStore} from "../../stores/store.js";

const props = defineProps({
  invoiceID: String,
  editPage: Boolean,
});

const store = useInvoiceStore()

const emit = defineEmits(['deleteInvoice', 'markAsPaid', "markAsPending"])

const router = useRouter();

const invoice = store.getInvoice(props.invoiceID);


const isSideModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

function openSideModal() {
  isSideModalOpen.value = true;
}

function openDeleteModal() {
  isDeleteModalOpen.value = true;
}

function closeModal(e) {
  if (
      e.target.className.includes("overlay") ||
      e.target.className.includes("cancel-button")
  ) {
    isSideModalOpen.value = false;
    isDeleteModalOpen.value = false;
  }
}

function navigateToInvoice() {
  if (!props.editPage) {
    router.push({
      name: "invoice",
      params: {id: invoice.value.id, invoice: invoice.date},
    });
  }
}

function navigateToHome() {
  router.push({
    name: "home",
  });
}

function deleteInvoice() {
  console.log(invoice.value.id)
  store.deleteInvoice(invoice.value.id)
  navigateToHome();
}
</script>

<template>
  <div
      @click="navigateToInvoice(invoice.id)"
      class="cursor-pointer flex flex-row justify-between items-center font-semibold w-full h-fit py-8 px-6 bg-white shadow-md rounded-lg dark:bg-dark1"
  >
    <!--  IF  -->

    <div
        v-if="props.editPage"
        class="flex flex-row justify-between w-full items-center px-8"
    >
      <div class="flex flex-row items-center gap-10 w-fit">
        <p class="text-xl text-[#858BB2] dark:text-light1">Badge</p>
        <Badge :status="invoice.status"/>
      </div>
      <div class="flex flex-row w-fit gap-5 items-center">
        <CButton @click="openSideModal" edit text="Edit"/>
        <CButton @click="openDeleteModal" danger text="Delete"/>
        <CButton class="min-w-[171px]" v-if="invoice.status==='pending'" @click="$emit('markAsPaid')" primary
                 text="Mark as Paid"/>
        <CButton class="min-w-[171px]" v-if="invoice.status==='paid'" @click="$emit('markAsPending')" primary
                 text="Mark as Pending"/>
      </div>
    </div>

    <!--  ELSE   -->

    <div v-else class="flex w-full">
      <div class="flex flex-row w-full items-center gap-10">
        <p class="text-3xl font-bold">
          <span class="text-light3 font-bold text-3xl">#</span>{{ invoice.id }}
        </p>
        <p class="text-xl text-light3 dark:text-light1">
          Due&nbsp;{{ formatDate(invoice.date) }}
        </p>
        <p class="text-xl text-light3 dark:text-light1">
          {{ invoice.fullName }}
        </p>
      </div>
      <div
          v-show="!props.editPage"
          class="flex flex-row w-full items-center justify-end gap-8"
      >
        <p class="text-3xl font-bold">£&nbsp;{{ invoice.money }}</p>
        <div class="flex flex-row gap-5 items-center">
          <Badge :status="invoice.status"/>
          <img
              alt="arrow right"
              src="../../assets/arrow-up.svg"
              class="h-4 w-4 cursor-pointer rotate-[270deg]"
              @click="navigateToInvoice()"
          />
        </div>
      </div>
    </div>
  </div>
  <div
      v-if="editPage"
      v-show="isSideModalOpen"
      class="overlay fixed left-28 top-0 z-50 w-screen h-screen bg-black bg-opacity-40"
      @click="closeModal"
  >
    <SideModal :invoice-i-d="invoice.id" in-edit-view="true"/>
  </div>
  <div
      v-else
      v-show="isSideModalOpen"
      class="overlay fixed left-28 top-0 z-50 w-screen h-screen bg-black bg-opacity-40"
      @click="closeModal"
  >
<!--    <SideModal :invoice-i-d="generateID()"/>-->
  </div>
  <div
      v-show="isDeleteModalOpen"
      class="overlay fixed flex justify-center items-center left-0 top-0 z-50 w-screen h-screen bg-black bg-opacity-40"
      @click="closeModal"
  >
    <DeleteModal
        :invoice-i-d="invoice.id"
        @close-modal="closeModal"
        @delete-invoice="deleteInvoice"
    />
  </div>
</template>
