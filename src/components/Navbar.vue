<script setup>
import { ref } from "vue";

const props = defineProps(["isDarkTheme"])

console.log(props.isDarkTheme)

const isOpen = ref(false);
const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
  console.log(isOpen.value);
};
</script>

<template>
  <div class="fixed left-0 z-50 top-0 h-screen bg-bgDark">
    <div
      class="flex flex-col justify-between w-28 bg-dark1 h-full rounded-r-3xl"
    >
      <img alt="icon" src="../assets/icon.svg" @click="toggleSidebar()" />
      <div class="flex flex-col gap-8 items-center">
        <img v-if="props.isDarkTheme" @click="$emit('toggleTheme')" class="h-4 w-3" alt="theme icon" src="../assets/sun.svg" />
        <img v-else @click="$emit('toggleTheme')" class="h-4 w-3" alt="theme icon" src="../assets/moon.svg" />

        <div class="p-8 border-t borde4E6E]">
          <img
            class="w-full h-full rounded-full"
            alt="profile photo"
            src="../assets/profile.png"
          />
        </div>
      </div>
    </div>
  </div>
  <div
    v-show="isOpen"
    class="sidebar fixed left-28 top-0 z-50 w-screen h-screen bg-black bg-opacity-40"
  >
<div class="w-2/5 h-full bg-bgDark">
    </div>
  </div>
</template>
