<script setup lang="ts">
const dialog = ref<HTMLDialogElement>();
const consent = useCookie("consent");
const toggleRef = ref(consent.value === "accept");
watch(toggleRef, () => {
  if (toggleRef.value) {
    consent.value = "accept";
  } else {
    consent.value = "reject";
  }
});
</script>

<template>
  <dialog
    id="cookie-dialog"
    class="rounded-lg max-w-lg bg-bg c-fg shadow"
    ref="dialog"
    @click="
      (e) => {
        if (e.target === e.currentTarget) {
          dialog?.close();
        }
      }
    "
  >
    <div class="p-4">
      <div class="flex justify-between mb-4">
        <h1 class="font-bold text-xl">Cookie Preferences</h1>
        <button class="btn-circle p-1 shadow-none" @click="dialog?.close()">
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
              <template v-if="toggleRef">
                <Icon
                  name="mdi:check"
                  class="bg-primary c-bg rounded-md w-5 h-5 p-0.5"
                />
              </template>
              <template v-else>
                <Icon
                  name="mdi:close"
                  class="bg-fg c-bg rounded-md w-5 h-5 p-0.5"
                />
              </template>
              Analytics cookies
            </div>
          </template>
          <div class="flex items-center gap-4">
            <Toggle v-model="toggleRef" />
            <p class="py-2">
              We include analytics cookies to understand how you use our product
              and design better experiences.
            </p>
          </div>
        </Accordion>
      </div>
      <button class="btn bg-primary mt-4 mx-a" @click="dialog?.close()">
        Save Settings
      </button>
    </div>
  </dialog>
</template>

<style>
dialog[open] {
  opacity: 1;
  transform: translateY(0);
}

dialog {
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.5s allow-discrete;
}

@starting-style {
  dialog[open] {
    opacity: 0;
    transform: translateY(100%);
  }
}

dialog::backdrop {
  transition: all 0.5s allow-discrete;
}

dialog[open]::backdrop {
  background-color: hsl(from var(--bg) h s l / 75%);
  backdrop-filter: blur(5px);
}

@starting-style {
  dialog[open]::backdrop {
    background-color: hsl(from var(--bg) h s l / 0%);
  }
}
</style>
