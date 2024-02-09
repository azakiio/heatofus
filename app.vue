<script setup>
import "@unocss/reset/tailwind-compat.css";
import "~/assets/css/styles.css";

useSeoMeta({
  title: "Halbelf | Custom ChatGPT for your data",
  description:
    "Build an AI chatbot from your knowledge base and add it to your website",
});
</script>

<template>
  <div class="wrapper">
    <Navbar />
    <NuxtPage />
  </div>
</template>

<style>
.wrapper {
  display: grid;
  grid-template-rows: 4rem minmax(calc(100vh - 4rem), 1fr);
  font-family: Satoshi;
}
</style>
