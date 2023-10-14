<script setup>
import { useUserStore } from '~/stores/User';
import { usePostsStore } from '~/stores/Post';

const user_store = useUserStore();
const use_posts = usePostsStore();

// let plans = [];
let next = ref(false);
const config = useRuntimeConfig();

const { data:plans,pending } = await useLazyFetch('user-plans',{
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${user_store.token}`
  },
  baseURL: config.public.API
});

function send_plan(id,pictures) {
  use_posts.plan_id = id;
  use_posts.plan_pictures = pictures;
  next.value = true;
};
</script>

<template>
  <h4> Planes disponibles para esta publicación.</h4>
  <div v-if="pending" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-16">
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
  <ul v-if="plans && !pending" class="plans-list">
    <li v-for="plan in plans.results" :key="plan">
      <!-- {{ plan }} -->
      <MoleculesPlanCard
        class="h-full"
        @pay="send_plan"
        :plan="plan.plan"
        :user-quantity="plan.quantity"
      />
    </li>
  </ul>
  <div class="flex justify-center">
    <AtomsLink link-to="/plans" class="mx-auto my-6">Adquirir mas planes</AtomsLink>
  </div>
  <nav class="control-steps-PostBussines">
    <AtomsButtons @click="$emit('back')" btn-style="outline-primary">
      Atras
    </AtomsButtons>
    <AtomsButtons @click="$emit('nexts')" :disabled="!next">
      Continuar
    </AtomsButtons>
  </nav>
</template>

<style lang="postcss" scoped>
h4 { @apply font-semibold text-[28px] leading-[42px] mt-11 mb-14 text-center; }

.plans-list { @apply grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-16; }
</style>