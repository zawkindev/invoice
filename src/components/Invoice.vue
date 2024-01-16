<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Status from "./Status.vue";
import Button from "./Button.vue";

const props = defineProps({
  invoice: Object,
  editPage: Boolean,
});

const router = useRouter();

const invoice = ref(props.invoice);

function navigateTo() {
  router.push({
    name: "invoice",
    params: { id: invoice.value.id, invoice: invoice.date },
  });
}

function formattedDate() {
  const dateObject = new Date(invoice.value.date);
  const day = dateObject.getDate();
  const month = dateObject.toLocaleString("default", { month: "long" });
  const year = dateObject.getFullYear();

  return ` ${day} ${month.slice(0, 3)} ${year}`;
}
</script>

<template>
  <div
    class="flex flex-row justify-between items-center font-semibold w-full h-fit py-8 px-6 bg-white shadow-md rounded-lg dark:bg-dark1"
  >
    <div
      v-if="props.editPage"
      class="flex flex-row justify-between w-full items-center px-8"
    >
      <div class="flex flex-row items-center gap-10 w-fit">
        <p class="text-xl text-[#858BB2] dark:text-light1">Status</p>
        <Status :status="props.invoice.status" />
      </div>
      <div class="flex flex-row w-fit gap-5 items-center">
        <Button edit text="Edit" />
        <Button danger text="Delete" />
        <Button primary text="Mark as Paid" />
      </div>
    </div>
    <div v-else class="flex w-full">
      <div class="flex flex-row w-full items-center gap-10">
        <p class="text-3xl font-bold">
          <span class="text-light3 font-bold text-3xl">#</span>{{ invoice.id }}
        </p>
        <p class="text-xl text-light3 dark:text-light1">
          Due&nbsp;{{ formattedDate() }}
        </p>
        <p class="text-xl text-light3 dark:text-light1">
          {{ invoice.fullName }}
        </p>
      </div>
      <div
        v-show="!props.editPage"
        class="flex flex-row w-full items-center justify-end gap-8"
      >
        <p class="text-3xl font-bold">£&nbsp;{{ invoice.money }}</p>
        <div class="flex flex-row gap-5 items-center">
          <Status :status="invoice.status" />
          <img
            alt="arrow right"
            src="../assets/arrow-up.svg"
            class="h-4 w-4 cursor-pointer rotate-[270deg]"
            @click="navigateTo()"
          />
        </div>
      </div>
    </div>
  </div>
</template>
