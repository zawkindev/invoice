<script setup>
import {computed, ref} from "vue";
import {useInvoiceStore} from "../stores/store";
import NoData from "../components/layout/NoData.vue";
import Header from "../components/layout/Header.vue";
import WideCard from "../components/common/WideCard.vue";
import SideModal from "../components/modal/SideModal.vue";

const emit = defineEmits(['openSideModal', 'closeModal'])

const store = useInvoiceStore();
const invoices = computed(() => store.getInvoicesList().value)
const checkedStatus = computed(() => store.checkedStatus)
const invoiceCount = computed(() => store.filterByStatus(checkedStatus.value).length);

const isSideModalOpen = ref(false);

function openSideModal() {
  isSideModalOpen.value = true;
  console.log("new invoice modal")
}


function closeModal(e) {
  if (e) {
    if (
        !e.target.closest('form')
    ) {
      isSideModalOpen.value = false
      console.log("homeview close modal")
    }
  } else {
    isSideModalOpen.value = false
  }
}

</script>

<template>
  <Header @open-side-modal="openSideModal" :invoice-count="invoiceCount"/>
  <div v-if="invoiceCount" class="flex flex-col w-full h-fit gap-5">
    <WideCard
        v-for="invoice in store.filterByStatus(checkedStatus)"
        :invoice-i-d="invoice.id"
    />
  </div>
  <NoData v-else/>

  <div
      v-show="isSideModalOpen"
      class="overlay fixed left-28 top-0 z-50 w-screen h-screen bg-black bg-opacity-40"
      @click="closeModal"
  >
    <SideModal @close-modal="closeModal"/>
  </div>
</template>
