<script setup>
import CButton from "../base/CButton.vue";
const props = defineProps(["invoiceID"]);
const emit = defineEmits(["deleteInvoice", "closeDeleteModal"]);
</script>

<template>
  <div
    class="flex flex-col w-fit max-w-lg rounded-lg h-fit p-12 text-left justify-center items-left gap-3 bg-white dark:bg-dark1"
  >
    <h1 class="font-bold text-2xl">Confirm deletion</h1>
    <p class="text-light1 font-semibold dark:text-light2">
      Are you sure you want to delete invoice #{{ invoiceID }}? This action
      cannot be undone.
    </p>
    <div class="flex flex-row gap-2 self-end">
      <CButton class="cancel-button" @click="$emit('closeModal')" edit text="Cancel" />
      <CButton @click="$emit('deleteInvoice')" danger text="Delete" />
    </div>
  </div>
</template>
