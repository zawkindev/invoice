<script setup>
const props = defineProps({
  primary: Boolean,
  edit: Boolean,
  save: Boolean,
  danger: Boolean,
  hasIcon: Boolean,
  text: String,
})

const getButtonClass = () => {
  return {
    'bg-primary text-white hover:opacity-70': props.primary,
    'bg-[#F9FAFE] text-light3 hover:bg-light1 dark:bg-dark2 dark:text-white dark:hover:text-gray-400 dark:hover:bg-light1 dark:hover:opacity-40 ': props.edit,
    'bg-save': props.save,
    'bg-danger1 text-white hover:bg-danger2': props.danger,
    'py-4 px-5': !props.hasIcon,
    'p-3 pr-5': props.hasIcon,
  };
};
</script>

<template>
  <button :class="getButtonClass()"
          class="flex text-xl flex-row gap-3 justify-center items-center font-semibold rounded-full">
    <img v-if="props.hasIcon" alt="button-icon" src="/src/assets/plus-icon.svg"/>
    {{ props.text }}
  </button>
</template>
