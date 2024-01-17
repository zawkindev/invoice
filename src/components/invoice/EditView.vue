<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getInvoice } from "../../services/api";
import WideCard from "../common/WideCard.vue";

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
  <div class="flex flex-col w-full gap-10">
    <div
      @click="goBack"
      class="flex flex-row w-full justify-start items-center gap-4 cursor-pointer"
    >
      <img
        class="h-5 w-4 rotate-90"
        alt="back icon"
        src="../../assets/arrow-up.svg"
      />
      <p class="font-semibold text-2xl">Go back</p>
    </div>
    <WideCard edit-page :invoice="invoice" />
    <div class="flex flex-col w-full h-full bg-white dark:bg-dark1 p-12">
      <div class="flex flex-row w-full justify-between">
        <div class="flex flex-col text-left gap-3">
          <p class="text-2xl font-bold">
            <span class="text-light3 font-bold text-2xl">#</span
            >{{ invoice.id }}
          </p>
          <p class="text-light1 text-xl">Graphic Design</p>
        </div>
        <div class="flex flex-col text-right gap-3">
          <p class="text-2xl font-bold">
            <span class="text-light3 font-bold text-2xl">#</span
            >{{ invoice.id }}
          </p>
          <p class="text-light1 text-xl">Graphic Design</p>
        </div>
      </div>
    </div>
  </div>
</template>
