<script setup>
import {computed, ref, watch, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useInvoiceStore} from "../stores/store.js";
import {createNewInvoiceItem, formatDate, formatMoney} from "../utils/helper.js";
import CTable from "../components/base/CTable.vue";
import Card from "../components/common/Card.vue";
import CButton from "../components/base/CButton.vue";
import Badge from "../components/common/Badge.vue";
import DeleteModal from "../components/modal/DeleteModal.vue";
import CModal from "../components/modal/CModal.vue";



const store = useInvoiceStore();
const router = useRouter();
const route = useRoute()
const {invoices} = useInvoiceStore()
const invoice = computed(() => store.getInvoice(route.params.id))
const isSideModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

function openSideModal() {
  isSideModalOpen.value = true;
  router.push({
    name: "EditModal",
    params: {id: route.params.id},
  });
}

function openDeleteModal() {
  isDeleteModalOpen.value = true
}

function closeModal(e) {
  // if (e) {
  //   if (
  //       !e.target.closest('form') || e.target.classList.includes(".cancel-button")
  //   ) {
  //     isSideModalOpen.value = false;
  //     isDeleteModalOpen.value = false;
  //   }
  //
  // } else if (route.fullPath.includes("/edit")) {
  //   router.push(id: route.params.id)
  // }

  isSideModalOpen.value = false;
  isDeleteModalOpen.value = false;
}

function goBack() {
  router.push({
    name: "Home",
  });
}

function changeItems(itemsList) {
  invoice.items = itemsList
}



watchEffect(() => {
  if (route.fullPath.includes("/edit")) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
  console.log(document.body.classList);
});


</script>

<template>
  <div class="edit-view flex flex-col w-full gap-10">
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
    <Card>
      <div
          class="flex flex-row justify-between w-full gap-4 items-center"
      >
        <div class="flex flex-row items-center gap-6 w-fit">
          <p class=" text-[#858BB2] dark:text-light1">Status</p>
          <Badge :status="invoice.status"/>
        </div>
        <div class="flex flex-row w-fit gap-5 items-center">
          <CButton @click="openSideModal" edit text="Edit"/>
          <CButton @click="openDeleteModal" danger text="Delete"/>
          <CButton class="min-w-[171px]" v-if="invoice.status==='pending'" @click="$emit('markAsPaid')" primary
                   text="Mark as Paid"/>
          <CButton class="min-w-[171px]" v-if="invoice.status==='paid'" @click="$emit('markAsPending')" primary
                   text="Mark as Pending"/>
        </div>
      </div>
    </Card>

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
          <CTable @change-items="changeItems" :invoice="invoice" :invoiceID="invoice.id" in-edit-view="true"/>
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
    <!--    <CModal-->
    <!--        v-show="isSideModalOpen"-->
    <!--        class="left-28"-->
    <!--    >-->
    <router-view>

    </router-view>
    <CModal
        v-show="isDeleteModalOpen"
        class="flex justify-center items-center left-0"
    >
      <DeleteModal
          :invoice-i-d="invoice.id"
          @close-modal="closeModal"
      />
    </CModal>

  </div>
</template>
