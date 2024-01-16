<script setup>
import { ref, onMounted } from "vue";

const isOpen = ref(false);

const today = new Date();
const selectedYear = ref(today.getFullYear());
const selectedMonth = ref(today.getMonth());
const selectedDate = ref(today.getDate());

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const updateSelectedDate = (day) => {
  selectedDate.value = day;
  // You can emit an event or perform other actions with the selected date
  // For simplicity, we're just logging it here
  console.log(
    `${selectedYear.value}-${selectedMonth.value + 1}-${selectedDate.value}`,
  );
};

const getDaysInMonth = (year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

console.log(getDaysInMonth("1994", "1"));
console.log(new Date("2000", "1"));

const prevMonth = () => {
  if (selectedMonth.value > 0) {
    selectedMonth.value--;
  } else {
    selectedMonth.value = 11;
    selectedYear.value--;
  }
};

const nextMonth = () => {
  if (selectedMonth.value < 11) {
    selectedMonth.value++;
  } else {
    selectedMonth.value = 0;
    selectedYear.value++;
  }
};

onMounted(() => {
  // You can perform initial setup here
});
</script>

<template>
  <div
    class="w-72 relative date-picker p-4 border rounded-md dark:bg-dark1 dark:border-dark2 dark:text-white"
  >
    <div
      class="flex flex-row justify-between items-center selected-date text-xl font-semibold"
    >
      <p class="text-xl">
        {{ selectedDate }} {{ monthNames[selectedMonth].substring(0, 3) }}
        {{ selectedYear }}
      </p>
      <svg
        @click="isOpen = !isOpen"
        width="22"
        height="22"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.3334 2H14C15.1027 2 16 2.89734 16 4V14C16 15.1027 15.1027 16 14 16H2C0.897339 16 0 15.1027 0 14V4C0 2.89734 0.897339 2 2 2H2.66663V0.666626C2.66663 0.298706 2.96533 0 3.33337 0H4C4.36804 0 4.66663 0.298706 4.66663 0.666626V2H11.3334V0.666626C11.3334 0.298706 11.632 0 12 0H12.6666C13.0347 0 13.3334 0.298706 13.3334 0.666626V2ZM14 14.6666C14.3673 14.6666 14.6666 14.3673 14.6666 14V6.69336H1.33337V14C1.33337 14.3673 1.63269 14.6666 2 14.6666H14Z"
          fill="#7E88C3"
        />
      </svg>
    </div>
    <div
      v-show="isOpen"
      @focus="console.log('fadsff')"
      class="absolute left-0 z-10 mt-8 p-4 w-full bg-white shadow-2xl rounded-md overflow-auto dark:bg-dark1 dark:border-dark2 dark:text-white"
    >
      <div class="calendar flex items-center justify-between">
        <button @click="prevMonth">
          <svg
            width="11"
            height="16"
            viewBox="0 0 6 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.3418 0.88623L0.113895 5.11413L4.3418 9.34203"
              stroke="#7C5DFA"
              stroke-width="2"
            />
          </svg>
        </button>
        <div class="month-year text-xl font-semibold">
          {{ monthNames[selectedMonth].substring(0, 3) }} {{ selectedYear }}
        </div>
        <button @click="nextMonth">
          <svg
            width="11"
            height="16"
            viewBox="0 0 6 11"
            fill="#7C5DFA"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.11377 0.88623L5.34167 5.11413L1.11377 9.34203"
              stroke="#7C5DFA"
              stroke-width="2"
            />
          </svg>
        </button>
      </div>
      <div class="days grid grid-cols-7 gap-3 mt-4">
        <div
          v-for="day in getDaysInMonth(selectedYear, selectedMonth)"
          :key="day"
          @click="updateSelectedDate(day)"
          :class="{ 'text-primary': selectedDate === day }"
          class="day flex items-center justify-center text-lg font-semibold cursor-pointer"
        >
          {{ day }}
        </div>
      </div>
    </div>
  </div>
</template>
