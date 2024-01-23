<script setup>
import {useInvoiceStore} from "../../stores/store.js";

const store = useInvoiceStore()
const props = defineProps(['invoiceID', 'inEditView'])
const invoice = store.getInvoice(props.invoiceID)
console.log(store.getInvoice(props.invoiceID))
</script>

<template>
  <div v-if="inEditView" class="flex flex-col w-2/5 h-full bg-white dark:bg-bgDark rounded-r-3xl">
    <p class="text-3xl font-bold">
      <span class="text-light3 font-bold text-3xl">#</span>{{ (invoice.id).toString() }}
    </p>
    <div id="bill-from" class="flex flex-col">
      <p>Bill From</p>
    </div>
  </div>
</template>
