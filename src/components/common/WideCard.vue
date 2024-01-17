<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { formatDate } from "../../utils/helper";
import Badge from "./Badge.vue";
import CButton from "../base/CButton.vue";
import EditModal from "../modal/EditModal.vue";

const props = defineProps({
  invoice: Object,
  editPage: Boolean,
});

const router = useRouter();

const invoice = ref(props.invoice);

const isModalOpen = ref(false);

function openModal() {
  isModalOpen.value = true;
}

function closeModal(e) {
  if (e.target.className.includes("overlay")) {
    isModalOpen.value = false;
  }
}

function navigateToInvoice() {
  router.push({
    name: "invoice",
    params: { id: invoice.value.id, invoice: invoice.date },
  });
}
</script>

<template>
  <div
    class="flex flex-row justify-between items-center font-semibold w-full h-fit py-8 px-6 bg-white shadow-md rounded-lg dark:bg-dark1"
  >
    <!--  IF  -->

    <div
      v-if="props.editPage"
      class="flex flex-row justify-between w-full items-center px-8"
    >
      <div class="flex flex-row items-center gap-10 w-fit">
        <p class="text-xl text-[#858BB2] dark:text-light1">Badge</p>
        <Badge :status="props.invoice.status" />
      </div>
      <div class="flex flex-row w-fit gap-5 items-center">
        <CButton @click="openModal" edit text="Edit" />
        <CButton danger text="Delete" />
        <CButton primary text="Mark as Paid" />
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
          <Badge :status="invoice.status" />
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
    v-show="isModalOpen"
    class="overlay fixed left-28 top-0 z-50 w-screen h-screen bg-black bg-opacity-40"
    @click="closeModal"
  >
    <EditModal />
  </div>
</template>
