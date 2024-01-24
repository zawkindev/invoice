<script setup>
import {useInvoiceStore} from "../../stores/store";
import {formatMoney} from "../../utils/helper";
import CInput from "./CInput.vue";
import {watch} from "vue";

const props = defineProps(["invoiceID", "inModal"]);


const store = useInvoiceStore();
const invoice = store.getInvoice(props.invoiceID) || store.emptyInvoice
const invoiceItems = invoice.items;

watch(invoice, (newData) => {
  newData.items.forEach(item => {
    item.total = (parseFloat(item.qty) || 0) * (parseFloat(item.price) || 0)
  })
})

console.log(invoiceItems)
</script>

<template>
  <div class="flex flex-col w-full gap-8 text-left">
    <div class="item flex flex-row w-full">
      <div class="flex flex-1">
        <p class="text-light3 dark:text-light1 font-semibold text-lg">
          Item Name
        </p>
      </div>
      <div class="flex flex-row flex-1 justify-between items-center">
        <p class="text-light3 dark:text-light1 font-semibold text-lg">QTY.</p>
        <p class="text-light3 dark:text-light1 font-semibold text-lg">Price</p>
        <p class="text-light3 dark:text-light1 font-semibold text-lg">Total</p>
      </div>
    </div>
    <div v-if="inModal" v-for="(item, index) in invoiceItems" class="item flex flex-row w-full gap-6">
      <div class="flex flex-1">
        <CInput :value="item.name" @input-value="(value)=>invoice.items[index].name=value"/>
      </div>
      <div class="flex flex-row flex-1 justify-between items-center gap-6">
        <CInput type="number" :value="item.qty" @input-value="(value)=>invoice.items[index].qty=value"/>
        <CInput type="number" :value="item.price" @input-value="(value)=>invoice.items[index].price=value"/>
        <p class="font-bold text-xl text-wrap">£ {{ formatMoney(item.total) }}</p>
      </div>
    </div>

    <div v-else v-for="item in invoiceItems" class="item flex flex-row w-full">
      <div class="flex flex-1">
        <p class="font-bold text-xl text-wrap">
          {{ item.name }}
        </p>
      </div>
      <div class="flex flex-row flex-1 justify-between items-center">
        <p class="font-bold text-xl text-wrap">{{ item.qty }}</p>
        <p class="font-bold text-xl text-wrap">£ {{ formatMoney(item.price) }}</p>
        <p class="font-bold text-xl text-wrap">£ {{ formatMoney(item.total) }}</p>
      </div>
    </div>
  </div>
</template>
