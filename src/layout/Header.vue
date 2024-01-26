<script setup>
import CButton from "../components/base/CButton.vue";
import Dropdown from "../components/common/Dropdown.vue";

const props = defineProps({
  editScreen: Boolean,
  invoiceCount: Number,
});
</script>

<template>
  <div class="w-full header flex flex-row justify-between items-center">
    <div class="flex flex-col text-left">
      <h1 class="text-7xl font-bold">Invoices</h1>
      <p v-if="invoiceCount" class="text-xl text-[#888EB0]">
        There are {{ invoiceCount }} total invoices
      </p>
      <p v-else class="text-xl text-[#888EB0]">No invoices</p>
    </div>
    <div class="flex flex-row h-fit items-center">
      <Dropdown />

      <CButton @click="$emit('openSideModal')" has-icon primary text="New Invoice" />
    </div>
  </div>
</template>
