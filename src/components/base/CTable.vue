<script setup>
import {useInvoiceStore} from "../../stores/store";
import {createNewInvoiceItem, formatMoney} from "../../utils/helper";
import CInput from "./CInput.vue";
import {computed, watch} from "vue";
import CButton from "./CButton.vue";
import {useRoute} from "vue-router";
import {cloneDeep} from "lodash";

const props = defineProps(["invoice","invoiceID", "inModal", "inEditView"]);
const emit = defineEmits(["changeItems"])

const store = useInvoiceStore();
const route = useRoute()
// const invoice = store.getEditingInvoice(props.invoiceID) || store.emptyInvoice
// const invoice = props.inEditView ? store.editingInvoice : store.getEmptyInvoice();
// let invoice;
// if (props.inEditView) {
//   if (props.inModal) {
//     invoice = cloneDeep(store.editingInvoice)
//   } else {
//     // invoice = computed(()=>store.getInvoice(props.invoiceID)
//     invoice = computed(()=>store.getInvoice(route.params.id))
//   }
// } else {
//   invoice = store.emptyInvoice
// }
const invoiceItems = props.invoice.items;

function createNewItem() {
  createNewInvoiceItem(invoiceItems)
}

watch(props.invoice, (newData) => {
  let invoiceAmount = 0
  newData.items.forEach(item => {
    item.total = (parseFloat(item.qty) || 0) * (parseFloat(item.price) || 0)
    invoiceAmount += item.total
  })
  newData.amount = invoiceAmount
  emit("changeItems",invoiceItems)
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

    <!--    IF    -->
    <div v-if="inModal" v-for="(item, index) in invoiceItems" class="item flex flex-row w-full gap-6">
      <div class="flex flex-1">
        <CInput placeholder="Item Name" :value="item.name" @input-value="(value)=>invoice.items[index].name=value"/>
      </div>
      <div class="flex flex-row flex-1 justify-between items-center gap-6">
        <CInput placeholder="QTY" type="number" :value="item.qty"
                @input-value="(value)=>invoice.items[index].qty=value"/>
        <CInput placeholder="Price" type="number" :value="item.price"
                @input-value="(value)=>invoice.items[index].price=value"/>
        <p class="font-bold text-xl text-wrap">£ {{ formatMoney(item.total) }}</p>
      </div>
    </div>

    <!--    ELSE    -->
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
    <CButton v-if="inModal" @click="createNewItem" edit text="Create New Item"/>
  </div>
</template>
