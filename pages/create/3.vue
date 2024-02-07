<script setup lang="ts">
import { iframeScript, bubbleScript } from "./scripts";
</script>

<template>
  <main class="layout content-center">
    <div class="font-bold text-center text-3xl mb-8">Embed on your website</div>
    <div
      class="grid grid-cols-2 w-full gap-8 border border-zinc-200 bg-white p-6 shadow-lg sm:rounded-lg dark:border-zinc-800 dark:bg-zinc-950 h-auto max-w-3xl overflow-y-auto lg:w-auto"
    >
      <div class="flex flex-col gap-4">
        <div class="-mb-2">
          <p class="text-sm text-zinc-500">
            To add the chatbot any where on your website, add this iframe to
            your html code
          </p>
        </div>

        <code
          class="w-full overflow-auto rounded bg-zinc-100 p-2 text-xs whitespace-pre-line"
        >
          {{ iframeScript }}
        </code>

        <button class="btn bg-white border self-center mt-a hover:bg-light">
          Copy iframe
          <span class="i-mdi-content-copy" />
        </button>
      </div>

      <div class="flex flex-col gap-4">
        <div class="-mb-2">
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

        <button class="btn bg-white border self-center hover:bg-light mt-a">
          Copy Script <span class="i-mdi-content-copy" />
        </button>
      </div>
    </div>
    <div class="flex gap-4 items-center justify-center mt-8">
      <NuxtLink size="xl" class="btn place-self-center" to="/create/2"
        >Back</NuxtLink
      >
      <NuxtLink size="xl" class="btn place-self-center" to="/create/try">Try</NuxtLink>
    </div>
  </main>
</template>
