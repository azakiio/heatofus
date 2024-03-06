<script setup lang="ts">
const { assistant_id } = useRoute().params;
const { data: assistant, refresh } = await useFetch("/api/assistant/get", {
  query: { assistant_id },
});

const models = ["gpt-4-turbo-preview", "gpt-3.5-turbo-1106"];
const pending = ref(false);

const placeholder =
  "You are a customer support chatbot. Use your knowledge base to best respond to customer queries.";

const submit = async (e: Event) => {
  const formData = new FormData(e.currentTarget as HTMLFormElement);
  formData.append("assistant_id", assistant_id as string);

  pending.value = true;
  const data = await $fetch("/api/assistant/update", {
    method: "post",
    body: formData,
  });
  console.log(data);
  
  await refresh();
  pending.value = false;
};
</script>

<template>
  <section>
    <div class="font-bold text-3xl mb-4">Customize</div>

    <form
      class="grid place-items-start w-full max-w-2xl mx-auto gap-4 py-4 relative"
      @submit.prevent="submit"
    >
      <div class="w-full">
        <div class="font-medium">Name</div>
        <input
          :value="assistant?.name"
          name="name"
          placeholder="Customer Support Bot"
          class="input"
        />
      </div>
      <div class="w-full">
        <div class="font-medium">Instructions</div>
        <textarea
          :value="assistant?.instructions"
          name="instructions"
          rows="4"
          :placeholder="placeholder"
          class="input"
        />
      </div>

      <div class="w-full">
        <div class="font-medium">Model</div>
        <select
          name="model"
          :value="assistant?.model"
          class="p-2 border-2 rounded-lg bg-transparent"
        >
          <option v-for="option in models" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="w-full">
        <div class="font-medium">Initial Messages</div>
        <textarea
          :value="(assistant?.metadata as any)?.initialMessages"
          name="initialMessages"
          rows="4"
          placeholder="Hi! What can I help you with?"
          class="input"
        />
        <div class="opacity-75">Enter each message in a new line.</div>
      </div>

      <div class="w-full">
        <div class="font-medium">Suggestions</div>
        <textarea
          :value="(assistant?.metadata as any)?.suggestions"
          name="suggestions"
          rows="4"
          placeholder="What is example.com?"
          class="input"
        />
        <div class="opacity-75">Enter each message in a new line.</div>
      </div>

      <div class="w-full">
        <div class="font-medium">User Message Color</div>
        <input type="color" name="chatColor" :value="assistant?.chatColor" />
        {{ hexToHSL(assistant?.chatColor || "") }}
      </div>

      <div class="w-full">
        <div class="font-medium">Chat Icon Color</div>
        <input type="color" name="iconColor" :value="assistant?.iconColor" />
      </div>

      <!-- <div class="flex w-full flex-row items-center gap-4 py-3">
        <div
          class="h-14 w-14 rounded-full border border-zinc-300 bg-zinc-200"
        ></div>
        <div class="flex flex-col gap-1">
          <span class="mb-1 block text-sm font-medium text-zinc-700"
            >Profile Picture</span
          >
          <div class="flex flex-row items-center gap-2">
            <input
              id="bot_profile_picture"
              accept="image/*"
              class="hidden"
              type="file"
              name="bot_profile_picture"
            /><button
              class="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 border border-zinc-200 bg-transparent shadow-sm hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-7 rounded-md px-3 text-xs"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-upload mr-2 h-4 w-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" x2="12" y1="3" y2="15"></line>
              </svg>
              Upload image
            </button>
          </div>
          <span class="mt-1 text-xs"
            >Supports JPG, PNG, and SVG files up to 1MB</span
          >
        </div>
      </div> -->

      <button class="btn bg-primary" :disabled="pending">
        <div
          v-if="pending"
          class="i-eos-icons:three-dots-loading w-8 h-8"
        ></div>
        <div v-else>save</div>
      </button>
    </form>
  </section>
</template>
