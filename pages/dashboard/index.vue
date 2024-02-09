<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const { data: assistantList, refresh: refreshAssistants } = await useLazyFetch(
  "/api/assistant/list"
);
const { data: files, refresh: refreshFiles } = await useLazyFetch(
  "/api/files/list"
);

const deleteAssistant = async (assistant_id?: string) => {
  await $fetch("/api/assistant/delete", {
    query: {
      assistant_id: assistant_id,
    },
  });
  await refreshAssistants();
};

const deleteFile = async (assistant_id: string, file_id: string) => {
  await $fetch("/api/files/delete", {
    query: {
      assistant_id,
      file_id,
    },
  });
  await refreshFiles();
};

const submit = async (e: Event) => {
  await $fetch("/api/files/upload", {
    method: "post",
    body: new FormData(e.currentTarget as HTMLFormElement),
  });

  refreshFiles();
};

const createAssistant = async () => {
  const assistant = await $fetch("/api/assistant/create", { method: "post" });
  navigateTo(`/dashboard/${assistant.id}`);
};
</script>

<template>
  <section class="layout">
    <div class="grid grid-cols-3 gap-6 place-content-start">
      <div
        v-for="assistant in assistantList"
        :key="assistant.object_id || ''"
        class="flex flex-col gap-4 justify-items-start border-2 rounded-lg p-4"
      >
        <div class="flex items-center justify-between w-full">
          <NuxtLink class="link" :to="`/dashboard/${assistant.object_id}`">
            {{ assistant.name }}
          </NuxtLink>
          <button
            class="btn variant-red p-2 rounded-full"
            @click="deleteAssistant(assistant.object_id || '')"
          >
            <div class="i-mdi-delete"></div>
          </button>
        </div>
        <div>{{ assistant.instructions }}</div>
        <div class="bg-primary px-2 py-1 c-white rounded-lg w-fit text-sm">
          {{ assistant.model }}
        </div>
        <div class="grid gap-2 mt-auto">
          <div
            class="grid grid-cols-[1fr_2rem] items-center gap-4"
            v-for="file in files?.filter(
              (file) => file.assistant_id === assistant.object_id
            )"
          >
            <div
              class="font-medium font-italic whitespace-nowrap overflow-hidden overflow-ellipsis"
            >
              {{ file.name }}
            </div>
            <button
              class="aspect-square rounded-full grid place-content-center shadow"
              @click="
                () => {
                  if (file.assistant_id) {
                    deleteFile(file.assistant_id, file.object_id);
                  }
                }
              "
            >
              <div class="i-mdi-close w-4 h-4 text-fg"></div>
            </button>
          </div>
        </div>
      </div>
      <button
        @click="createAssistant"
        class="link p-10 rounded-lg border-2 place-self-center"
      >
        Add Assistant
      </button>
    </div>
  </section>
</template>
