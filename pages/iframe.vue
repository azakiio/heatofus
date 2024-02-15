<script setup lang="ts">
import { marked } from "marked";
definePageMeta({
  layout: "embed",
});

const { assistant_id } = useRoute().query;

const suggestions = [
  "What is Halbelf?",
  "How do I add data to my chatbot?",
  "Is there a free plan?",
  "What are some use cases?",
];

const chatBox = ref<HTMLDivElement>();

const message = ref("");
const runId = ref("");
const pending = ref(false);

const initialMessages = [
  "👋 Hi! I am elfAI, ask me anything about Halbelf!",
  "By the way, you can create a chatbot like me for your website! 😮",
];

const { data: thread, refresh: refreshThread } = await useAsyncData(
  async () => {
    const thread_id = await $fetch("/api/threads/create", {
      query: { assistant_id },
    });
    return thread_id;
  }
);

const addMessage = async () => {
  runId.value = await $fetch("/api/threads/chat", {
    method: "post",
    body: {
      thread_id: thread.value?.id,
      assistant_id,
      message: message.value,
    },
  });
  message.value = "";

  refresh();
  checkRunStatus();
};

const deleteThread = async () => {
  await $fetch("/api/threads/delete", {
    query: {
      thread_id: thread.value?.id,
    },
  });
  navigateTo(`/dashboard/${assistant_id}`);
};

const { data: messages, refresh } = await useLazyAsyncData(
  "messages",
  async () => {
    const data = await $fetch("/api/threads/messages", {
      query: { thread_id: thread.value?.id },
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
        thread_id: thread.value?.id,
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
</script>

<template>
  <div class="grid grid-rows-[auto_1fr_auto] h-screen">
    <div class="flex gap-2 items-center p-2">
      <div class="mr-auto text-xl font-medium">Halbelf</div>
      <button
        class="p-2 rounded-lg"
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
        id="closeChat"
        class="p-2 hover:bg-red hover:text-red-1 transition-colors rounded-lg"
        title="delete conversation"
      >
        <div class="i-mdi-close"></div>
      </button>
    </div>

    <div
      class="grid w-full content-start overflow-auto rounded-lg gap-4"
      ref="chatBox"
    >
      <div class="grid gap-2 px-2" v-for="item in initialMessages">
        <!-- <Icon name="i-mdi-assistant" class="w-8 h-8" /> -->
        <div
          class="bg-stone-200 p-2 rounded-lg w-fit mr-8 justify-self-start shadow-lg"
          v-html="marked.parse(item)"
        />
      </div>
      <div
        class="grid gap-2 px-2 auto-cols-auto"
        v-for="{ role, content } in messages"
      >
        <div
          class="p-2 rounded-lg w-fit"
          :class="{
            'mr-8 justify-self-start bg-stone-200': role === 'assistant',
            'ml-8 justify-self-end bg-green-500 c-white': role === 'user',
          }"
          v-html="marked.parse(content)"
        />
      </div>

      <div v-if="pending" class="grid grid-cols-[2rem_auto] gap-4 p-2">
        <Icon name="i-mdi-assistant" class="w-10 h-10" />
        <Icon name="line-md:loading-alt-loop" class="w-10 h-10" />
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
        v-for="item in suggestions"
        class="p-1 border rounded bg-stone-200 shadow"
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
        class="w-full border-none p-2 outline-none"
        placeholder="Message..."
      />
      <button class="btn" type="submit"><Icon name="mdi:send" /></button>
    </form>
  </div>
</template>

<style scoped>
.chatBox {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
