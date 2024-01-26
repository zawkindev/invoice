<script setup>
import {useInvoiceStore} from "../../stores/store.js";
import CInput from "../base/CInput.vue";
import DatePicker from "../common/DatePicker.vue";
import CSelect from "../base/CSelect.vue";
import CTable from "../base/CTable.vue";
import CButton from "../base/CButton.vue";
import {useRoute, useRouter} from "vue-router";
import {createNewInvoiceItem, deleteInvoiceItem, formatMoney} from "../../utils/helper.js";
import {cloneDeep} from "lodash";


const props = defineProps(['invoiceID', 'inEditView'])
const emit = defineEmits(["closeDeleteModal", "closeModal"]);
const store = useInvoiceStore()
const route = useRoute()
const router = useRouter()

const invoice = store.getEditingInvoice(route.params.id) || store.getEmptyInvoice();

function saveInvoice() {
  invoice.status = "pending"
  if (store.getInvoice(invoice.id)) {
    store.replaceInvoice(invoice.id, invoice)
  } else {
    store.addInvoice(invoice)
  }
  router.go(-1)
}

function changeItems(itemsList) {
  invoice.items = itemsList
}

function updateDate(date) {
  invoice.invoiceDate = date
}


function closeModal() {
  invoice.status = "draft"
  router.go(-1)
}
function closeModal1(e) {
  console.log(e)
  if(e.target.classList.contains('overlay')) {
    console.log("salom")
    closeModal()
  }
}
const modalType = route.meta.mode

console.log(modalType)

</script>

<template>
  <div
      @click="closeModal1"
      class="overlay fixed top-0 left-28 z-50 w-screen h-screen bg-black bg-opacity-40 overflow-hidden"
  >
    <form
        @submit.prevent="saveInvoice"
        class="box-border w-2/5 flex flex-col h-full p-8 gap-6  bg-white dark:bg-bgDark rounded-r-3xl overflow-scroll">
      <div v-if="modalType === 'add'" class="flex flex-col h-fit gap-12 overflow-visible ">
        <p class="text-3xl font-bold">
          <span>
            <span class="text-light3 font-bold text-3xl">#</span>{{ invoice?.id }}
          </span>
        </p>
        <div id="bill-from" class="flex flex-col w-full gap-6">
          <p class="font-bold text-primary">Bill From</p>
          <CInput label="Street Address" :placeholder="invoice?.seller.address"
                  @input-value="(value)=>invoice.seller.address=value"/>
          <div class="flex gap-6 w-full h-fit">
            <CInput label="City" :placeholder="invoice?.seller.city"
                    @input-value="(value)=>invoice.seller.city=value"/>
            <CInput label="Post Code" :placeholder="invoice?.seller.postalCode"
                    @input-value="(value)=>invoice.seller.postalCode=value"/>
            <CInput label="Country" :placeholder="invoice?.seller.country"
                    @input-value="(value)=>invoice.seller.country=value"/>
          </div>
        </div>

        <div id="bill-to" class="flex flex-col w-full gap-6">
          <p class="font-bold text-primary">Bill To</p>
          <CInput label="Name" :placeholder="invoice?.fullName"
                  @input-value="(value)=>invoice.fullName=value"/>
          <CInput type="email" label="Client's email" :placeholder="invoice?.email"
                  @input-value="(value)=>invoice.email=value"/>
          <CInput label="Street Address" :placeholder="invoice?.buyer.address"
                  @input-value="(value)=>invoice.buyer.address=value"/>
          <div class="flex gap-6 w-full h-fit">
            <CInput label="City" :placeholder="invoice?.buyer.city"
                    @input-value="(value)=>invoice.buyer.city=value"/>
            <CInput label="Post Code" :placeholder="invoice?.buyer.postalCode"
                    @input-value="(value)=>invoice.buyer.postalCode=value"/>
            <CInput label="Country" :placeholder="invoice?.buyer.country"
                    @input-value="(value)=>invoice.buyer.country=value"/>
          </div>

          <div class="flex gap-6 w-full h-fit">
            <DatePicker @select-date="updateDate" label="Invoice date"/>
            <CSelect label="Payment Terms"/>
          </div>
          <CInput label="Project Description" :placeholder="invoice?.serviceType"
                  @input-value="(value)=>invoice.serviceType=value"/>


          <div id="bill-from" class="flex flex-col w-full gap-6">
            <p class="font-bold text-primary">Item list</p>
            <CTable :invoice="invoice" @change-items="changeItems" in-modal="true" :invoiceID="invoice?.id"/>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col h-fit gap-12 overflow-visible ">
        <p class="text-3xl font-bold">
          <span v-if="modalType === 'edit' ">
            <span class="text-light3 font-bold text-3xl">#</span>{{ invoice?.id }}
          </span>
          <span v-else>
            <span class="text-light3 font-bold text-3xl">New Invoice</span>
          </span>
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
          <CInput type="email" label="Client's email" :value="invoice.email"
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
            <DatePicker @select-date="updateDate" label="Invoice date"/>
            <CSelect @click="(e)=>e.preventDefault()" label="Payment Terms"/>
          </div>
          <CInput label="Project Description" :value="invoice.serviceType"
                  @input-value="(value)=>invoice.serviceType=value"/>


          <div id="bill-from" class="flex flex-col w-full gap-6">
            <p class="font-bold text-primary">Item list</p>
            <CTable :invoice="invoice" @change-items="changeitems" in-edit-view="true" in-modal="true"
                    :invoiceID="invoice.id"/>
          </div>
          <CButton @click="createNewInvoiceItem(invoice.items)" edit text="Create New Item"/>
        </div>
      </div>

      <div class="buttons flex w-full content-end items-end">
        <CButton v-if="modalType === 'add' " edit text="Discard"/>
        <div class="flex ml-auto gap-4 w-fit self-end">
          <CButton class="cancel-button" @click="router.go(-1)" edit text="Cancel"/>
          <CButton type="submit" primary text="Save Changes"/>
        </div>
      </div>
    </form>
  </div>
</template>


<style>
/* Hide the scrollbar */
body {
  scrollbar-width: thin;
  scrollbar-color: #7e88c3 transparent;
}

/* WebKit browsers */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: transparent;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

/* WebKit browsers */
::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar-button:start:decrement,
::-webkit-scrollbar-button:end:increment {
  background-color: transparent;
}


</style>