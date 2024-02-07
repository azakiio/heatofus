<script setup lang="ts">
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");

const signInWithPassword = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (!error) {
    navigateTo("/");
  }
  if (error) console.log(error);
};
</script>
<template>
  <form
    @submit.prevent="signInWithPassword"
    class="layout w-full content-center max-w-lg"
  >
    <input v-model="email" type="email" placeholder="email" />
    <input v-model="password" type="password" placeholder="password" />
    <button class="btn justify-center">Sign In with E-Mail</button>
  </form>
</template>
