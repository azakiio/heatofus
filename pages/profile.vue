<script setup lang="ts">
import { plans } from "~/content/plans";
import type { Database } from "~/types/supabase";
definePageMeta({
  middleware: ["auth"],
});

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();
const { data } = await client
  .from("profiles")
  .select(
    "id, name, email, status, plan->product, cancel_at, current_period_start, current_period_end"
  )
  .eq("id", user.value?.id || "");

console.log(data);

const profile = ref(data?.at(0));
</script>

<template>
  <section class="layout flex flex-col place-content-start w-full gap-4">
    <div class="font-bold text-3xl text-center">Account</div>

    <div class="border-2 rounded-lg">
      <div class="p-4 text-3xl font-medium">
        You are on the
        {{ plans[profile?.product || "free"].name }} plan
      </div>
      <div class="p-4">
        <div
          class="flex items-center gap-1"
          v-for="feature in plans[profile?.product || 'free']?.features"
        >
          <Icon name="heroicons:check" class="c-green-600 w-6 h-6"></Icon>
          <div>{{ feature }}</div>
        </div>
      </div>
      <div class="bg-stone-200 p-4">
        <div>Status: {{ profile?.status || "No Subscription" }}</div>
        <div v-if="profile?.cancel_at">
          Subscription will be cancelled on:
          {{ new Date(profile?.cancel_at).toLocaleDateString() }}
        </div>
        <div v-else-if="profile?.status">
          Subscription Renewing on:
          {{ new Date(profile?.current_period_end).toLocaleDateString() }}
        </div>
        <NuxtLink
          :to="`https://billing.stripe.com/p/login/test_3csbJNcis5gyeC46oo?prefilled_email=${profile?.email}`"
          class="btn bg-dark c-light w-fit ml-auto"
          v-if="profile?.status === 'active'"
        >
          Manage Subscription
        </NuxtLink>
        <NuxtLink
          :to="`/pricing`"
          class="btn bg-dark c-light w-fit ml-auto"
          v-else
        >
          Subscribe!
        </NuxtLink>
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
        <div class="text-xl font-medium">{{ profile?.email }}</div>
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
