<script setup lang="ts">
const total = ref(2531); // 3 * 840 = 2520 + 11
let lookup = new Map();

const cabinets = computed(() => {
  return [
    300,
    450,
    600,
    800,
    900,
    1200,
    Math.round(total.value / 10 / 2) * 10,
    Math.round(total.value / 10 / 3) * 10,
    Math.round(total.value / 10 / 4) * 10,
    Math.round(total.value / 10 / 5) * 10,
    Math.round(total.value / 10 / 6) * 10,
    Math.round(total.value / 10 / 7) * 10,
    Math.round(total.value / 10 / 8) * 10,
  ];
});

var items = cabinets.value.map((cabinet) => ({ w: cabinet, v: cabinet }));

console.log(knapsack(items, total.value));

const newSize = ref(0);

const getCombination = (total: number, size: number) => {
  return {
    size,
    whole: Math.floor(total / size),
    leftOver: total % size,
  };
};
</script>

<template>
  <div class="layout content-start">
    <div class="w-full mb-4">
      Total (in mm):
      <input v-model="total" class="input" />
    </div>
    <div class="grid gap-2">
      <div
        v-if="total"
        v-for="{ size, whole, leftOver } in cabinets
          .map((cabinet) => getCombination(total, cabinet))
          .sort((a, b) => {
            if (a.leftOver - b.leftOver !== 0) {
              return a.leftOver - b.leftOver;
            }
            return a.whole - b.whole;
          })
          .slice(0, 10)"
        class="grid grid-cols-2 grid-rows-2 border rounded-2 p-2 justify-items-end"
      >
        <div class="row-span-full place-self-center font-medium">
          {{ size }}
        </div>
        <div>{{ whole }} <Icon name="ri:box-2-line" /></div>
        <div>{{ leftOver }}mm <Icon name="tabler:space" /></div>
      </div>
      <form>
        <input v-model="newSize" />
        <button>+</button>
      </form>
    </div>
  </div>
</template>
