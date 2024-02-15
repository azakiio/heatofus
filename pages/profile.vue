<script setup lang="ts">
import { plans } from "~/content/plans";
definePageMeta({
  middleware: ["auth"],
});

const client = useSupabaseClient();
const { data: stripe_user } = await useLazyFetch("/api/stripe/getUser");
</script>

<template>
  <section class="layout flex flex-col place-content-start w-full gap-4">
    <div class="font-bold text-3xl text-center">Account</div>

    <div class="border-2 rounded-lg">
      <div class="p-4 text-3xl font-medium">
        You are on the
        {{ plans[stripe_user?.product as keyof typeof plans]?.name }} plan
      </div>
      <div class="p-4">
        <div
          class="flex items-center gap-1"
          v-for="feature in plans[stripe_user?.product as keyof typeof plans]?.features"
        >
          <Icon name="heroicons:check" class="c-green-600 w-6 h-6"></Icon>
          <div>{{ feature }}</div>
        </div>
      </div>
      <div class="bg-stone-200 p-4">
        <div>Status: {{ stripe_user?.status }}</div>
        <div v-if="stripe_user?.cancel_at">
          Subscription will be cancelled on:
          {{ new Date(stripe_user?.cancel_at).toLocaleDateString() }}
        </div>
        <div v-else>
          Subscription Renewing on:
          {{ new Date(stripe_user?.current_period_end).toLocaleDateString() }}
        </div>
        <NuxtLink
          :to="`https://billing.stripe.com/p/login/test_3csbJNcis5gyeC46oo?prefilled_email=${stripe_user?.email}`"
          class="btn bg-dark c-light w-fit ml-auto"
          >Manage Subscription</NuxtLink
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
        <div class="text-xl font-medium">{{ stripe_user?.email }}</div>
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
