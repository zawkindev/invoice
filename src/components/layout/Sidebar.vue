<script setup>
import {useRouter} from "vue-router";
import {useInvoiceStore} from "../../stores/store.js";
import {ref} from "vue";

const props = defineProps(["isDarkTheme"]);
const themeIcons = ['../../assets/sun.svg', '../../assets/moon.svg']

const router = useRouter();
const store = useInvoiceStore()

const src = ref(themeIcons[store.isDarkTheme ? 0 : 1])

function toggleTheme() {
  store.isDarkTheme = !store.isDarkTheme
}


function navigateToHome() {
  router.push({
    name: "home",
  });
}
</script>

<template>
  <div class="fixed left-0 z-50 top-0 h-full dark:bg-bgDark">
    <div
        class="flex flex-col justify-between w-28 bg-dark1 h-full rounded-r-3xl"
    >
      <!--            src="../../assets/sun.svg"-->
      <img alt="icon" src="../../assets/icon.svg" @click="navigateToHome()"/>
      <div class="flex flex-col gap-8 items-center">
        <img v-if="store.isDarkTheme"
             @click="toggleTheme"
             class="h-6 w-5"
             alt="theme icon"
             src="../../assets/sun.svg"
        />
        <img
            v-else
            @click="toggleTheme"
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
