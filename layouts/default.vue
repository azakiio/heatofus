<script setup>
useSeoMeta({
  title: "Halbelf | Custom ChatGPT for your data",
  description:
    "Build an AI chatbot from your knowledge base and add it to your website",
});

useHead({
  script: [
    {
      src: "/embed.js",
      chatbotId: "asst_AUtf2nABXi5Eqluniw9CAEiG",
      defer: true,
    },
  ],
  bodyAttrs: {
    class: "bg-bg text-fg;",
  },
});
</script>

<template>
  <div class="wrapper">
    <Navbar />
    <NuxtPage />
    <Footer />
    <CookieConsent />
    <CookieDialog />
  </div>
</template>

<style>
.wrapper {
  display: grid;
  grid-template-rows: 4rem minmax(calc(100vh - 4rem), 1fr);
  font-family: Satoshi;
}
</style>
