<script setup>
const props = defineProps({
  text: String,
  edit: Boolean,
  danger: Boolean,
  primary: Boolean,
  hasIcon: Boolean,
  addNewItem: Boolean,
  saveAsDraft: Boolean,
});

const getButtonClass = () => {
  return {
    "bg-primary text-white hover:opacity-70": props.primary,
    "bg-light0 px-8 text-light3 hover:bg-light1 dark:bg-dark2 dark:text-white dark:hover:text-gray-400 dark:hover:bg-light1 dark:hover:opacity-40 ":
      props.edit,
    "bg-dark3 text-light2 hover:bg-light4 dark:hover:bg-dark1":
      props.saveAsDraft,
    "bg-danger1 text-white hover:bg-danger2": props.danger,
    "py-4 px-5": !props.hasIcon,
    "p-3 pr-5": props.hasIcon,
    "bg-light0 text-light3 hover:bg-light1": props.addNewItem,
  };
};
</script>

<template>
  <button
    :class="getButtonClass()"
    class="flex w-full h-fit text-xl flex-row gap-3 justify-center items-center font-semibold rounded-full"
  >
    <img
      v-if="props.hasIcon"
      alt="button-icon"
      src="/src/assets/plus-icon.svg"
    />
    {{ props.text }}
  </button>
</template>
