<script setup>
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const Login = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (!error) {
    navigateTo("/dashboard");
  }

  errorMessage.value = error.message;
  return;
};

const signUpGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  console.log(data, error);
};
</script>

<template>
  <div class="layout max-w-sm content-center space-y-6">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-center text-2xl font-semibold tracking-tight">
        Welcome Back
      </h1>
    </div>
    <form class="flex flex-col gap-4" @submit.prevent="Login">
      <div class="space-y-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="email"
          >Email</label
        ><input
          class="input"
          id="email"
          aria-label="email"
          placeholder="name@example.com"
          autocapitalize="none"
          autocomplete="email"
          autocorrect="off"
          aria-invalid="false"
          type="email"
          name="email"
          v-model="email"
        />
      </div>
      <div class="space-y-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="password"
          >Password</label
        >
        <div class="relative flex items-center">
          <input
            class="input"
            id="password"
            required
            aria-label="password"
            placeholder="Password"
            autocapitalize="none"
            autocorrect="off"
            autocomplete="new-password"
            type="password"
            name="password"
            v-model="password"
          />
        </div>
      </div>
      <div v-if="errorMessage" class="text-sm text-red-700">
        {{ errorMessage }}
      </div>
      <a class="place-self-end link" type="button" href="/auth/password-reset"
        >Forgot password?</a
      >
      <button class="btn bg-primary" type="submit">Log in</button>
    </form>
    <div class="text-md flex justify-center">
      Don't have an account? &nbsp;<NuxtLink class="link" href="/auth/signup"
        >Sign up</NuxtLink
      >
    </div>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t"></span>
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="text-muted-foreground bg-bg px-2"
          >Or continue with</span
        >
      </div>
    </div>
    <button class="btn bg-fg c-bg" @click="signUpGoogle">
      <div class="i-logos-google-icon"></div>
      Google
    </button>
    <p class="text-muted-foreground px-8 text-center text-sm">
      By continuing, you agree to our
      <a class="hover:text-primary underline underline-offset-4" href="/terms"
        >Terms of Service</a
      >
      and
      <a class="hover:text-primary underline underline-offset-4" href="/privacy"
        >Privacy Policy</a
      >.
    </p>
  </div>
</template>
