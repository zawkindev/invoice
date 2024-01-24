<script setup>
import {ref} from "vue";
import Sidebar from "./components/layout/Sidebar.vue";

const isDarkTheme = ref(true);

function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value;
}
</script>

<template>
  <div :class="{ dark: isDarkTheme }">
    <div
        class="flex flex-col py-16 gap-10 h-full min-h-screen w-screen items-center bg-bgLight dark:bg-bgDark dark:text-white"
    >
      <div class="flex flex-col items-center w-7/12 gap-20 overflow-visible">
        <Sidebar @toggle-theme="toggleTheme" :is-dark-theme="isDarkTheme"/>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
