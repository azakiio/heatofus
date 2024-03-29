<script setup lang="ts">
import { marked } from "marked";

definePageMeta({
  middleware: ["auth"],
});

const { assistant_id, thread_id } = useRoute().params;

const chatBox = ref<HTMLDivElement>();

const message = ref("");
const runId = ref("");
const pending = ref(false);

const { data: assistant } = await useAsyncData(async () => {
  const assistant = await $fetch("/api/assistant/get", {
    query: { assistant_id },
  });
  return assistant;
});

const scrollChat = () => {
  chatBox.value?.scrollTo({
    behavior: "smooth",
    left: 0,
    top: chatBox.value.scrollHeight,
  });
};

const addMessage = async () => {
  if (message.value) {
    pending.value = true;
    scrollChat();
    const runPromise = $fetch("/api/threads/chat", {
      method: "post",
      body: {
        thread_id,
        assistant_id,
        message: message.value,
      },
    });
    message.value = "";
    runId.value = await runPromise;

    await refresh();
    checkRunStatus();
  }
};

const deleteThread = async () => {
  await $fetch("/api/threads/delete", {
    query: {
      thread_id,
    },
  });
  navigateTo(`/dashboard/${assistant_id}`);
};

const { data: messages, refresh } = await useLazyAsyncData(
  "messages",
  async () => {
    const data = await $fetch("/api/threads/messages", {
      query: { thread_id },
    });
    return data;
  }
);

watch(messages, scrollChat, { flush: "post" });

const { data: runStepData, refresh: checkRunStatus } = await useAsyncData(
  "status",
  async () => {
    pending.value = true;
    const { runStepData } = await $fetch("/api/assistant/checkrun", {
      query: {
        assistant_id: assistant_id,
        thread_id: thread_id,
        run_id: runId.value,
      },
    });

    if (runStepData.status === "completed") {
      refresh();
      pending.value = false;
    } else {
      setTimeout(checkRunStatus, 2000);
    }
    return runStepData;
  },
  { immediate: false }
);
</script>

<template>
  <div class="layout">
    <div class="grid grid-rows-[1fr_auto] h-screen">
      <div
        class="grid w-full content-start overflow-auto rounded-lg gap-4 py-4"
        ref="chatBox"
      >
        <div
          class="grid gap-2 px-2"
          v-for="item in assistant?.initialMessages
            ?.replace(/\r\n/g, '\n')
            .split('\n')
            .filter((line) => line)"
        >
          <div
            class="bg-bg c-fg border p-2 rounded-lg w-fit mr-8 justify-self-start shadow-lg"
            v-html="item"
          />
        </div>
        <div
          class="grid gap-2 px-2 auto-cols-auto"
          v-for="{ role, content } in messages"
        >
          <div
            class="p-2 rounded-lg w-fit shadow-lg prose"
            :class="{
              'mr-8 justify-self-start border bg-bg c-fg': role === 'assistant',
              'ml-8 justify-self-end bg-primary text-color': role === 'user',
            }"
            v-html="marked.parse(content)"
          />
        </div>

        <div v-if="pending" class="grid p-2">
          <Icon name="eos-icons:three-dots-loading" class="w-10 h-10 c-stone" />
        </div>
      </div>

      <div class="flex gap-2 overflow-auto whitespace-nowrap p-2">
        <button
          @click="
            () => {
              message = item;
              addMessage();
            }
          "
          v-for="item in assistant?.suggestions
            ?.replace(/\r\n/g, '\n')
            .split('\n')
            .filter((line) => line)"
          class="p-1 rounded border bg-bg shadow"
        >
          {{ item }}
        </button>
      </div>

      <form
        @submit.prevent="addMessage"
        class="grid grid-cols-[1fr_auto] gap-4 w-full p-1"
      >
        <input
          type="text"
          v-model="message"
          class="w-full border-2 p-2 outline-none bg-transparent"
          placeholder="Message..."
        />
        <button class="btn" type="submit"><Icon name="mdi:send" /></button>
      </form>
    </div>
  </div>
</template>
