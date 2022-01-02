<script setup lang="ts">
const { data: binzData } = await useAsyncData('binz', () => $fetch('/api/binz'));

const cols = {
  'Gelbe Tonne': 'yellow',
  Biotonne: 'green',
  Reststoff: 'gray',
  'Blaue Tonne': 'blue',
};
const isMounted = ref(false);
const attributes = ref([]);
onMounted(() => {
  isMounted.value = true;
  attributes.value = binzData.value.map((binDay, i) => {
    const [day, month, year] = binDay.date.split('.');
    const d = new Date(Number(year), Number(month) - 1, Number(day));
    console.log('daym month, year: ', day, month, year);
    console.log('d: ', d);
    return {
      key: i,
      highlight: cols[binDay.bin],
      dates: d,
    };
  });
});
</script>

<template>
  <div v-if="isMounted">
    <v-calendar :attributes="attributes" />
  </div>
  <pre>{{ binzData }}</pre>
</template>
