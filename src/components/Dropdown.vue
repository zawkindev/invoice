<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const options = ref([
  { name: "Draft", isChecked: false },
  { name: "Pending", isChecked: false },
  { name: "Paid", isChecked: false },
]);


function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function toggle(option) {
  const target = options.value.find((el) => el.name === option.name);
  target.isChecked = !target.isChecked;
}
</script>

<template>
  <div class="relative w-full px-10">
    <div
      @click="toggleDropdown"
      class="flex flex-row w-full gap-4 justify-center items-center hover:cursor-pointer"
    >
      <p class="font-bold text-2xl whitespace-nowrap">Filter by status</p>
      <img
        alt="dropwon icon"
        src="../assets/arrow-up.svg"
        :class="{ 'rotate-180': isOpen }"
        class="w-4 h-2 transition-all duration-300"
      />
    </div>
    <div
      v-show="isOpen"
      class="absolute left-0 top-12 bg-white w-full rounded-xl shadow-2xl dark:bg-dark2"
    >
      <div class="dropdown w-full flex flex-col p-6 gap-2">
        <div
          @click="toggle(option)"
          v-for="option in options"
          :key="option.name"
          class="flex flex-row items-center gap-4 hover:cursor-pointer"
        >
          <div
            :class="{
              'border-primary bg-primary dark:border-primary dark:bg-primary':
                option.isChecked,
            }"
            class="h-5 w-5 bg-light1 border-2 border-transparent rounded hover:border-primary dark:bg-dark1"
          >
            <img
              v-show="option.isChecked"
              alt="check icon"
              src="../assets/check.svg"
              class="w-full h-full p-[2px]"
            />
          </div>
          <p class="text-xl font-semibold select-none">{{ option.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
