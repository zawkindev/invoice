<script setup>
import {useRoute, useRouter} from "vue-router";
import {formatDate, generateID} from "../../utils/helper";
import {useInvoiceStore} from "../../stores/store.js";
import Badge from "./Badge.vue";

const props = defineProps({
  invoiceID: String,
  editPage: Boolean,
});

const store = useInvoiceStore()

const emit = defineEmits(['deleteInvoice', 'markAsPaid', "markAsPending", "saveInvoice"])

const router = useRouter();
const route = useRoute()

const invoice = store.getInvoice(props.invoiceID);
const currentId = route.params.id;

function deleteInvoice() {
  console.log("deleted invoice: ", invoice.id)
  store.deleteInvoice(invoice.id)
  router.push({
    name: "Home",
  });
}


</script>

<template>
  <slot>
    <router-link :to="{name:'Invoice', params: {id: invoice.id}}">
      <div
          class="flex flex-row justify-between items-center  w-full h-fit py-8 px-8 bg-white shadow-md rounded-lg  dark:bg-dark1"
      >
        <!--  IF  -->

        <!--  ELSE   -->
        <div class="flex justify-between w-full">
          <div class="flex flex-row w-full items-center justify-start gap-10">
            <p class="text-xl font-bold">
              <span class="text-light3 font-bold text-3xl">#</span>{{ invoice.id }}
            </p>
            <p class="text-lg text-light3 dark:text-light1">
              Due&nbsp;{{ formatDate(invoice.date) }}
            </p>
            <p class="text-lg">
              {{ invoice.fullName }}
            </p>
          </div>
          <div
              class="flex flex-row w-full items-center justify-end gap-8"
          >
            <p class="text-2xl font-bold">£&nbsp;{{ invoice.amount }}</p>
            <div class="flex flex-row gap-3 items-center">
              <Badge :status="invoice.status"/>
              <img
                  alt="arrow right"
                  src="../../assets/arrow-up.svg"
                  class="h-4 w-4 cursor-pointer rotate-[270deg]"
              />
            </div>
          </div>
        </div>
      </div>
    </router-link>

  </slot>
</template>
