<script setup>
import { ref } from "vue";
import EmptyBox from "../components/EmptyBox.vue";
import Header from "../components/Header.vue";
import Invoice from "../components/Invoice.vue";

const data = ref([
  {
    id: "XM9141",
    date: "2006-04-22",
    fullName: "Alex Grim",
    money: 102.04,
    status: "pending",
  },
]);

const invoiceCount = ref(data.value.length);
</script>

<template>
  <Header :invoice-count="invoiceCount" />
  <div v-if="invoiceCount" class="flex flex-col w-full h-fit gap-5">
    <Invoice v-for="invoice in data" :invoice="invoice" />
  </div>
  <EmptyBox v-else />
</template>
