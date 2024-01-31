// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxtjs/supabase"],
  devtools: { enabled: true },
  routeRules: {
    "/api/consentForm": {
      cors: true,
    },
  },
  supabase: {
    redirect: false,
  },
  ui: {
    icons: ["mdi", 'svg-spinners'],
  },
  runtimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
});
