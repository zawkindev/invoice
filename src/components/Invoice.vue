<script setup>
import { reactive } from "vue";
import Status from "./Status.vue";

const props = defineProps({
  invoice: Object,
});

const data = reactive(props.invoice);

function formattedDate(){
  const dateObject = new Date(data.date)
  const day = dateObject.getDate()
  const month = dateObject.toLocaleString('default', { month: 'long' });
  const year = dateObject.getFullYear()

  return ` ${day} ${month.slice(0,3)} ${year}`

}
</script>

<template>
  <div
    class="flex flex-row justify-between items-center font-semibold w-full h-fit py-8 px-6 bg-white shadow-md rounded-lg dark:bg-dark1"
  >
    <div class="flex flex-row w-full items-center gap-10">
      <p class="text-3xl font-bold">
        <span class="text-light3 font-bold text-3xl">#</span>{{ data.id }}
      </p>
      <p class="text-xl text-light3 dark:text-light1">Due&nbsp;{{formattedDate()}}</p>
      <p class="text-xl text-light3 dark:text-light1">{{ data.fullName }}</p>
    </div>
    <div class="flex flex-row w-full items-center justify-end gap-8">
      <p class="text-3xl font-bold">£&nbsp;{{ data.money }}</p>
      <div class="flex flex-row gap-5 items-center">
        <Status :status="data.status" />
        <img
          alt="arrow right"
          src="../assets/arrow-up.svg"
          class="h-4 w-4 cursor-pointer rotate-[270deg]"
          
        />
      </div>
    </div>
  </div>
</template>
