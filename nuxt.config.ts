// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@unocss/nuxt", "@nuxtjs/supabase", 'nuxt-icon'],
  unocss: {
    safelist: ['i-heroicons:paint-brush', 'i-heroicons:tag']
  },
  routeRules: {
    "/api/consent": {
      cors: true,
    },
  },
  supabase: {
    redirect: false,
  },
  runtimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
});
