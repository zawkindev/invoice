<script setup>
import {computed, ref} from "vue";
import {useInvoiceStore} from "../stores/store";
import NoData from "../layout/NoData.vue";
import Header from "../layout/Header.vue";
import SideModal from "../components/modal/SideModal.vue";
import CModal from "../components/modal/CModal.vue";
import Card from "../components/common/Card.vue";

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
    <router-link :to="{name:'Invoice', params: {id: invoice.id}}"
                 v-for="invoice in store.filterByStatus(checkedStatus)">
      <Card
          class="cursor-pointer hover:bg-gray-100 dark:hover:bg-dark2"
          :invoice-i-d="invoice.id"
      />
    </router-link>
  </div>
  <NoData v-else/>

<!--  <CModal v-show="isSideModalOpen" class="left-28">-->
<!--        <SideModal @close-modal="closeModal"/>-->

<!--  </CModal>-->
<!--  -->
  <router-view>

  </router-view>
</template>
