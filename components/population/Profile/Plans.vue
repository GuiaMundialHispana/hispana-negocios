<template>
  <section>
    <PopulationProfileUserPlans />
    <div class="mt-12">
      <h3>Nuestros planes</h3>
      <ul v-if="generalPlans && !pending1" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <li v-for="plan in generalPlans.results" :key="plan">
          <MoleculesPlanCard :plan="plan" />
        </li>
      </ul>
      <div v-if="pending1" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div class="border border-gray-10 rounded-lg p-6 relative">
          <div class="w-full h-10 skeleton rounded-lg mb-4"></div>
          <hr class="border-neutral-10 my-4">
          <div class="w-56 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-40 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-56 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-56 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-40 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-full h-8 skeleton rounded-lg mb-4"></div>
          <div class="w-full h-8 skeleton rounded-lg mb-4"></div>
        </div>
        <div class="border border-gray-10 rounded-lg p-6 relative">
          <div class="w-full h-10 skeleton rounded-lg mb-4"></div>
          <hr class="border-neutral-10 my-4">
          <div class="w-56 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-40 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-56 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-56 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-40 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-full h-8 skeleton rounded-lg mb-4"></div>
          <div class="w-full h-8 skeleton rounded-lg mb-4"></div>
        </div>
        <div class="border border-gray-10 rounded-lg p-6 relative">
          <div class="w-full h-10 skeleton rounded-lg mb-4"></div>
          <hr class="border-neutral-10 my-4">
          <div class="w-56 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-40 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-56 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-56 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-40 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-full h-8 skeleton rounded-lg mb-4"></div>
          <div class="w-full h-8 skeleton rounded-lg mb-4"></div>
        </div>
        <div class="border border-gray-10 rounded-lg p-6 relative">
          <div class="w-full h-10 skeleton rounded-lg mb-4"></div>
          <hr class="border-neutral-10 my-4">
          <div class="w-56 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-40 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-56 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-56 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-40 h-5 skeleton rounded-lg mb-4"></div>
          <div class="w-full h-8 skeleton rounded-lg mb-4"></div>
          <div class="w-full h-8 skeleton rounded-lg mb-4"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useUserStore } from '~/stores/User';

const config = useRuntimeConfig();
const user_store = useUserStore();

const { data:generalPlans, pending1 } = useLazyFetch('generals/plans',{
  method: 'GET',
  baseURL: config.public.API
});
</script>

<style lang="postcss" scoped>
.plan-category {
  @apply w-full rounded-lg text-neutral-white flex items-center h-10 font-semibold justify-center bg-primary-100;

  &.vip {
    background: linear-gradient(99.8deg, #FFAE10 -9.48%, #FFB800 45.36%, #FFD058 96.88%);
    @apply text-neutral-black;
  }
  &.silver { background: linear-gradient(104.59deg, #D9D9D9 8.17%, #ADADAD 51.17%, #FFFFFF 120.16%); }
  &.exclusive { background: linear-gradient(100.63deg, #000000 -6.24%, #2F1C1B 45.46%, #A89494 95.05%); }
}

h3 {
  @apply font-semibold text-sm text-neutral-black md:text-[28px] md:leading-[42px] mb-5;
}
</style>