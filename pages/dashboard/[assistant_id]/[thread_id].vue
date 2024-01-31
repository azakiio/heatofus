<script setup lang="ts">
import type { ThreadMessage } from "openai/resources/beta/threads/messages/messages";
import { marked } from "marked";
const { assistant_id, thread_id } = useRoute().params;

const chatBox = ref<HTMLDivElement>();

const message = ref("");
const runData = reactive<{
  runId: string;
  runStatus: string;
  messages: ThreadMessage[];
}>({ runId: "", runStatus: "", messages: [] });

const addMessage = async () => {
  const { run_id } = await $fetch("/api/threads/chat", {
    method: "post",
    body: {
      thread_id,
      assistant_id,
      message: message.value,
    },
  });
  runData.runId = run_id;
  refresh();
  checkStatus();
};

const deleteThread = async () => {
  await $fetch("/api/threads/delete", {
    query: {
      thread_id,
    },
  });
  navigateTo(`/dashboard/${assistant_id}`);
};

const {
  data: messages,
  refresh,
  status,
} = useLazyFetch("/api/threads/messages", {
  query: { thread_id },
});

watch(
  messages,
  () => {
    chatBox.value?.scrollTo({
      behavior: "smooth",
      left: 0,
      top: chatBox.value.scrollHeight,
    });
  },
  { flush: "post" }
);

const checkStatus = async () => {
  const { runStatus } = await $fetch("/api/assistant/checkrun", {
    query: {
      thread_id: thread_id,
      run_id: runData.runId,
    },
  });

  runData.runStatus = runStatus;
  if (runStatus === "in_progress") {
    console.log("still in progress, polling...");
    setTimeout(checkStatus, 1000);
  } else {
    refresh();
  }
};
</script>

<template>
  <div class="grid grid-rows-[1fr,auto] h-screen p-4 max-w-xl mx-auto gap-4">
    <div
      class="grid w-full content-start overflow-auto border-2 rounded-lg gap-4"
      ref="chatBox"
    >
      <div
        class="grid grid-cols-[2rem,auto] gap-4 p-2"
        v-for="item in messages"
      >
        <UIcon
          v-if="item.role === 'user'"
          name="i-mdi-account-circle"
          class="w-10 h-10"
        />
        <UIcon
          v-if="item.role === 'assistant'"
          name="i-mdi-assistant"
          class="w-10 h-10"
        />
        <div class="prose" v-html="marked.parse(item.content[0].text.value)" />
      </div>
    </div>

    <form
      @submit.prevent="addMessage"
      class="grid grid-cols-[1fr,auto] gap-4 w-full"
    >
      <UInput type="text" v-model="message" class="w-full" size="xl"></UInput>
      <UButton type="submit">Submit</UButton>
    </form>
  </div>

  <div class="fixed top-4 left-4 grid gap-4 justify-items-start">
    <UButton :to="`/dashboard`">Dashboard</UButton>
    <UButton :to="`/dashboard/${assistant_id}`">Conversations</UButton>
    <UButton @click="refresh">Refresg Messages</UButton>
    <UButton color="red" @click="deleteThread">Delete Conversation</UButton>
  </div>

  <div class="fixed bottom-4 left-4">
    <div>{{ assistant_id }}</div>
    <div class="mb-4">{{ thread_id }}</div>
    <div>run_id: {{ runData?.runId }}</div>
    <div>thread_state: {{ status }}</div>
    <div
      :class="{
        'text-yellow-500':
          runData.runStatus === 'in_progress' || runData.runStatus === 'queued',
        'text-green-500': runData.runStatus === 'completed',
        'text-red-500': runData.runStatus === 'failed',
      }"
    >
      status: {{ runData.runStatus }}
    </div>
  </div>
</template>
