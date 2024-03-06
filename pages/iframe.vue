<script setup lang="ts">
import { marked } from "marked";
definePageMeta({
  layout: "embed",
});

const { assistant_id, thread_id } = useRoute().query;

const threadRef = ref(thread_id);

onMounted(() => {
  if (!thread_id) {
    refreshThread();
  }
});

const chatBox = ref<HTMLDivElement>();

const message = ref("");
const runId = ref("");
const pending = ref(false);

const { data: thread, refresh: refreshThread } = await useAsyncData(
  async () => {
    const thread = await $fetch("/api/threads/create", {
      query: { assistant_id },
    });
    window.parent.postMessage({ thread_id: thread.id }, "*");
    threadRef.value = thread.id;
    return thread;
  },
  { immediate: false }
);

const { data: assistant } = await useAsyncData(async () => {
  const assistant = await $fetch("/api/assistant/get", {
    query: { assistant_id },
  });
  return assistant;
});

const addMessage = async () => {
  if (message.value) {
    const runPromise = $fetch("/api/threads/chat", {
      method: "post",
      body: {
        thread_id: threadRef.value,
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

const closeChat = async () => {
  window.parent.postMessage({ closeIframe: true }, "*");
};

const { data: messages, refresh } = await useLazyAsyncData(
  "messages",
  async () => {
    const data = await $fetch("/api/threads/messages", {
      query: { thread_id: threadRef.value },
    });
    return data;
  }
);

const scrollDown = () => {
  chatBox.value?.scrollTo({
    behavior: "smooth",
    left: 0,
    top: chatBox.value.scrollHeight,
  });
};

watch(messages, scrollDown, { flush: "post" });

const { data: runStepData, refresh: checkRunStatus } = await useAsyncData(
  "status",
  async () => {
    pending.value = true;
    const { runStepData } = await $fetch("/api/assistant/checkrun", {
      query: {
        assistant_id: assistant_id,
        thread_id: threadRef.value || thread.value?.id,
        run_id: runId.value,
      },
    });

    if (
      runStepData.length > 0 &&
      runStepData.every((step) => step.status === "completed")
    ) {
      refresh();
      pending.value = false;
    } else {
      setTimeout(checkRunStatus, 2000);
    }
    return runStepData;
  },
  { immediate: false }
);

const { h, onColor } = hexToHSL(assistant.value?.chatColor || "#3B81F6");

useHead({
  htmlAttrs: {
    style: `--p: oklch(from ${assistant.value?.chatColor} l c h);
    --bg: oklch(from ${assistant.value?.chatColor} 95% 0.005 h);
    --fg: oklch(from ${assistant.value?.chatColor} 15% 0.03 h);
    --text-color: ${onColor};`,
  },
});
</script>

<template>
  <div class="grid grid-rows-[auto_1fr_auto] h-screen">
    <div class="flex gap-2 items-center p-2">
      <div class="mr-auto text-xl font-medium">{{ assistant?.name }}</div>
      <button
        class="btn-circle"
        title="clear chat"
        @click="
          async () => {
            await refreshThread();
            refresh();
          }
        "
      >
        <div class="i-mdi-refresh"></div>
      </button>
      <button
        class="btn-circle bg-red text-white"
        title="Close Chat"
        @click="closeChat"
      >
        <div class="i-mdi-close"></div>
      </button>
    </div>

    <div
      class="grid w-full content-start overflow-auto rounded-lg gap-4 py-4"
      ref="chatBox"
    >
      <div
        class="grid gap-2 px-2"
        v-for="item in assistant?.initialMessages
          .replace(/\r\n/g, '\n')
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
          .replace(/\r\n/g, '\n')
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
        class="w-full border-none p-2 outline-none bg-transparent"
        placeholder="Message..."
      />
      <button class="btn" type="submit"><Icon name="mdi:send" /></button>
    </form>
  </div>
</template>

<style>
.text-color {
  color: var(--text-color);
}
</style>
