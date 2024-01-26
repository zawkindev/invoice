<script setup>
import CButton from "../base/CButton.vue";
import {useRoute, useRouter} from "vue-router";
import {useInvoiceStore} from "../../stores/store.js";

const props = defineProps(["invoiceID"]);
const emit = defineEmits(["deleteInvoice", "closeDeleteModal"]);

const route = useRoute()
const router = useRouter()
const store = useInvoiceStore()


const currentId = route.params.id;

function deleteInvoice() {
  console.log("deleted invoice: ", currentId)
  store.deleteInvoice(currentId)
  router.push({
    name: "Home",
  });
}

</script>

<template>
  <div
      class="overlay flex items-center justify-center fixed top-0 z-50 w-screen h-screen bg-black bg-opacity-40"
  >
    <div
        class="flex flex-col w-fit max-w-lg rounded-lg h-fit p-12 text-left justify-center items-left gap-3 bg-white dark:bg-dark1"
    >
      <h1 class="font-bold text-2xl">Confirm deletion</h1>
      <p class="dark:text-light1 font-semibold text-light2">
        Are you sure you want to delete invoice #{{ invoiceID }}? This action
        cannot be undone.
      </p>
      <div class="flex flex-row gap-2 self-end">
        <CButton class="cancel-button" @click="emit('closeModal')" edit text="Cancel"/>
        <CButton @click="deleteInvoice" danger text="Delete"/>
      </div>
    </div>
  </div>
</template>
