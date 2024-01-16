<script setup>
import { onMounted, ref } from "vue";
import Invoice from "../components/Invoice.vue";
import { useRouter } from "vue-router";

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

const invoiceID = ref("");
const invoice = ref("");
const router = useRouter();

function goBack() {
  window.history.back();
}

onMounted(() => {
  invoiceID.value = router.currentRoute.value.params.id;
  invoice.value = data.value.find((el) => el.id === invoiceID.value);
});
</script>

<template>
  <div
    @click="goBack"
    class="flex flex-row w-full justify-start items-center gap-4 cursor-pointer"
  >
    <img
      class="h-5 w-4 rotate-90"
      alt="back icon"
      src="../assets/arrow-up.svg"
    />
    <p class="font-semibold text-2xl">Go back</p>
  </div>
  <Invoice edit-page :invoice="invoice" />
</template>
