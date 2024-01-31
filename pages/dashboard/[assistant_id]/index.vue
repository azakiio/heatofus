<script setup lang="ts">
const { assistant_id } = useRoute().params;

const { data } = await useFetch("/api/assistant/get", {
  query: {
    assistant_id,
  },
});

const {
  data: threadsCreate,
  execute: createThread,
  status,
} = await useFetch("/api/threads/create", { immediate: false });

const { data: threadList } = await useFetch("/api/threads/list");
</script>

<template>
  <UContainer class="flex flex-col h-screen">
    <div>Current Assistant: {{ data?.assistant_id }}</div>
    <UButton @click="createThread" class="self-start">Add Thread</UButton>

    <div class="grid gap-4 border-2">
      <ULink
        :to="`/dashboard/${assistant_id}/${thread.thread_id}`"
        v-for="thread in threadList"
        >{{ thread.thread_id }}</ULink
      >
    </div>
  </UContainer>
</template>
