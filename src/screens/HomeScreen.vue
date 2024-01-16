<script setup>
import EmptyBox from "../components/EmptyBox.vue";
import Header from "../components/Header.vue";
import Navbar from "../components/Navbar.vue";
import PlayGround from "../playGround/playGround.vue";

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
  invoiceCount: Number,
  toggleTheme: Function,
  data: Array,
});

</script>

<template>
  <Navbar @toggle-theme="toggleTheme" :is-dark-theme="isDarkTheme" />
  <div class="flex flex-col items-center w-4/6 gap-20 overflow-visible">
    <Header :invoice-count="invoiceCount" />
    <PlayGround v-if="invoiceCount" />
    <EmptyBox v-else />
  </div>
</template>
