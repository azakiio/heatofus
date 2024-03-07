<script setup lang="ts">
import { features } from "~/content/features";
</script>

<template>
  <!-- <section
    class="layout flex flex-col place-content-start w-full gap-4 max-w-7xl"
  > -->
  <section
    id="features"
    class="layout grid grid-cols-2 gap-16 md:grid-cols-3 place-content-center py-20 min-h-dvh"
  >
    <div v-for="feature in features" class="flex flex-col items-start gap-1">
      <Icon :name="feature.icon" class="w-8 h-8"></Icon>
      <h5 class="pt-1 text-lg font-medium">{{ feature.title }}</h5>
      <p class="text-sm font-normal text-fg/70">
        {{ feature.description }}
      </p>
    </div>
  </section>
</template>
