<script setup>
import {useInvoiceStore} from "../../stores/store.js";
import CInput from "../base/CInput.vue";

const store = useInvoiceStore()
const props = defineProps(['invoiceID', 'inEditView'])
const invoice = store.getInvoice(props.invoiceID)
console.log(store.getInvoice(props.invoiceID))
</script>

<template>
  <div v-if="inEditView" class="flex flex-col w-2/5 h-full p-12 gap-11 bg-white dark:bg-bgDark rounded-r-3xl">
    <p class="text-3xl font-bold">
      <span class="text-light3 font-bold text-3xl">#</span>{{ invoice.id }}
    </p>
    <div id="bill-from" class="flex flex-col">
      <p class="font-bold text-primary">Bill From</p>
      <div class="flex flex-col">
      <CInput />
<div class="flex"></divcl>
      </div>
    </div>
  </div>
</template>
