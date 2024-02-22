<script setup>
const dialog = ref();
</script>

<template>
  <dialog class="p-4 rounded-lg max-w-lg" ref="dialog">
    <div class="flex justify-between mb-4">
      <h1 class="font-bold text-xl">Cookie Preferences</h1>
      <button class="btn-circle" @click="dialog.close()">
        <Icon name="mdi:close" class="h-4 w-4" />
      </button>
    </div>
    <p class="my-4">
      We use cookies to improve your site experience. The "strictly necessary"
      cookies are required for Chatbase to function.
    </p>
    <div class="rounded-lg">
      <button
        class="flex gap-2 items-center p-2 font-bold border w-full rounded-lg"
      >
        <Icon
          name="mdi:check"
          class="bg-green-600 c-white rounded-md w-5 h-5 p-0.5"
        />Strictly Necessary cookies
      </button>
      <button
        class="flex gap-2 items-center p-2 font-bold border w-full rounded-lg"
      >
        <Icon
          name="mdi:check"
          class="bg-green-600 c-white rounded-md w-5 h-5 p-0.5"
        />Analytics cookies
      </button>
    </div>
  </dialog>
</template>
