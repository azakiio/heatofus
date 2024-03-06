<template>
  <section class="content-start">
    <div class="grid grid-cols-[auto_auto] justify-start gap-4">
      <div class="font-bold text-3xl mb-4">Chat Logs</div>
      <!-- <button
        class="btn p-0 w-10 h-10 rounded-full justify-center"
        @click="createThread"
      >
        +
      </button> -->
    </div>
    <div class="grid gap-4 max-h-lg overflow-auto">
      <div
        class="flex items-center justify-between border-2 p-2 rounded-lg"
        v-for="thread in threads"
      >
        <NuxtLink
          class="link w-fit"
          :to="`/dashboard/${assistant_id}/${thread.object_id}`"
          >{{ thread.name }}</NuxtLink
        >
        <button
          @click="() => deleteThread(thread.object_id)"
          class="btn rounded-full p-2"
        >
          <div class="i-mdi-delete"></div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { assistant_id } = useRoute().params;
const createThread = async () => {
  const thread = await $fetch("/api/threads/create", {
    query: {
      assistant_id,
    },
  });
  console.log(thread);
  navigateTo(`/dashboard/${assistant_id}/${thread.id}`);
};

const deleteThread = async (thread_id: string) => {
  await $fetch("/api/threads/delete", {
    query: {
      thread_id,
    },
  });
  refreshThreads();
};

const { data: threads, refresh: refreshThreads } = await useFetch(
  "/api/threads/list",
  {
    query: { assistant_id },
  }
);
</script>
