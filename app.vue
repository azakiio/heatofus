<script setup>
import "@unocss/reset/tailwind-compat.css";
import "~/assets/css/tailwind.css";

useSeoMeta({
  title: "Halbelf | Custom ChatGPT for your data",
  description:
    "Build an AI chatbot from your knowledge base and add it to your website",
});

useHead({
  link: [{ rel: "icon", href: "favicon.svg" }],
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
