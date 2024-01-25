<script setup>
const { data, error } = await useAsyncData(
  "pdf",
  async () => {
    const blob = await $fetch("/api/consentForm", {
      method: "post",
      body: { apotheke: "Hello", strasse: "hello strasse", plz: "67549" },
    });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    return { url };
  },
  { server: false }
);
</script>

<template>
  <div>{{ data?.url }}</div>
</template>
