<template>
  <div class="flex">
    <div
    class="w-4 h-4"
      v-for="hue in hues"
      :style="{ backgroundColor: `oklch(70% 0.125 ${hue})` }"
    ></div>
  </div>
</template>

<script setup>
const hues = range(0, 360, 10);
</script>
