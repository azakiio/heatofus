<script setup>
const dialog = ref();
const consent = useCookie("consent");
</script>

<template>
  <dialog
    id="cookie-dialog"
    class="p-4 rounded-lg max-w-lg bg-bg c-fg"
    ref="dialog"
  >
    <div class="flex justify-between mb-4">
      <h1 class="font-bold text-xl">Cookie Preferences</h1>
      <button class="btn-circle p-1 shadow-none" @click="dialog.close()">
        <Icon name="mdi:close" class="h-5 w-5" />
      </button>
    </div>
    <p class="my-4">
      We use cookies to improve your site experience. The "strictly necessary"
      cookies are required for Chatbase to function.
    </p>
    <div class="rounded-lg border-2">
      <Accordion>
        <template #trigger>
          <div class="flex gap-2 items-center p-2 font-bold w-full">
            <Icon
              name="mdi:check"
              class="bg-primary c-bg rounded-md w-5 h-5 p-0.5"
            />Strictly Necessary cookies
          </div>
        </template>
        <p class="py-2">
          These are the cookies required for Halbelf to function.
        </p>
      </Accordion>
      <hr />
      <Accordion>
        <template #trigger>
          <div class="flex gap-2 items-center p-2 font-bold w-full">
            <Icon
              name="mdi:check"
              class="bg-primary c-bg rounded-md w-5 h-5 p-0.5"
            />Analytics cookies
          </div>
        </template>
        <div class="flex items-center gap-4">
          <Toggle v-model="consent" />
          <p class="py-2">
            We include analytics cookies to understand how you use our product
            and design better experiences.
          </p>
        </div>
      </Accordion>
    </div>
  </dialog>
</template>

<style>
dialog::backdrop {
  background-color: rgb(0, 0, 0, 0.5);
}
</style>
