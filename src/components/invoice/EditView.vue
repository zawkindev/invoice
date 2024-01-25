<script setup>
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useInvoiceStore} from "../../stores/store";
import {formatDate, formatMoney} from "../../utils/helper";
import WideCard from "../common/WideCard.vue";
import CTable from "../base/CTable.vue";

const store = useInvoiceStore();
const router = useRouter();
const route = useRoute()
const invoice = store.getInvoice(route.params.id)

console.log("ID: ", invoice)

function goBack() {
  if (window.history.length > 2) {
    router.go(-1)
  } else {
    router.push({
      name: "home",
    });
  }
}


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
    <WideCard @mark-as-paid="store.markAs(invoice.id,'paid')" @mark-as-pending="store.markAs(invoice.id,'pending')"
              edit-page :invoice-i-d="invoice.id"/>

    <!--   INFO START     -->

    <div
        class="flex flex-col w-full h-full bg-white p-12 gap-10 rounded-lg dark:bg-dark1"
    >
      <div class="flex flex-row w-full items-center justify-between">
        <div class="flex flex-col text-left gap-3">
          <p class="text-2xl font-bold">
            <span class="text-light3 font-bold text-2xl">#</span
            >{{ invoice.id }}
          </p>
          <p class="text-light3 dark:text-light1 font-semibold text-lg">
            {{ invoice.serviceType }}
          </p>
        </div>
        <div class="flex flex-col text-right gap-1">
          <p class="text-light3 dark:text-light1 font-semibold text-lg">
            {{ invoice.seller.address }}
          </p>
          <p class="text-light3 dark:text-light1 font-semibold text-lg">
            {{ invoice.seller.city }}
          </p>
          <p class="text-light3 dark:text-light1 font-semibold text-lg">
            {{ invoice.seller.postalCode }}
          </p>
          <p class="text-light3 dark:text-light1 font-semibold text-lg">
            {{ invoice.seller.country }}
          </p>
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <div class="flex flex-col justify-between">
          <div class="flex flex-col gap-3">
            <p class="text-light3 dark:text-light1 text-lg">
              Invoice Date
            </p>
            <p class="text-2xl font-bold invoiceDate">
              {{ formatDate(invoice.invoiceDate) }}
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <p class="text-light3 dark:text-light1 text-lg">
              Payment Due
            </p>
            <p class="text-2xl font-bold">
              {{ formatDate(invoice.paymentDue) }}
            </p>
          </div>
        </div>
        <div class="flex flex-col billTo gap-3">
          <p class="text-light3 dark:text-light1  text-lg">
            Bill To
          </p>
          <div>
            <p class="text-2xl font-bold">
              {{ invoice.fullName }}
            </p>
          </div>
          <div>
            <p class="text-light3 dark:text-light1 font-semibold text-lg">
              {{ invoice.buyer.address }}
            </p>
            <p class="text-light3 dark:text-light1 font-semibold text-lg">
              {{ invoice.buyer.city }}
            </p>
            <p class="text-light3 dark:text-light1 font-semibold text-lg">
              {{ invoice.buyer.postalCode }}
            </p>
            <p class="text-light3 dark:text-light1 font-semibold text-lg">
              {{ invoice.buyer.country }}
            </p>
          </div>
        </div>
        <div class="flex flex-col sendTo gap-3">
          <p class="text-light3 dark:text-light1  text-lg">
            Send To
          </p>
          <p class="text-2xl font-bold">
            {{ invoice.email }}
          </p>
        </div>
      </div>
      <div class="rounded-t-lg w-full h-full bg-light0 dark:bg-dark2">
        <div class="p-8">
          <CTable :invoiceID="invoice.id"/>
        </div>
        <div
            class="flex flex-row rounded-b-lg justify-between items-center bg-dark3 p-8 dark:bg-light4"
        >
          <p class="text-white text-lg font-semibold">Amount Due</p>
          <p class="text-white text-3xl font-bold">
            £{{ formatMoney(invoice.amount) }}
          </p>
        </div>
      </div>
    </div>

    <!--  INFO END    -->
  </div>
</template>
