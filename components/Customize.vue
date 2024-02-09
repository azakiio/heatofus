<script setup lang="ts">
const { assistant_id } = useRoute().params;
const { data: assistant } = await useFetch("/api/assistant/get", {
  query: { assistant_id },
});

const models = ["gpt-4-turbo-preview", "gpt-3.5-turbo-1106"];

const placeholder =
  "You are a customer support chatbot. Use your knowledge base to best respond to customer queries.";

const submit = async (e: Event) => {
  const formData = new FormData(e.currentTarget);
  formData.append("assistant_id", assistant_id as string);
  const data = await $fetch("/api/assistant/update", {
    method: "post",
    body: formData,
  });

  console.log(data);
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
        <select name="model" :value="assistant?.model" class="p-2 border-2 rounded-lg">
          <option v-for="option in models" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <button class="btn btn-blue absolute right-0 bottom-4">save</button>
    </form>
  </section>
</template>
