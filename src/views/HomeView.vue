<script setup>
import {computed, ref} from "vue";
// import { getData } from "../services/api";
// import { fetchDataFromLocalStorage } from "../storage/storage";
import { useInvoiceStore } from "../stores/store";
import NoData from "../components/layout/NoData.vue";
import Header from "../components/layout/Header.vue";
import WideCard from "../components/common/WideCard.vue";

const store = useInvoiceStore();

const data = computed(()=>store.getData().value)


const invoiceCount = computed(()=>store.getData().value.length);
</script>

<template>
  <Header :invoice-count="invoiceCount" />
  <div v-if="invoiceCount" class="flex flex-col w-full h-fit gap-5">
    <WideCard
      v-for="invoice in data"
      :invoice="invoice"
    />
  </div>
  <NoData v-else />
</template>
