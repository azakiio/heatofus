<script setup lang="ts">
const models = ["gpt-4-turbo-preview", "gpt-3.5-turbo-1106"];

const inputs = useInputs();

const placeholder =
  "You are a customer support chatbot. Use your knowledge base to best respond to customer queries.";

const steps = [
  "Upload your files",
  "Customize behavior & appearance",
  "Embed on your website",
];
</script>

<template>
  <main class="grid p-8 place-content-center pb-24">
    <h1 class="text-3xl font-bold text-green-500 mb-12">Halbelf</h1>

    <div class="font-bold text-center text-4xl mb-8">
      {{ steps[1] }}
    </div>

    <form class="grid place-items-start mb-10 w-full max-w-xl mx-auto gap-8">
      <UFormGroup
        label="Instructions"
        hint="(optional)"
        class="w-full"
        size="xl"
      >
        <UTextarea
          v-model="inputs.instructions"
          name="instructions"
          :placeholder="placeholder"
          class="w-full"
        />
      </UFormGroup>
      <UFormGroup label="Model" size="xl">
        <USelectMenu v-model="inputs.model" :options="models" />
      </UFormGroup>
    </form>

    <div class="flex gap-4 items-center justify-center">
      <UButton size="xl" class="place-self-center" to="/">Back</UButton>
      <UButton size="xl" class="place-self-center" to="/3"
        >Next</UButton
      >
    </div>
  </main>
</template>

<style scoped>
main {
  font-family: "Satoshi";
}

#drop-area {
  @apply border-2 border-dashed border-green-500 mx-auto;
  border-radius: 20px;
  width: 480px;
  font-family: sans-serif;
  padding: 20px;
}
.button {
  display: inline-block;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.button:hover {
  background: #ddd;
}

#fileElem {
  display: none;
}
</style>
