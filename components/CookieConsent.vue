<script setup lang="ts">
const consent = useCookie("consent", { default: () => "unset" });
</script>

<template>
  <div
    v-if="consent === 'unset'"
    class="fixed bottom-4 left-4 z-50 mr-4 flex max-w-sm flex-col gap-3 rounded-lg border bg-white p-5 shadow-sm"
  >
    <p class="text-sm text-zinc-900">
      This site uses cookies to measure and improve your experience.
    </p>
    <div class="flex flex-row items-center justify-between">
      <div class="flex flex-row items-center gap-3">
        <button
          class="btn border bg-transparent h-7 rounded-md px-3"
          type="button"
          @click="consent = 'reject'"
        >
          Reject</button
        ><button
          class="btn border bg-transparent h-7 rounded-md px-3"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:r3:"
          data-state="closed"
        >
          Details
        </button>
      </div>
      <button
        class="btn bg-zinc-900 text-zinc-50 h-7 rounded-md px-3 w-32"
        type="button"
        @click="consent = 'accept'"
      >
        Accept
      </button>
    </div>
  </div>
</template>
