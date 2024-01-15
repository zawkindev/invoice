<script setup>
import Navbar from "./components/Navbar.vue";
import playGround from "./playGround/playGround.vue";

import { ref } from "vue";

const isDarkTheme = ref(false);

function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value;
}
</script>

<template>
  <div
    :class="{'dark': isDarkTheme}"
    class="flex flex-col gap-10 h-screen w-screen justify-center items-center dark:bg-[#141625]"
  >
    <Navbar @toggle-theme="toggleTheme" :is-dark-theme="isDarkTheme" />
    <playGround />
  </div>
</template>
