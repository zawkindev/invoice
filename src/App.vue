<script setup>
import { ref } from "vue";
import HomeScreen from "./screens/HomeScreen.vue";

const data = ref([
  {
    id: "XM9141",
    date: "2006-04-22",
    fullName: "Alex Grim",
    money: 102.04,
    status: "pending",
  },
]);



const isDarkTheme = ref(false);
const invoiceCount = ref(0);

function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value;
}
</script>

<template>
  <div :class="{ dark: isDarkTheme }">
    <div
      class="flex flex-col pt-20 gap-10 h-full min-h-screen w-screen items-center bg-bgLight dark:bg-bgDark dark:text-white"
    >
      <HomeScreen
        :is-dark-theme="isDarkTheme"
        :invoice-count="invoiceCount"
        :toggle-theme="toggleTheme"
        :data="data"
      />
    </div>
  </div>
</template>
