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
  const formData = new FormData(e.currentTarget);
  formData.append("assistant_id", assistant_id as string);

  pending.value = true;
  const data = await $fetch("/api/assistant/update", {
    method: "post",
    body: formData,
  });
  console.log(data);
  refresh();
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
          class="p-2 border-2 rounded-lg"
        >
          <option v-for="option in models" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="w-full">
        <div class="font-medium">Initial Messages</div>
        <textarea
          :value="(assistant?.metadata as any).initialMessages"
          name="initialMessages"
          rows="4"
          :placeholder="placeholder"
          class="input"
        />
      </div>

      <div class="w-full">
        <div class="font-medium">Suggestions</div>
        <textarea
          :value="(assistant?.metadata as any).suggestions"
          name="suggestions"
          rows="4"
          :placeholder="placeholder"
          class="input"
        />
      </div>
      <button class="btn variant-blue" :disabled="pending">
        <div
          v-if="pending"
          class="i-eos-icons:three-dots-loading w-8 h-8"
        ></div>
        <div v-else>save</div>
      </button>
    </form>
  </section>
</template>
