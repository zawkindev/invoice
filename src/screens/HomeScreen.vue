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
  {
    id: "AB1234",
    date: "2021-08-15",
    fullName: "Eva Johnson",
    money: 150.75,
    status: "paid",
  },
  {
    id: "CD5678",
    date: "2010-12-05",
    fullName: "John Doe",
    money: 75.50,
    status: "draft",
  },
  {
    id: "EF9012",
    date: "2018-05-20",
    fullName: "Emily White",
    money: 200.00,
    status: "paid",
  },
  {
    id: "GH3456",
    date: "2015-03-10",
    fullName: "Chris Smith",
    money: 89.99,
    status: "pending",
  },
  {
    id: "IJ7890",
    date: "2019-11-02",
    fullName: "Sophia Brown",
    money: 120.25,
    status: "draft",
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
