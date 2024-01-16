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
