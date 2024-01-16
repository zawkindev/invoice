<script setup>
const props = defineProps({
  status: String,
});

function getClasses() {
  return {
    "bg-[#33D69F] text-[#33D69F]": props.status === "paid",
    "bg-[#FF8F00] fill-[#FF8F00] text-[#FF8F00]": props.status === "pending",
    "bg-white fill-white text-white dark:bg-dark3 dark:fill-dark3 dark:text-dark3":
      props.status === "draft",
  };
}
</script>

<template>
  <div
    :class="getClasses()"
    class="flex flex-row w-fit font-bold items-center gap-2 px-8 py-3 rounded-md bg-opacity-10"
  >
    <svg
      class="h-4 w-4"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        :class="getClasses()"
        id="Combined Shape"
        d="M5.81748 0.899658C3.10575 0.899658 0.899658 3.10618 0.899658 5.81792C0.899658 8.52966 3.10575 10.7362 5.81748 10.7362C8.52879 10.7362 10.7353 8.53009 10.7353 5.81792C10.7353 3.10575 8.52879 0.899658 5.81748 0.899658Z"
      />
    </svg>
    <p class="text-2xl capitalize">{{ status }}</p>
  </div>
</template>
