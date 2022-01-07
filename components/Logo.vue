<script setup lang="ts">
const cssColors = {
  '#f6e05e': 'yellow',
  '#68d391': 'green',
  '#cbd5e0': 'gray',
  '#63b3ed': 'blue',
};
const props = defineProps({
  next4BinColors: {
    type: Array,
    default: ['#68d391', '#cbd5e0', '#63b3ed', '#f6e05e'],
  },
});
</script>

<template>
  <div class="logo-container">
    <div
      v-for="(color, i) in next4BinColors"
      :key="i"
      :style="`background-color: ${color}`"
      class="bin"
    >
      <div class="lid" :class="`${cssColors[color]}-lid`"></div>
    </div>
  </div>
</template>
