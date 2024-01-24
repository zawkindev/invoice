<script setup>
import {useInvoiceStore} from "../../stores/store.js";
import CInput from "../base/CInput.vue";
import DatePicker from "../common/DatePicker.vue";
import CSelect from "../base/CSelect.vue";
import CTable from "../base/CTable.vue";
import CButton from "../base/CButton.vue";


const store = useInvoiceStore()
const props = defineProps(['invoiceID', 'inEditView'])

const emit = defineEmits(["saveInvoice", "closeDeleteModal"]);
const invoice = props.inEditView ? store.getInvoice(props.invoiceID) : store.getEmptyInvoice()

</script>

<template>
  <div
      class="box-border w-2/5 flex flex-col h-full p-8 gap-6  bg-white dark:bg-bgDark rounded-r-3xl overflow-scroll">
    <div v-if="inEditView" class="flex flex-col h-fit gap-12 overflow-visible ">
      <p class="text-3xl font-bold">
        <span class="text-light3 font-bold text-3xl">#</span>{{ invoice.id }}
      </p>
      <div id="bill-from" class="flex flex-col w-full gap-6">
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
      </div>

      <div id="bill-to" class="flex flex-col w-full gap-6">
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

        <div class="flex gap-6 w-full h-fit">
          <DatePicker label="Invoice date"/>
          <CSelect label="Payment Terms"/>
        </div>
        <CInput label="Project Description" :value="invoice.serviceType"
                @input-value="(value)=>invoice.serviceType=value"/>


        <div id="bill-from" class="flex flex-col w-full gap-6">
          <p class="font-bold text-primary">Item list</p>
          <CTable in-modal="true" :invoiceID="invoice.id"/>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col h-fit gap-12 overflow-visible ">
      <p class="text-3xl font-bold">
        <span class="text-light3 font-bold text-3xl">#</span>{{ invoice.id }}
      </p>
      <div id="bill-from" class="flex flex-col w-full gap-6">
        <p class="font-bold text-primary">Bill From</p>
        <CInput label="Street Address" :placeholder="invoice.seller.address"
                @input-value="(value)=>invoice.seller.address=value"/>
        <div class="flex gap-6 w-full h-fit">
          <CInput label="City" :placeholder="invoice.seller.city"
                  @input-value="(value)=>invoice.seller.city=value"/>
          <CInput label="Post Code" :placeholder="invoice.seller.postalCode"
                  @input-value="(value)=>invoice.seller.postalCode=value"/>
          <CInput label="Country" :placeholder="invoice.seller.country"
                  @input-value="(value)=>invoice.seller.country=value"/>
        </div>
      </div>

      <div id="bill-to" class="flex flex-col w-full gap-6">
        <p class="font-bold text-primary">Bill To</p>
        <CInput label="Name" :placeholder="invoice.fullName"
                @input-value="(value)=>invoice.fullName=value"/>
        <CInput label="Client's email" :placeholder="invoice.email"
                @input-value="(value)=>invoice.email=value"/>
        <CInput label="Street Address" :placeholder="invoice.buyer.address"
                @input-value="(value)=>invoice.buyer.address=value"/>
        <div class="flex gap-6 w-full h-fit">
          <CInput label="City" :placeholder="invoice.buyer.city"
                  @input-value="(value)=>invoice.buyer.city=value"/>
          <CInput label="Post Code" :placeholder="invoice.buyer.postalCode"
                  @input-value="(value)=>invoice.buyer.postalCode=value"/>
          <CInput label="Country" :placeholder="invoice.buyer.country"
                  @input-value="(value)=>invoice.buyer.country=value"/>
        </div>

        <div class="flex gap-6 w-full h-fit">
          <DatePicker label="Invoice date"/>
          <CSelect label="Payment Terms"/>
        </div>
        <CInput label="Project Description" :placeholder="invoice.serviceType"
                @input-value="(value)=>invoice.serviceType=value"/>


        <div id="bill-from" class="flex flex-col w-full gap-6">
          <p class="font-bold text-primary">Item list</p>
          <CTable in-modal="true" :invoiceID="invoice.id"/>
        </div>
      </div>
    </div>
    <div class="buttons flex w-full content-end items-end">
      <div class="flex ml-auto gap-4 w-fit self-end">
        <CButton class="cancel-button" @click="$emit('closeModal')" edit text="Cancel"/>
        <CButton @click="$emit('saveInvoice')" primary text="Save Changes"/>
      </div>
    </div>
  </div>
</template>
