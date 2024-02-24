<script setup lang="ts">
interface Link {
  label: string;
  href: string;
}

const links: Link[] = [{ label: "Pricing", href: "/pricing" }];

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
    class="sticky top-0 border-b-2 border-transparent transition-all duration-500 bg-bg z-10"
    :class="{
      'border-b-primary shadow-lg': scrolledPast,
    }"
  >
    <div
      class="grid grid-flow-col auto-cols-fr p-2 items-center max-w-5xl mx-auto h-full"
    >
      <NuxtLink
        to="/"
        class="flex justify-self-start items-center gap-2 c-primary"
      >
        <Logo />
        <div class="font-bold text-xl">Halbelf</div>
      </NuxtLink>
      <div class="md:hidden">
        <Icon name="mdi:menu" />
      </div>
      <nav class="justify-self-center md:flex gap-4 hidden">
        <NuxtLink :to="link.href" v-for="link in links" class="link">{{
          link.label
        }}</NuxtLink>
      </nav>
      <div class="hidden md:flex gap-4 items-center justify-self-end">
        <template v-if="user?.id" :key="user?.id">
          <NuxtLink
            to="/dashboard"
            class="btn-circle shadow-none"
            active-class="c-primary"
          >
            <Icon name="ic:round-dashboard" class="h-6 w-6" />
          </NuxtLink>

          <NuxtLink
            class="btn-circle shadow-none"
            to="/profile"
            active-class="c-primary"
            ><Icon name="mdi:account-circle" class="h-6 w-6" /></NuxtLink
        ></template>
        <template v-else>
          <NuxtLink to="/auth/login" class="link">Log in</NuxtLink>
          <NuxtLink to="/auth/signup" class="btn bg-fg c-bg px-2 py-1"
            >Try for Free</NuxtLink
          >
        </template>
      </div>
    </div>
  </header>
</template>
