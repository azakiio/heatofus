<script setup lang="ts">
const { data, refresh } = await useFetch("/api/assistant/list");
const { data: files, refresh: refreshFiles } = await useFetch(
  "/api/assistant/listFiles"
);

const deleteAssistant = async (assistant_id: string) => {
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

const createAssistant = async () => {
  await $fetch("/api/assistant/create", { method: "post" });
  await refresh();
};

const listThreads = async () => {
  await $fetch("/api/threads/list");
};

const submit = async (e: Event) => {
  await $fetch("/api/assistant/upload", {
    method: "post",
    body: new FormData(e.currentTarget as HTMLFormElement),
  });
};
</script>

<template>
  <UContainer>
    <div class="grid md:grid-cols-3 gap-10 py-10">
      <UCard
        v-for="assistant in data"
        :key="assistant.id"
        :ui="{ body: { base: 'grid gap-4 justify-items-start' } }"
      >
        <UButtonGroup>
          <UButton size="lg" :to="`/dashboard/${assistant.id}`">{{
            assistant.name
          }}</UButton>
          <UButton color="red" @click="deleteAssistant(assistant.id)"
            >DELETE</UButton
          >
        </UButtonGroup>
        <div>{{ assistant.instructions }}</div>
        <UBadge variant="outline">{{ assistant.model }}</UBadge>
        <div>
          <div v-for="file_id in assistant.file_ids">
            {{
              files?.data.find((file) => file.id === file_id)?.filename ||
              "not found"
            }}
            <UButton
              color="red"
              icon="i-mdi-delete"
              @click="() => deleteAssistantFile(assistant.id, file_id)"
            ></UButton>
          </div>
        </div>

        <form @submit.prevent="submit">
          <input name="assistant_id" type="hidden" :value="assistant.id" />
          <UInput name="file" type="file" variant="outline" />
          <UButton type="submit">submit</UButton>
        </form>
      </UCard>
    </div>
    <div class="flex gap-4 mt-12">
      <UButton @click="createAssistant">New Assistant</UButton>
      <UButton @click="listThreads">List Threads</UButton>
    </div>

    <div class="flex flex-col gap-2">
      <div v-for="file in files?.data" class="border-2">
        <div>
          {{ file.filename }}
        </div>
        <div>
          {{ file.id }}
        </div>
        <UButton @click="() => deleteFile(file.id)" icon="i-mdi-delete" />
      </div>
    </div>
  </UContainer>
</template>
