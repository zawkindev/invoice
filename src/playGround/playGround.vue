<script setup>
import CButton from "../components/custom/CButton.vue";
import CInput from "../components/custom/CInput.vue";
import CSelect from "../components/custom/CSelect.vue";
import DatePicker from "../components/common/Dropdown.vue";
</script>

<template>
  <div
    id="playGround"
    class="flex flex-col justify-center items-center gap-10 h-full w-full dark:bg-[#141625]"
  >
    <CButton primary has-icon text="Save as Draft" />
    <CInput label="Street Address" />
    <CSelect />
    <DatePicker />
  </div>
</template>
