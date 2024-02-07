<script setup lang="ts">
const inputs = useInputs();
const models = ["gpt-4-turbo-preview", "gpt-3.5-turbo-1106"];

const placeholder =
  "You are a customer support chatbot. Use your knowledge base to best respond to customer queries.";
</script>

<template>
  <main class="grid content-center">
    <div class="font-bold text-center text-4xl mb-8">
      Customize behavior & appearance
    </div>

    <form class="grid place-items-start mb-10 w-full max-w-lg mx-auto gap-8">
      <div class="w-full">
        <div class="font-medium">Instructions</div>
        <textarea
          v-model="inputs.instructions"
          name="instructions"
          rows="4"
          :placeholder="placeholder"
          class="input"
        />
      </div>
      <div class="w-full">
        <div class="font-medium">Model</div>
        <select v-model="inputs.model" class="p-2 border-2 rounded-lg">
          <option v-for="option in models" :value="option">{{ option }}</option>
        </select>
      </div>
    </form>

    <div class="flex gap-4 items-center justify-center">
      <NuxtLink class="place-self-center btn" to="/create">Back</NuxtLink>
      <NuxtLink class="place-self-center btn btn-green" to="/create/3">Next</NuxtLink>
    </div>
  </main>
</template>
