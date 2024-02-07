<script setup>
import "@unocss/reset/tailwind-compat.css";
import "~/assets/css/styles.css";
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
