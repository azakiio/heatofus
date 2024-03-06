<script setup lang="ts">
import { getScript } from "~/utils";
const { assistant_id } = useRoute().params;
const props = defineProps<{ iconColor: string }>();

const copyScript = () => {
  navigator.clipboard.writeText(getScript(assistant_id as string));
};
</script>

<template>
  <section>
    <div class="font-bold text-3xl mb-4">Embed on your website</div>
    <div
      class="grid w-full gap-8 border-2 p-6 shadow-lg sm:rounded-lg dark:border-zinc-800 dark:bg-zinc-950 h-auto max-w-3xl overflow-y-auto lg:w-auto"
    >
      <div class="flex flex-col gap-4">
        <div>
          <p class="text-sm opacity-75">
            To add a chat bubble to the bottom right of your website add this
            script tag to your html
          </p>
        </div>

        <code
          class="w-full overflow-auto rounded p-2 text-xs whitespace-pre-line bg-black/5"
        >
          {{ getScript(assistant_id as string) }}
        </code>

        <button
          @click="copyScript"
          class="btn bg-primary border self-center mt-a"
        >
          Copy Script <span class="i-mdi-content-copy" />
        </button>
      </div>
    </div>
  </section>
</template>
