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
    {
      src: "/embed.js",
      chatbotId: "asst_AUtf2nABXi5Eqluniw9CAEiG",
      defer: true,
    },
  ],
  htmlAttrs: {
    "data-theme": "dark",
    class: "bg-bg text-fg scrollbars",
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
