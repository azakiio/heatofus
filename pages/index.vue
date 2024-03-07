<script setup lang="ts">
import bg from "~/assets/bg.png";

const steps = [
  "Upload your files",
  "Customize behavior & appearance",
  "Embed on your website",
];
</script>

<template>
  <div class="justify-center">
    <img
      id="hero-bg"
      class="absolute inset-0 h-screen w-full object-cover z-0"
      :src="bg"
    />
    <div
      class="absolute inset-0 h-screen w-full bg-gradient-to-b from-black/50 to-bg z-0"
      :src="bg"
    />
    <section
      class="layout md:grid-cols-[2fr_1fr] gap-24 w-full content-center min-h-90dvh z-10 relative"
    >
      <div>
        <h2 class="text-5xl font-bold mb-8">
          AI that understands your website, and your visitors
        </h2>
        <p class="text-lg font-medium text-fg/75 mb-4">
          Build a custom chatbot, embed it on your website and let it handle
          customer support, lead generation, engage with your users, and more.
        </p>
        <NuxtLink
          class="btn bg-primary text-bg w-fit"
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
  </div>

  <HomeDemo />
  <HomeFeatures />
  <HomePricing />
</template>

<style>
#hero-bg::after {
  content: "";
  display: block;
  background-color: rgb(0, 0, 0);
  width: 100vw;
  height: 100vh;
}
</style>
