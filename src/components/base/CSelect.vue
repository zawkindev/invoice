<script setup>
import {ref} from "vue";


const props = defineProps(['label'])
// Define options based on the image content
const options = ref([
  {value: "net_1_day", label: "Net 1 Day"},
  {value: "net_7_days", label: "Net 7 Days"},
  {value: "net_14_days", label: "Net 14 Days"},
  {value: "net_30_days", label: "Net 30 Days"},
]);

const selectOption = (option) => {
  const optionIndex = options.value.findIndex(
      (el) => el.value === option.value,
  );

  selectedValue.value = options.value[optionIndex];
};

const selectedValue = ref(options.value[0]); // Initial value
const isSelectOpen = ref(false);
</script>

<template>
  <div class="cselect flex flex-col w-full relative gap-2">
    <p class="capitalize font-semibold  text-light3 dark:text-light1">{{ label }}</p>
    <div
        :class="{ 'border-light3': isSelectOpen }"
        @click.prevent="isSelectOpen = !isSelectOpen"
        class="relative w-full py-4 px-5 text-left font-normal border rounded-md shadow-sm dark:bg-dark1 dark:border-dark2 dark:text-white"
    >
      <div
          class="flex w-full items-center justify-between dark:bg-dark1 dark:border-dark2 dark:text-white"
      >
        <div
            class="truncate text-xl dark:bg-dark1 dark:border-dark2 dark:text-white"
        >
          {{ selectedValue.label }}
        </div>
        <svg
            class="ml-2 -mr-1 h-7 w-7 fill-primary"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill=""
        >
          <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
          />
        </svg>
      </div>
      <div
          v-if="isSelectOpen"
          class="absolute left-0 z-10 mt-8 w-full bg-white shadow-2xl rounded-lg ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none dark:bg-dark1 dark:border-dark2 dark:text-white"
      >
        <div
            v-for="option in options"
            :key="option.value"
            @click.prevent="selectOption(option)"
            class="cursor-pointer text-xl mb-[1px] px-5 py-4 border-b boder-b-light1 hover:bg-gray-100 dark:bg-dark2 dark:border-dark1 dark:hover:bg-dark1 dark:text-white"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>
