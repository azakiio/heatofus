<script setup lang="ts">
import { features } from "~/content/features";

const steps = [
  "Upload your files",
  "Customize behavior & appearance",
  "Embed on your website",
];
</script>

<template>
  <div class="justify-center">
    <section
      class="layout md:grid-cols-[2fr_1fr] gap-24 w-full content-center min-h-90vh"
    >
      <div>
        <h2 class="text-5xl font-bold mb-8">
          AI that understands your website, and your visitors
        </h2>
        <p class="text-lg font-medium text-black/75 mb-4">
          Build a custom chatbot, embed it on your website and let it handle
          customer support, lead generation, engage with your users, and more.
          
        </p>
        <NuxtLink
          class="btn bg-primary text-white w-fit"
          to="/auth/signup"
          size="xl"
          >Try Now!</NuxtLink
        >
      </div>
      <div>
        <div class="mb-4 font-medium text-xl text-primary">
          Three easy steps
        </div>

        <div class="grid grid-rows-[auto,auto,auto] gap-8">
          <div
            v-for="(step, i) in steps"
            class="flex items-center gap-2 font-bold"
          >
            <div
              class="bg-primary w-10 h-10 p-2 rounded-full grid place-items-center text-white"
            >
              {{ i + 1 }}
            </div>
            <span>{{ step }}</span>
          </div>
        </div>
      </div>
    </section>

    <section
      class="layout grid grid-cols-2 gap-16 md:grid-cols-3 place-content-center my-24"
    >
      <div v-for="feature in features" class="flex flex-col items-start gap-1">
        <Icon :name="feature.icon" class="w-8 h-8"></Icon>
        <h5 class="pt-1 text-lg font-medium">{{ feature.title }}</h5>
        <p class="text-sm font-normal text-zinc-700">
          {{ feature.description }}
        </p>
      </div>
    </section>
  </div>
</template>
