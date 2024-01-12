<script setup>
import Button from "./components/Button.vue";
import Input from "./components/Input.vue";
</script>

<template>
  <div class="flex flex-col gap-10 h-screen w-screen p-40">
    <Button save-as-draft text="Save as Draft" />
      <Input label="Street Address"/>

  </div>
</template>

