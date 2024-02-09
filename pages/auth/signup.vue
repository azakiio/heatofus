<script setup>
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");

const signUp = async () => {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });

  if (!error) {
    navigateTo("/dashboard");
  }
  if (error) console.log(error);
};
</script>

<template>
  <div
    class="mx-auto flex max-w-sm flex-col justify-center space-y-6 justify-self-center"
  >
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-center text-2xl font-semibold tracking-tight">
        Get started for free
      </h1>
    </div>
    <form class="flex flex-col gap-4" @submit.prevent="signUp">
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
          aria-describedby=":r8:-form-item-description"
          aria-invalid="false"
          type="email"
          value=""
          name="email"
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
            aria-label="password"
            placeholder="Password"
            autocapitalize="none"
            autocorrect="off"
            autocomplete="new-password"
            type="password"
            value=""
            name="password"
          /><button
            type="button"
            aria-pressed="false"
            data-state="off"
            class="justify-center ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 dark:data-[state=on]:bg-zinc-800 dark:data-[state=on]:text-zinc-50 hover:bg-transparent text-zinc-500 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 data-[state=on]:bg-transparent data-[state=on]:text-zinc-700 px-3 absolute right-0 flex h-full items-center rounded-md bg-transparent text-base font-medium"
            aria-label="Show password"
          >
            <div class="i-mdi-eye"></div>
          </button>
        </div>
      </div>
      <button class="btn bg-fg c-bg" type="submit">Sign up</button>
    </form>
    <div class="text-md flex justify-center">
      Already have an account? &nbsp;<a class="link" href="/auth/signin"
        >Sign in</a
      >
    </div>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t"></span>
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="text-muted-foreground bg-white px-2"
          >Or continue with</span
        >
      </div>
    </div>
    <button class="btn bg-fg c-bg">
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
