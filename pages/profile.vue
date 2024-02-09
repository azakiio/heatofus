<script setup>
import { plans } from "~/content/plans";
definePageMeta({
  middleware: ["auth"],
});

const client = useSupabaseClient();
const user = useSupabaseUser();
</script>

<template>
  <section class="layout flex flex-col place-content-start w-full gap-4">
    <div class="font-bold text-3xl text-center">Account</div>

    <div class="border-2 rounded-lg">
      <div class="p-4 text-3xl font-medium">
        You are on the {{ "free" }} plan
      </div>
      <div class="p-4">
        <div
          class="flex items-center gap-1"
          v-for="feature in plans.free.features"
        >
          <Icon name="heroicons:check" class="c-green-600 w-6 h-6"></Icon>
          <div>{{ feature }}</div>
        </div>
      </div>
      <div class="bg-stone-200 p-4">
        <NuxtLink to="/pricing" class="btn bg-dark c-light w-fit ml-auto"
          >Upgrade Plan</NuxtLink
        >
      </div>
    </div>

    <div class="border-2 rounded-lg">
      <div class="p-4 text-3xl font-medium">Usage</div>
      <div class="p-4">
        <div>Messages consumed: 0/20</div>
        <div>
          Your credits renew at the start of every calendar month. Next renewal:
          March 1st
        </div>
      </div>
    </div>

    <div class="border-2 rounded-lg">
      <div class="p-4 text-3xl font-medium">Your Email</div>
      <div class="p-4">
        <div class="text-xl font-medium">{{ user?.email }}</div>
      </div>
    </div>

    <button
      class="btn mt-a self-center"
      @click="
        async () => {
          await client.auth.signOut();
          navigateTo('/auth/login');
        }
      "
    >
      Log out
    </button>
  </section>
</template>
