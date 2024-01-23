<script setup>
import {useInvoiceStore} from "../../stores/store.js";
import CInput from "../base/CInput.vue";

const store = useInvoiceStore()
const props = defineProps(['invoiceID', 'inEditView'])
const invoice = store.getInvoice(props.invoiceID)
console.log(store.getInvoice(props.invoiceID))
</script>

<template>
  <div v-if="inEditView"
       class="box-border w-2/5 h-full p-12 bg-white dark:bg-bgDark rounded-r-3xl overflow-scroll">
    <div class="flex flex-col h-fit gap-6 overflow-visible ">
      <p class="text-3xl font-bold">
        <span class="text-light3 font-bold text-3xl">#</span>{{ invoice.id }}
      </p>
      <p class="font-bold text-primary">Bill From</p>
      <CInput label="Street Address" :value="invoice.seller.address"
              @input-value="(value)=>invoice.seller.address=value"/>
      <div class="flex gap-6 w-full h-fit">
        <CInput label="City" :value="invoice.seller.city"
                @input-value="(value)=>invoice.seller.city=value"/>
        <CInput label="Post Code" :value="invoice.seller.postalCode"
                @input-value="(value)=>invoice.seller.postalCode=value"/>
        <CInput label="Country" :value="invoice.seller.country"
                @input-value="(value)=>invoice.seller.country=value"/>
      </div>
      <p class="font-bold text-primary">Bill To</p>
      <CInput label="Name" :value="invoice.fullName"
              @input-value="(value)=>invoice.fullName=value"/>
      <CInput label="Client's email" :value="invoice.email"
              @input-value="(value)=>invoice.email=value"/>
      <CInput label="Street Address" :value="invoice.buyer.address"
              @input-value="(value)=>invoice.buyer.address=value"/>
      <div class="flex gap-6 w-full h-fit">
        <CInput label="City" :value="invoice.buyer.city"
                @input-value="(value)=>invoice.buyer.city=value"/>
        <CInput label="Post Code" :value="invoice.buyer.postalCode"
                @input-value="(value)=>invoice.buyer.postalCode=value"/>
        <CInput label="Country" :value="invoice.buyer.country"
                @input-value="(value)=>invoice.buyer.country=value"/>
      </div>
    </div>
  </div>
</template>
