<template>
  <section class="px-16 pb-16">
    <h3 class="md:mt-16 mt-8">Nuestros planes</h3>
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
    <div v-if="plans && !pending" class="container">
      <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <li v-for="plan in plans.results" :key="plan">
          <MoleculesPlanCard :plan="plan" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const config = useRuntimeConfig();

const { data:plans, pending } = useLazyFetch('generals/plans',{
  method: 'GET',
  baseURL: config.public.API
});
</script>

<style lang="postcss" scoped>
h3 {
  @apply font-semibold text-sm text-neutral-black md:text-[28px] md:leading-[42px] mb-5;
}
</style>