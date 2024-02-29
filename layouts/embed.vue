<script setup>
useHead({
  title: "Halbelf | Custom ChatGPT for your data",
  description:
    "Build an AI chatbot from your knowledge base and add it to your website",
  link: [{ rel: "icon", href: "/favicon.svg" }],
  script: [
    {
      src: "https://analytics.eu.umami.is/script.js",
      "data-website-id": "fa234224-a14f-41a8-8cc2-826fdc817f6f",
      defer: true,
    },
  ],
  htmlAttrs: {
    class: "bg-bg text-fg scrollbars",
  },
});
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
