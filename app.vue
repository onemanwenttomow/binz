<script setup lang="ts">
import { isToday, isTomorrow, isFuture } from 'date-fns';
const cols = {
  'Gelbe Tonne': 'yellow',
  Biotonne: 'green',
  Reststoff: 'gray',
  'Blaue Tonne': 'blue',
};

const cssColors = {
  'Gelbe Tonne': '#f6e05e',
  Biotonne: '#68d391',
  Reststoff: '#cbd5e0',
  'Blaue Tonne': '#63b3ed',
  '#1a202c': '#1a202c',
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
      popover: {
        label: binDay.bin,
      },
    };
  }),
);
const nextBinComing = computed(() =>
  binzData.value.find(
    (binDay) => isToday(createDate(binDay.date)) || isTomorrow(createDate(binDay.date)),
  ),
);
const nextBinComingColor = computed(() =>
  nextBinComing.value ? nextBinComing.value.bin : '#1a202c',
);
const nextBin = computed(() => binzData.value.find((binDay) => isFuture(createDate(binDay.date))));
const cssColor = computed(() => cssColors[nextBinComingColor.value]);

onMounted(() => {
  isMounted.value = true;
  attributes.value.push({
    key: 'today',
    bar: 'red',
    dates: new Date(),
  });
});

useMeta({
  meta: [{ name: 'theme-color', content: cssColor }],
});
</script>

<template>
  <main :style="`backgroundColor: ${cssColor}`">
    <h1>
      {{ nextBin.day }} -
      <span :style="`background-color: ${cssColor}; color: #1a202c; padding: 0 4px;`">{{
        nextBin.bin
      }}</span>
    </h1>
    <div class="calendar-container">
      <v-calendar v-if="isMounted" :attributes="attributes" :first-day-of-week="2" is-dark />
    </div>
  </main>
</template>
