<script setup>
import { useRouter } from 'vue-router';

const props = defineProps(["isDarkTheme"]);
const emit = defineEmits(["toggleTheme"]);

const router = useRouter()


function navigateToHome() {
  router.push({
    name: "home",
  });
}
</script>

<template>
  <div class="fixed left-0 z-50 top-0 h-screen dark:bg-bgDark">
    <div
      class="flex flex-col justify-between w-28 bg-dark1 h-full rounded-r-3xl"
    >
      <img alt="icon" src="../../assets/icon.svg" @click="navigateToHome()" />
      <div class="flex flex-col gap-8 items-center">
        <img
          v-if="props.isDarkTheme"
          @click="$emit('toggleTheme')"
          class="h-6 w-5"
          alt="theme icon"
          src="../../assets/sun.svg"
        />
        <img
          v-else
          @click="emit('toggleTheme')"
          class="h-6 w-5"
          alt="theme icon"
          src="../../assets/moon.svg"
        />

        <div class="p-8 border-t border-[#494E6E] rounded-br-2xl">
          <img
            class="w-full h-full rounded-full"
            alt="profile photo"
            src="../../assets/profile.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>
