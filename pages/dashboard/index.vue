<script setup lang="ts">
const { data, refresh } = await useFetch("/api/assistant/list");
const { data: files, refresh: refreshFiles } = await useFetch(
  "/api/assistant/listFiles"
);

const deleteAssistant = async (assistant_id?: string) => {
  await $fetch("/api/assistant/delete", {
    query: {
      assistant_id: assistant_id,
    },
  });
  await refresh();
};

const deleteAssistantFile = async (assistant_id: string, file_id: string) => {
  await $fetch("/api/assistant/deleteFile", {
    query: {
      assistant_id,
      file_id,
    },
  });
  await refresh();
};

const deleteFile = async (file_id: string) => {
  await $fetch("/api/files/delete", {
    query: {
      file_id,
    },
  });
  refreshFiles();
};

const submit = async (e: Event) => {
  await $fetch("/api/assistant/upload", {
    method: "post",
    body: new FormData(e.currentTarget as HTMLFormElement),
  });
};
</script>

<template>
  <section class="layout">
    <div class="grid grid-cols-3 gap-6 place-content-start">
      <div
        v-for="assistant in data"
        :key="assistant.object_id || ''"
        class="flex flex-col gap-4 justify-items-start border-2 rounded-lg p-4"
      >
        <div class="flex items-center justify-between w-full">
          <NuxtLink class="link" :to="`/dashboard/${assistant.object_id}`">
            {{ assistant.name }}
          </NuxtLink>
          <button
            class="btn btn-red p-2 rounded-full"
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
            v-for="file_id in assistant.file_ids"
          >
            <div
              class="font-medium font-italic whitespace-nowrap overflow-hidden overflow-ellipsis"
            >
              {{
                files?.data.find((file) => file.id === file_id)?.filename ||
                file_id
              }}
            </div>
            <button
              class="aspect-square rounded-full grid place-content-center shadow"
              @click="
                () => deleteAssistantFile(assistant.object_id || '', file_id)
              "
            >
              <div class="i-mdi-close w-4 h-4 text-fg"></div>
            </button>
          </div>
        </div>

        <form @submit.prevent="submit" class="flex flex-col gap-2 items-center">
          <input
            name="assistant_id"
            type="hidden"
            :value="assistant.object_id"
          />
          <input name="file" type="file" class="input" />
          <button class="btn" type="submit">submit</button>
        </form>
      </div>
      <NuxtLink
        to="/create"
        class="link p-10 rounded-lg border-2 place-self-center"
      >
        Add Assistant
      </NuxtLink>
    </div>
  </section>
</template>
