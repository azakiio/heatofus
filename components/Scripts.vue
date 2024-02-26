<script setup lang="ts">
import { stripIndent } from "common-tags";
const { assistant_id } = useRoute().params;
</script>

<template>
  <section>
    <div class="font-bold text-3xl mb-4">Embed on your website</div>
    <div
      class="grid w-full gap-8 border border-zinc-200 bg-white p-6 shadow-lg sm:rounded-lg dark:border-zinc-800 dark:bg-zinc-950 h-auto max-w-3xl overflow-y-auto lg:w-auto"
    >
      <div class="flex flex-col gap-4">
        <div>
          <p class="text-sm text-zinc-500">
            To add a chat bubble to the bottom right of your website add this
            script tag to your html
          </p>
        </div>

        <code
          class="w-full overflow-auto rounded bg-zinc-100 p-2 text-xs whitespace-pre-line"
        >
          {{ stripIndent`
          <script
            src="https://www.halbelf.com/embed.js"
            chatbotId="${assistant_id}"
            defer
          ></script>
          `}}
        </code>

        <button class="btn bg-white border self-center hover:bg-light mt-a">
          Copy Script <span class="i-mdi-content-copy" />
        </button>
      </div>
    </div>
  </section>
</template>
