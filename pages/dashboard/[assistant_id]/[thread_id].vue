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

const addMessage = async () => {
  runId.value = await $fetch("/api/threads/chat", {
    method: "post",
    body: {
      thread_id,
      assistant_id,
      message: message.value,
    },
  });

  refresh();
  checkRunStatus();
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

const { data: runStepData, refresh: checkRunStatus } = await useAsyncData(
  "status",
  async () => {
    pending.value = true;
    const { runStepData } = await $fetch("/api/assistant/checkrun", {
      query: {
        thread_id: thread_id,
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
  <div class="layout gap-4 w-full relative">
    <div
      class="flex gap-4 justify-items-start content-start absolute top-10 right-8"
    >
      <button
        class="p-2 hover:bg-red hover:text-red-1 transition-colors duration- rounded-lg"
        title="delete conversation"
        @click="deleteThread"
      >
        <div class="i-mdi-delete"></div>
      </button>
      <NuxtLink :to="`/dashboard/${assistant_id}`" class="link">back</NuxtLink>
    </div>
    <div class="grid grid-rows-[1fr_auto] gap-4">
      <div
        class="grid w-full content-start overflow-auto border-2 rounded-lg"
        ref="chatBox"
      >
        <div
          class="grid grid-cols-[2rem_auto] gap-4 p-2"
          v-for="item in messages"
        >
          <Icon
            v-if="item.role === 'user'"
            name="i-mdi-account-circle"
            class="w-8 h-8 mt-4"
          />
          <Icon
            v-if="item.role === 'assistant'"
            name="i-mdi-assistant"
            class="w-8 h-8 mt-4"
          />
          <div class="prose" v-html="marked.parse(item.content)" />
        </div>

        <div v-if="pending" class="grid grid-cols-[2rem_auto] gap-4 p-2">
          <Icon name="i-mdi-assistant" class="w-10 h-10" />
          <Icon name="line-md:loading-alt-loop" class="w-10 h-10" />
        </div>
      </div>

      <form
        @submit.prevent="addMessage"
        class="grid grid-cols-[1fr_auto] gap-4 w-full"
      >
        <input type="text" v-model="message" class="w-full input" />
        <button class="btn" type="submit">Submit</button>
      </form>
    </div>
  </div>

  <div class="fixed bottom-4 left-4">
    <div v-for="step in runStepData">
      <div>{{ step.status }}</div>
      <div>
        {{ step.type }}
      </div>
    </div>
  </div>
</template>
