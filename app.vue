<script setup>
import "@unocss/reset/tailwind-compat.css";
import "~/assets/css/styles.css";

useSeoMeta({
  title: "Halbelf | Custom ChatGPT for your data",
  description:
    "Build an AI chatbot from your knowledge base and add it to your website",
});

useHead({
  link: [{ rel: "icon", href: "favicon.svg" }],
  script: [
    {
      src: "https://analytics.eu.umami.is/script.js",
      "data-website-id": "fa234224-a14f-41a8-8cc2-826fdc817f6f",
      defer: true,
    },
  ],
  htmlAttrs: {
    "data-theme": "light",
    class: "bg-bg text-fg scrollbars",
  },
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
