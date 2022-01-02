<script setup lang="ts">
const { data: binzData } = await useAsyncData('binz', () => $fetch('/api/binz'));
</script>

<template>
  <div v-for="binz in binzData" :key="binz.date">
    {{ binz.bin }} - {{ binz.day }} {{ binz.date }}
  </div>
</template>
