<script setup>
import {ref} from "vue";
import Sidebar from "./layout/Sidebar.vue";
import {useInvoiceStore} from "./stores/store.js";

const store = useInvoiceStore()

</script>

<template>
  <div :class="{ dark: store.isDarkTheme }">
    <div
        class="flex flex-col py-16 gap-10 h-full min-h-screen w-screen items-center bg-bgLight dark:bg-bgDark dark:text-white"
    >
      <div class="flex flex-col items-center w-7/12 gap-20 overflow-visible">
        <Sidebar/>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
