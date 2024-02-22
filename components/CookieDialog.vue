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
    <div class="border rounded">
      <div>Strictly Necessary cookies</div>
      <div>Analytics cookeis</div>
    </div>
  </dialog>
</template>
