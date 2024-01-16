<script setup>
import { ref } from "vue";
import EmptyBox from "../components/EmptyBox.vue";
import Header from "../components/Header.vue";
import Invoice from "../components/Invoice.vue";
import Navbar from "../components/Navbar.vue";

// function generateID() {
//   const randomChars = Array.from({ length: 2 }, () =>
//     String.fromCharCode(Math.floor(Math.random() * 26) + 65),
//   );
//   const randomNumber = Math.floor(Math.random() * 9000) + 1000; // Ensure a 4-digit number
//
//   return randomChars.join("") + randomNumber.toString();
// }

const props = defineProps({
  isDarkTheme: Boolean,
  toggleTheme: Function,
  data: Array,
});

const invoiceCount = ref(props.data.length)

</script>

<template>
  <Navbar @toggle-theme="props.toggleTheme" :is-dark-theme="props.isDarkTheme" />
  <div class="flex flex-col items-center w-3/6 gap-20 overflow-visible">
    <Header :invoice-count="invoiceCount" />
    <div v-if="invoiceCount" class="flex flex-col w-full h-fit gap-5">
      <Invoice v-for="invoice in data" :invoice="invoice" />
    </div>
    <EmptyBox v-else />
  </div>
</template>
