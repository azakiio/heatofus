<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
const { assistant_id } = useRoute().params;
</script>

<template>
  <div class="layout grid-cols-2 gap-8 content-start w-full">
    <Customize />
    <Files />
    <Conversations />
    <Script />
  </div>
</template>
