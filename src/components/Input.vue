<script setup>
import { ref } from "vue";

const props = defineProps({
  label: String,
  id: [String, Number],
});

const inputValue = ref("fa");
</script>

<template>
  <div class="flex flex-col font-semibold gap-2">
    <label class="text-light3" :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="inputValue"
      class="w-fit py-3 px-5 border border-light1 rounded font-semibold text-xl focus:border-secondary focus:outline-none"
      type="text"
      placeholder="asfasf"
    />
  </div>
</template>
