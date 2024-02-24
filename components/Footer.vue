<script setup lang="ts">
const scrolledPast = ref(false);

const openModal = () => {
  document.querySelector("dialog")?.showModal();
};

const handleScroll = () => {
  scrolledPast.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="bg-primary z-10 shadow-inner">
    <div class="grid grid-flow-col auto-cols-fr max-w-5xl mx-auto p-8">
      <div class="flex flex-col gap-8 justify-self-start">
        <NuxtLink to="/" class="flex justify-self-start items-center gap-1">
          <Logo />
          <div class="font-bold text-xl">Halbelf</div>
        </NuxtLink>
        <div class="flex flex-col items-start gap-2">
          <NuxtLink to="/privacy" class="link"> Privacy Policy</NuxtLink>
          <NuxtLink class="link" to="/terms"> Terms of Service </NuxtLink>
          <button @click="openModal" class="link" to="/terms">
            Cookie Preferences
          </button>
        </div>
      </div>
      <div class="flex gap-4 justify-self-end h-fit">
        <NuxtLink to="/" class="btn-circle bg-transparent shadow-none">
          <Icon name="mdi:instagram" class="w-8 h-8" />
        </NuxtLink>
        <NuxtLink to="/" class="btn-circle bg-transparent shadow-none">
          <Icon name="mdi:linkedin" class="w-8 h-8" />
        </NuxtLink>
        <NuxtLink to="/" class="btn-circle bg-transparent shadow-none">
          <Icon name="mdi:twitter" class="w-8 h-8" />
        </NuxtLink>
      </div>
    </div>
    <div class="flex p-8 max-w-5xl mx-auto items-center gap-4">
      <button class="btn bg-fg text-bg">Contact Support</button>
      <NuxtLink class="link" to="mailto:support@halbelf.com"
        >support@halbelf.com</NuxtLink
      >
    </div>
    <CookieDialog />
  </div>
</template>
