<script setup>
import { ref, computed } from "vue";

// Define options based on the image content
const options = ref([
  { value: "net_1_day", label: "Net 1 Day" },
  { value: "net_7_days", label: "Net 7 Days" },
  { value: "net_14_days", label: "Net 14 Days" },
  { value: "net_30_days", label: "Net 30 Days" },
]);

const selectOption = (option) => {
  const optionIndex = options.value.findIndex(
    (el) => el.value === option.value,
  );

  selectedValue.value = options.value[optionIndex];
};

const selectedValue = ref(options.value[0]); // Initial value
const isOpen = ref(false);
</script>

<template>
  <button
    :class="{ 'border-light3': isOpen }"
    @click="isOpen = !isOpen"
    class="relative min-w-56 w-fit py-4 px-5 text-left font-semibold border rounded-md shadow-sm"
  >
    <div class="flex w-full items-center justify-between">
      <div class="truncate">{{ selectedValue.label }}</div>
      <svg
        class="ml-2 -mr-1 h-5 w-5 fill-primary"
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
      v-show="isOpen"
      class="absolute left-0 z-10 mt-8 w-full bg-white shadow-2xl rounded-md ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
    >
      <div
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="cursor-pointer hover:bg-gray-100 px-5 py-4 border-b boder-b-light1"
      >
        {{ option.label }}
      </div>
    </div>
  </button>
</template>
