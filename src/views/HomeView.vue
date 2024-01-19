<script setup>
import { ref } from "vue";
// import { getData } from "../services/api";
// import { fetchDataFromLocalStorage } from "../storage/storage";
import { useInvoiceStore } from "../pinia/store";
import NoData from "../components/layout/NoData.vue";
import Header from "../components/layout/Header.vue";
import WideCard from "../components/common/WideCard.vue";

const store = useInvoiceStore();

const data = store.getData()

const WideCardCount = ref(data.length);
</script>

<template>
  <Header :WideCard-count="WideCardCount" />
  <div v-if="WideCardCount" class="flex flex-col w-full h-fit gap-5">
    <WideCard
      v-for="invoice in data"
      :invoice="invoice"
      @delete-invoice="deleteInvoiceFromStorage"
    />
  </div>
  <NoData v-else />
</template>
