<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="layout grid-cols-2 gap-8 content-start w-full">
    <Customize />
    <Files />
    <Conversations />
    <Scripts />
  </div>
</template>
