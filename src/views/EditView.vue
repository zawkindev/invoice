<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getInvoice } from "../services/api";
import WideCard from "../components/common/WideCard.vue";

const router = useRouter();
const invoiceID = ref("");
const invoice = ref("");

function goBack() {
  window.history.back();
}

onMounted(() => {
  invoiceID.value = router.currentRoute.value.params.id;
  invoice.value = getInvoice(invoiceID.value);
});
</script>

<template>
  <div class="flex flex-col flex-1">
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
    <WideCard edit-page :invoice="invoice" />
  </div>
</template>
