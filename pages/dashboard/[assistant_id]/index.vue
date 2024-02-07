<script setup lang="ts">
const { assistant_id } = useRoute().params;

const { execute: createThread } = await useFetch("/api/threads/create", {
  immediate: false,
});

const { data: threadList } = await useFetch("/api/threads/list");
</script>

<template>
  <div class="layout content-start">
    <div class="grid gap-4 border-2">
      <NuxtLink
        class="link"
        :to="`/dashboard/${assistant_id}/${thread.object_id}`"
        v-for="thread in threadList"
        >{{ thread.object_id }}</NuxtLink
      >
    </div>

    <button
      class="btn p-0 w-10 h-10 rounded-full justify-center"
      @click="() => createThread()"
    >
      +
    </button>
  </div>
</template>
