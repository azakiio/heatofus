<script setup lang="ts">
const inputs = useInputs();

const steps = [
  "Upload your files",
  "Customize behavior & appearance",
  "Embed on your website",
];
import { iframeScript, bubbleScript } from "./scripts";
</script>

<template>
  <main class="grid p-8 place-content-center h-screen relative">
    <div class="font-bold text-center text-4xl mb-8">
      {{ steps[2] }}
    </div>
    <div
      class="grid w-full gap-4 border border-zinc-200 bg-white p-6 shadow-lg sm:rounded-lg dark:border-zinc-800 dark:bg-zinc-950 h-auto max-w-2xl overflow-y-auto lg:w-auto"
    >
      <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <p class="text-sm text-zinc-500">
          To add the chatbot any where on your website, add this iframe to your
          html code
        </p>
      </div>

      <code
        class="w-full overflow-auto rounded bg-zinc-100 p-2 text-xs whitespace-pre-line"
      >
        {{ iframeScript }}
      </code>

      <button
        class="justify-self-center inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 border border-zinc-200 bg-transparent shadow-sm hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-9 px-4 py-2"
      >
        Copy iframe
        <UIcon name="i-mdi-content-copy" />
      </button>

      <div class="mt-4">
        <p class="text-sm text-zinc-500">
          To add a chat bubble to the bottom right of your website add this
          script tag to your html
        </p>
      </div>

      <code
        class="w-full overflow-auto rounded bg-zinc-100 p-2 text-xs whitespace-pre-line"
      >
        {{ bubbleScript }}
      </code>

      <button
        class="justify-self-center inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 border border-zinc-200 bg-transparent shadow-sm hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-9 px-4 py-2"
      >
        Copy Script <UIcon name="i-mdi-content-copy" />
      </button>
    </div>
    <div class="flex gap-4 items-center justify-center mt-8">
      <UButton size="xl" class="place-self-center" to="/2">Back</UButton>
      <UButton size="xl" class="place-self-center" to="/try">Try</UButton>
    </div>
  </main>
</template>
