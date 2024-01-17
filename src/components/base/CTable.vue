<script setup>
import { getInvoiceItems } from "../../services/api"
import { formatMoney } from "../../utils/helper"
const props = defineProps(["invoiceID"]);
const invoiceItems = getInvoiceItems(props.invoiceID)
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
    <div v-for="item in invoiceItems" class="item flex flex-row w-full">
      <div class="flex flex-1">
        <p class=" font-bold text-xl">
          {{item.name}}
        </p>
      </div>
      <div class="flex flex-row flex-1 justify-between items-center">
        <p class=" font-bold text-xl">{{item.qty}}</p>
        <p class=" font-bold text-xl">£ {{formatMoney(item.price)}}</p>
        <p class=" font-bold text-xl">£ {{formatMoney(item.total)}}</p>
      </div>
    </div>
  </div>
</template>
