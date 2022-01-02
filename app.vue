<script setup lang="ts">
import { isToday, isTomorrow, isFuture } from "date-fns";
const cols = {
  "Gelbe Tonne": "yellow",
  Biotonne: "green",
  Reststoff: "gray",
  "Blaue Tonne": "blue"
};

function createDate(str: string): Date {
  const [day, month, year] = str.split(".");
  return new Date(Number(year), Number(month) - 1, Number(day));
}

const { data: binzData } = await useAsyncData("binz", () =>
  $fetch("/api/binz")
);
const isMounted = ref(false);
const attributes = computed(() =>
  binzData.value.map((binDay) => {
    const [day, month, year] = binDay.date.split(".");
    return {
      key: binDay.date,
      highlight: cols[binDay.bin],
      dates: createDate(binDay.date),
      popover: {
        label: binDay.bin
      }
    };
  })
);
const nextBinComing = computed(() =>
  binzData.value.find(
    (binDay) =>
      isToday(createDate(binDay.date)) || isTomorrow(createDate(binDay.date))
  )
);
const nextBinComingColor = computed(() =>
  nextBinComing.value ? nextBinComing.value.bin : "#1a202c"
);
const nextBin = computed(() =>
  binzData.value.find((binDay) => isFuture(createDate(binDay.date)))
);

onMounted(() => {
  isMounted.value = true;
  attributes.value.push({
    key: "today",
    bar: "red",
    dates: new Date()
  });
});
</script>

<template>
  <main :style="`backgroundColor: ${nextBinComingColor}`">
    <h1>{{ nextBin.day }} - {{ nextBin.bin }}</h1>
    <div v-if="isMounted" class="calendar-container">
      <v-calendar :attributes="attributes" :first-day-of-week="2" is-dark />
    </div>
  </main>
</template>

<style scoped>
.calendar-container {
  display: flex;
  justify-content: center;
}
</style>
