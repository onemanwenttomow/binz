<script setup lang="ts">
import { isToday, isTomorrow, isFuture } from 'date-fns';
const cols = {
  'Gelbe Tonne': 'yellow',
  Biotonne: 'green',
  Reststoff: 'gray',
  'Blaue Tonne': 'blue',
};

function createDate(str: string): Date {
  const [day, month, year] = str.split('.');
  return new Date(Number(year), Number(month) - 1, Number(day));
}

const { data: binzData } = await useAsyncData('binz', () => $fetch('/api/binz'));
const isMounted = ref(false);
const attributes = computed(() =>
  binzData.value.map((binDay) => {
    const [day, month, year] = binDay.date.split('.');
    return {
      key: binDay.date,
      highlight: cols[binDay.bin],
      dates: createDate(binDay.date),
    };
  }),
);
const nextBinComing = computed(() =>
  binzData.value.find(
    (binDay) => isToday(createDate(binDay.date)) || isTomorrow(createDate(binDay.date)),
  ),
);
const nextBinComingColor = computed(() =>
  nextBinComing.value ? nextBinComing.value.bin : 'white',
);
const nextBin = computed(() => binzData.value.find((binDay) => isFuture(createDate(binDay.date))));

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <main>
    <h1 style="text-align: center">{{ nextBin.day }} - {{ nextBin.bin }}</h1>
    <div v-if="isMounted" style="display: flex; justify-content: center">
      <v-calendar :attributes="attributes" />
    </div>
  </main>
</template>

<style>
html,
body,
main,
#__nuxt {
  height: 100%;
}

* {
  margin: 0;
}

h1 {
  padding: 24px 0;
}

main {
  background-color: v-bind(nextBinComingColor);
}
</style>
