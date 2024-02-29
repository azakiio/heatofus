<script setup lang="ts">
interface Link {
  label: string;
  href: string;
}

const links: Link[] = [
  { label: "Demo", href: "/demo" },
  { label: "Pricing", href: "/pricing" },
];

const user = useSupabaseUser();

const scrolledPast = ref(false);
const isMenuOpen = ref(false);

const handleScroll = () => {
  scrolledPast.value = window.scrollY > 20;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    class="sticky top-0 border-b-2 border-transparent transition-all duration-500 z-99"
    :class="{
      'border-b-primary shadow-lg bg-bg': scrolledPast,
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

      <div class="md:hidden justify-self-end">
        <button class="btn-circle" @click="toggleMenu">
          <Icon name="mdi:menu" class="w-6 h-6" />
        </button>
        <div
          class="fixed right-0 top-4rem bg-bg p-4 border-2"
          :style="{
            translate: `${isMenuOpen ? '0%' : '100%'}`,
            transition: 'translate, 0.5s',
          }"
        >
          <div class="flex flex-col gap-4 items-start">
            <NuxtLink :to="link.href" v-for="link in links" class="link">
              {{ link.label }}
            </NuxtLink>
            <div class="flex">
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
                >
                  <Icon name="mdi:account-circle" class="h-6 w-6" />
                </NuxtLink>
              </template>
              <template v-else>
                <NuxtLink to="/auth/login" class="link">Log in</NuxtLink>
                <NuxtLink to="/auth/signup" class="btn bg-fg c-bg px-2 py-1">
                  Try for Free
                </NuxtLink>
              </template>
            </div>
          </div>
        </div>
      </div>

      <nav class="justify-self-center md:flex gap-4 hidden">
        <NuxtLink :to="link.href" v-for="link in links" class="link">
          {{ link.label }}
        </NuxtLink>
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
          >
            <Icon name="mdi:account-circle" class="h-6 w-6" />
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink to="/auth/login" class="link">Log in</NuxtLink>
          <NuxtLink to="/auth/signup" class="btn bg-fg c-bg px-2 py-1">
            Try for Free
          </NuxtLink>
        </template>
      </div>
    </div>
  </header>
</template>
