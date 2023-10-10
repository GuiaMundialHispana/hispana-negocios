<template>
  <section>
    <div v-if="pending" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div class="skeleton">
        <div class="skeleton-image"></div>
        <div class="skeleton-date"></div>
        <div class="skeleton-body"></div>
      </div>
      <div class="skeleton">
        <div class="skeleton-image"></div>
        <div class="skeleton-date"></div>
        <div class="skeleton-body"></div>
      </div>
      <div class="skeleton">
        <div class="skeleton-image"></div>
        <div class="skeleton-date"></div>
        <div class="skeleton-body"></div>
      </div>
    </div>
    <div v-if="!pending && data && data.results.length < 1 || data === null">
      <figure class="mb-4">
        <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
      </figure>
      <h6 class="text-4xl text-primary-100 font-bold mb-8 text-center">Aún no tienes <span class="text-primary-100">publicaciones favoritas.</span></h6>
      <p class="text-sm text-neutral-black text-center">¡No dejes pasar esta oportunidad de mostrar tu propiedad al mundo!</p>
    </div>
    <div v-if="!pending && data && data.results.length > 0">
      <h3 class="font-semibold text-sm text-black md:text-[28px] md:leading-[42px] mb-5">Mis Favoritos</h3>
      <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <li v-for="item in data.results" :key="item">
          <MoleculesVehicle
            :is-favorite="true"
            :property="item.property"
            :property-id="item.advertisement_id"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { useUserStore } from '~/stores/User';
let config = useRuntimeConfig();

const user_store = useUserStore();

const {data,pending} = useLazyFetch('users/favorites', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${user_store.token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  baseURL: config.public.API
});
</script>

<style lang="postcss" scoped>
.btn {
  @apply flex-grow justify-between border-2 hover:border-primary-100 text-neutral-black;
  & span { @apply w-6 h-6 flex items-center justify-center rounded-full font-medium text-sm bg-[#F5F5F5] text-[#ADADAD]; }
  &.active {
    @apply bg-neutral-transparent hover:text-neutral-black !important;
    & span { @apply text-primary-100 bg-secondary-100; }
  }
}

.skeleton {
  @apply border border-neutral-10 rounded-lg p-3;
  & .skeleton-image { @apply w-full md:h-72 h-[230px] bg-neutral-10 mb-3; }
  & .skeleton-date { @apply w-32 h-4 bg-neutral-10 mb-2; }
  & .skeleton-body { @apply w-4/5 h-4 bg-neutral-10; }
}
</style>