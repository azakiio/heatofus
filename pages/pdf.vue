<script setup>
const getPDF = async () => {
  const blob = await $fetch("/api/consentForm", {
    method: "post",
    body: { apotheke: "Hello", strasse: "hello strasse", plz: "67549" },
  });
  const url = URL.createObjectURL(blob);
  navigateTo(url, { open: { target: "_blank" } });
  return { url };
};
</script>

<template>
  <button @click="getPDF">Get PDF</button>
</template>
