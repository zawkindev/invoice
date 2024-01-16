<script setup>
import EmptyBox from "../components/EmptyBox.vue";
import Header from "../components/Header.vue";
import Navbar from "../components/Navbar.vue";
import playGround from "../playGround/playGround.vue";

const props = defineProps({
  isDarkTheme: Boolean,
  invoiceCount: Number,
  toggleTheme: Function,
});
</script>

<template>
  <Navbar @toggle-theme="toggleTheme" :is-dark-theme="isDarkTheme" />
  <div class="flex flex-col items-center w-4/6 gap-20 overflow-visible">
    <Header :invoice-count="invoiceCount" />
    <playGround v-if="invoiceCount" />
    <EmptyBox v-else />
  </div>
</template>
