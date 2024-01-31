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
    class="grid max-w-xl border-2 gap-2 p-4 rounded-lg mx-auto m-8"
  >
    <UInput v-model="email" type="email" placeholder="email" />
    <UInput v-model="password" type="password" placeholder="password" />
    <button>Sign In with E-Mail</button>
  </form>
</template>
