<script setup>
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import Select from "../components/Select.vue";
import DatePicker from "../components/DatePicker.vue";
</script>

<template>
  <div id="playGround" class="flex flex-col justify-center items-center  gap-10 h-full w-full dark:bg-[#141625]">
    <Button primary has-icon text="Save as Draft" />
    <Input label="Street Address" />
    <Select />
    <DatePicker />
  </div>
</template>
