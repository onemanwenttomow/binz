<script setup lang="ts">
const props = defineProps({
  next4BinColors: {
    type: Array,
    default: ["#68d391", "#cbd5e0", "#63b3ed", "#f6e05e"]
  }
});
</script>

<template>
  <div class="logo-container">
    <div
      v-for="(color, i) in next4BinColors"
      :key="i"
      :style="`background-color: ${color}`"
    ></div>
  </div>
</template>
