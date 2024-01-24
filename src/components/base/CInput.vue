<script setup>
import {ref} from "vue";

const props = defineProps(['id', 'label', 'value', 'placeholder', 'inTable', 'type']);

const inputValue = ref(props.value);
</script>

<template>
  <div :class="{'max-w-fit':inTable}" class="flex flex-col flex-1 max-w-full font-semibold gap-2">
    <label class="capitalize text-light3 dark:text-light1" :for="id">{{ label }}</label>
    <input
        required
        :id="id"
        v-model="inputValue"
        :placeholder="placeholder"
        @input="$emit('inputValue', inputValue)"
        class="py-3 px-5 w-full border border-light1 rounded font-normal text-lg focus:border-secondary focus:outline-none dark:bg-dark1 dark:border-dark2 dark:text-white"
        :type="type||'text'"
    />
  </div>
</template>

<style scoped>
/* Apply styles to hide the number input spinner */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>