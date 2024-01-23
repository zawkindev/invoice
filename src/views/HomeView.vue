<script setup>
import {computed, ref, watch} from "vue";
// import { getData } from "../services/api";
// import { fetchDataFromLocalStorage } from "../storage/storage";
import { useInvoiceStore } from "../stores/store";
import NoData from "../components/layout/NoData.vue";
import Header from "../components/layout/Header.vue";
import WideCard from "../components/common/WideCard.vue";

const store = useInvoiceStore();
const invoices = computed(()=>store.getInvoicesList().value)
const checkedStatus = computed(()=>store.checkedStatus)
const invoiceCount = computed(()=>store.filterByStatus(checkedStatus.value).length);

</script>

<template>
  <Header :invoice-count="invoiceCount" />
  <div v-if="invoiceCount || invoiceCount===0" class="flex flex-col w-full h-fit gap-5">
    <WideCard
        v-for="invoice in store.filterByStatus(checkedStatus)"
        :invoice="invoice"
    />
  </div>
  <NoData v-else />
</template>
