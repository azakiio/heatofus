<script setup lang="ts">
import { plans } from "~/content/plans";
const user = useSupabaseUser();
const plansList = Object.values(plans);
const yearly = ref(false);
const getPaymentLink = (plan: any) => {
  if (user.value?.email) {
    return yearly
      ? `${plan.monthUrl}?prefilled_email=${user.value?.email}`
      : `${plan.yearUrl}?prefilled_email=${user.value?.email}`;
  } else {
    return "/auth/signup";
  }
};
</script>

<template>
  <section
    class="layout flex flex-col place-content-start w-full gap-4 max-w-7xl"
  >
    <div class="flex flex-col self-center items-center">
      <div class="font-bold text-3xl mb-6">Pricing Plans</div>
      <div class="font-medium">
        Get 2 months for free by subscribing yearly!
      </div>
      <div class="flex gap-4 p-4">
        <button
          class="btn"
          :class="{ 'bg-primary': yearly === false }"
          @click="yearly = false"
        >
          Monthly billing
        </button>
        <button
          class="btn"
          :class="{ 'bg-primary': yearly }"
          @click="yearly = true"
        >
          Yearly billing
        </button>
      </div>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="flex flex-col border-2 rounded-lg" v-for="plan in plansList">
        <div class="p-4 text-3xl font-bold">
          {{ plan.name }}
        </div>
        <div class="flex flex-col gap-2 p-4">
          <div
            class="flex items-start gap-1 text-sm font-semibold"
            v-for="feature in plan.features"
          >
            <Icon
              name="mdi:check"
              class="c-primary w-5 h-5 flex-shrink-0"
            ></Icon>
            <div>{{ feature }}</div>
          </div>
        </div>
        <div class="p-4 mt-auto self-center flex flex-col items-center">
          <div class="mb-2">
            <span class="text-3xl font-bold">
              {{ yearly ? plan.pricePerYear : plan.pricePerMonth }}/</span
            >
            <span class="text-lg font-medium">{{
              yearly ? "year" : "month"
            }}</span>
          </div>
          <NuxtLink :to="getPaymentLink(plan)" class="btn bg-dark c-light">
            {{ plan?.cta || "Subscribe" }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
