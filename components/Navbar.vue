<script setup lang="ts">
interface Link {
  label: string;
  href: string;
}

const links: Link[] = [
  { label: "Pricing", href: "/pricing" },
];

const user = useSupabaseUser();

const scrolledPast = ref(false);

const handleScroll = () => {
  scrolledPast.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    class="sticky top-0 border-b-2 border-transparent transition-all duration-500 bg-white z-10"
    :class="{
      'border-b-green shadow-lg': scrolledPast,
    }"
  >
    <div
      class="grid grid-flow-col auto-cols-fr p-2 items-center max-w-5xl mx-a h-full"
    >
      <NuxtLink to="/" class="c-green font-bold text-xl justify-self-start"
        >Halbelf</NuxtLink
      >
      <nav class="justify-self-center flex gap-4">
        <NuxtLink :to="link.href" v-for="link in links" class="link">{{
          link.label
        }}</NuxtLink>
      </nav>
      <div v-if="user?.id" class="flex gap-4 items-center justify-self-end">
        <NuxtLink
          to="/dashboard"
          class="btn p-2 rounded-full bg-transparent border"
          active-class="c-green"
        >
          <Icon name="ic:round-dashboard" class="h-6 w-6"
        /></NuxtLink>
        <NuxtLink
          class="btn p-2 rounded-full bg-transparent border"
          to="/profile"
          active-class="c-green"
          ><Icon name="mdi:account-circle" class="h-6 w-6"
        /></NuxtLink>
      </div>
      <div v-else class="flex gap-4 items-center justify-self-end">
        <NuxtLink to="/auth/login" class="link">Log in</NuxtLink>
        <NuxtLink to="/auth/signup" class="btn bg-fg c-bg px-2 py-1"
          >Try for Free</NuxtLink
        >
      </div>
    </div>
  </header>
</template>
