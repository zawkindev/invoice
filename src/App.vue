<script setup>
import { ref } from "vue";
import Navbar from "./components/Navbar.vue";

const isDarkTheme = ref(false);

function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value;
}
</script>

<template>
  <div :class="{ dark: isDarkTheme }">
    <div
      class="flex flex-col py-20 gap-10 h-full min-h-screen w-screen items-center bg-bgLight dark:bg-bgDark dark:text-white"
    >
      <div class="flex flex-col items-center w-3/6 gap-20 overflow-visible">
        <Navbar @toggle-theme="toggleTheme" :is-dark-theme="isDarkTheme" />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
