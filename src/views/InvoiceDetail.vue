<script setup>
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useInvoiceStore} from "../stores/store.js";
import {formatDate, formatMoney} from "../utils/helper.js";
import WideCard from "../components/common/Card.vue";
import CTable from "../components/base/CTable.vue";
import {cloneDeep} from "lodash";
import Card from "../components/common/Card.vue";
import CButton from "../components/base/CButton.vue";
import Badge from "../components/common/Badge.vue";
import SideModal from "../components/modal/SideModal.vue";
import DeleteModal from "../components/modal/DeleteModal.vue";
import CModal from "../components/modal/CModal.vue";
import CInput from "../components/base/CInput.vue";
import DatePicker from "../components/common/DatePicker.vue";
import CSelect from "../components/base/CSelect.vue";


const store = useInvoiceStore();
const router = useRouter();
const route = useRoute()
const invoice = computed(() => store.getInvoice(route.params.id))

const isSideModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

function openSideModal() {
  isSideModalOpen.value = true;
  router.push({
    name: "SideModal",
    params: {id: route.params.id},
  });
}

function openDeleteModal() {
  isDeleteModalOpen.value = true
}

function closeModal(e) {
  if (e) {
    if (
        !e.target.closest('form')
    ) {
      isSideModalOpen.value = false;
      isDeleteModalOpen.value = false;
    }

  } else if (route.fullPath.includes("/edit")) {
    // router.push(id: route.params.id)
  }
}

function goBack() {
  router.push({
    name: "Home",
  });
}

function changeItems(itemsList) {
  invoice.items = itemsList
}


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
    <!--    <WideCard @mark-as-paid="store.markAs(invoice.id,'paid')" @mark-as-pending="store.markAs(invoice.id,'pending')"-->
    <!--              edit-page :invoice-i-d="invoice.id"/>-->

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


    <CModal
        v-show="isSideModalOpen"
        class="left-28"
    >
      <SideModal @close-modal="closeModal" :invoice-i-d="invoice.id" in-edit-view="true">
        <div class="flex flex-col h-fit gap-12 overflow-visible ">
          <p class="text-3xl font-bold">
            <span class="text-light3 font-bold text-3xl">#</span>{{ invoice.id }}
          </p>
          <div id="bill-from" class="flex flex-col w-full gap-6">
            <p class="font-bold text-primary">Bill From</p>
            <CInput label="Street Address" :value="invoice.seller.address"
                    @input-value="(value)=>invoice.seller.address=value"/>
            <div class="flex gap-6 w-full h-fit">
              <CInput label="City" :value="invoice.seller.city"
                      @input-value="(value)=>invoice.seller.city=value"/>
              <CInput label="Post Code" :value="invoice.seller.postalCode"
                      @input-value="(value)=>invoice.seller.postalCode=value"/>
              <CInput label="Country" :value="invoice.seller.country"
                      @input-value="(value)=>invoice.seller.country=value"/>
            </div>
          </div>

          <div id="bill-to" class="flex flex-col w-full gap-6">
            <p class="font-bold text-primary">Bill To</p>
            <CInput label="Name" :value="invoice.fullName"
                    @input-value="(value)=>invoice.fullName=value"/>
            <CInput type="email" label="Client's email" :value="invoice.email"
                    @input-value="(value)=>invoice.email=value"/>
            <CInput label="Street Address" :value="invoice.buyer.address"
                    @input-value="(value)=>invoice.buyer.address=value"/>
            <div class="flex gap-6 w-full h-fit">
              <CInput label="City" :value="invoice.buyer.city"
                      @input-value="(value)=>invoice.buyer.city=value"/>
              <CInput label="Post Code" :value="invoice.buyer.postalCode"
                      @input-value="(value)=>invoice.buyer.postalCode=value"/>
              <CInput label="Country" :value="invoice.buyer.country"
                      @input-value="(value)=>invoice.buyer.country=value"/>
            </div>

            <div class="flex gap-6 w-full h-fit">
              <DatePicker @select-date="updateDate" label="Invoice date"/>
              <CSelect @click="(e)=>e.preventDefault()" label="Payment Terms"/>
            </div>
            <CInput label="Project Description" :value="invoice.serviceType"
                    @input-value="(value)=>invoice.serviceType=value"/>


            <div id="bill-from" class="flex flex-col w-full gap-6">
              <p class="font-bold text-primary">Item list</p>
              <CTable :invoice="invoice" @change-items="changeitems" in-edit-view="true" in-modal="true"
                      :invoiceID="invoice.id"/>
            </div>
          </div>
        </div>
      </SideModal>
    </CModal>
    <CModal
        v-show="isDeleteModalOpen"
        class="flex justify-center items-center left-0"
    >
      <DeleteModal
          :invoice-i-d="invoice.id"
          @close-modal="closeModal"
          @delete-invoice="deleteInvoice"
      />
    </CModal>

  </div>
</template>
