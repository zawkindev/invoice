<script setup>
import EmptyBox from "./components/EmptyBox.vue";
import Header from "./components/Header.vue";
import Navbar from "./components/Navbar.vue";
import playGround from "./playGround/playGround.vue";

import { ref } from "vue";

const isDarkTheme = ref(false);
const invoiceCount = ref(0);

function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value;
}
</script>

<template>
  <div 

    :class="{ dark: isDarkTheme }"
  >

  <div
    class="flex flex-col pt-20 gap-10 h-full min-h-screen w-screen items-center bg-bgLight dark:bg-bgDark dark:text-white"
  >
    <Navbar @toggle-theme="toggleTheme" :is-dark-theme="isDarkTheme" />
    <div class="flex flex-col items-center w-4/6 gap-20 overflow-visible">
      <Header :invoice-count="invoiceCount"  />
      <playGround v-if="invoiceCount" />
      <EmptyBox v-else />
    </div>
  </div>

  </div>
</template>
