<template>
  <section class="pb-32">
    <div class="xl:container mx-auto lg:px-16 md:px-8 px-4">
      <PopulationProfileAdvertisement v-show="$route.query.tab === 'anuncio'" />
      <PopulationProfilePlans v-show="$route.query.tab === 'plan'" /> 
    </div>
  </section>
</template>

<script setup>
  import { useUserStore } from '~/stores/User';
  definePageMeta({
    middleware: 'check-auth',
    layout: 'dashboard',
  });
  const user = useUserStore();
</script>

<style lang="postcss" scoped>
.profile-wrapper {
  @apply flex items-center justify-center gap-5 py-16 border-b border-gray-300 mb-10;
  & .profile-image img { @apply overflow-hidden w-[117px] h-[117px] rounded-full object-cover object-center border-4 border-secondary-100; }
  & h3 { @apply text-[28px] leading-[28px] font-semibold mb-4; }
}

.user-filter {
  @apply border-b border-gray-300 mb-10 flex md:overflow-hidden overflow-x-scroll;
  & .btn-tab {
    @apply flex-none mr-8 hover:text-primary-100 hover:border-b hover:border-primary-100 text-neutral-black text-base pb-2;
    &.active { @apply text-primary-100 border-b border-primary-100;}
  }
}
</style>