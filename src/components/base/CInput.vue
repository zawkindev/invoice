<script setup>
import { ref } from "vue";

const props = defineProps(['id','label','value', 'placeholder']);

const inputValue = ref("fa");
function
</script>

<template>
  <div class="flex flex-col font-semibold gap-2">
    <label class="text-light3 dark:text-light1" :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="inputValue"
      :placeholder="placeholder"
      class="w-72 py-3 px-5 border border-light1 rounded font-semibold text-xl focus:border-secondary focus:outline-none dark:bg-dark1 dark:border-dark2 dark:text-white"
      type="text"
      placeholder="asfasf"
    />
  </div>
</template>
