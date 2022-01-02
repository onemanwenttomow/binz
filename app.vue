<script setup lang="ts">
const { data: binzData } = await useAsyncData('binz', () => $fetch('/api/binz'));
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <div v-if="isMounted">
    <v-calendar is-expanded :attributes="binzData" />
  </div>
  <pre>{{ binzData }}</pre>
</template>
