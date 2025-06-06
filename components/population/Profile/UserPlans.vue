<template>
  <section>
    <h3>Mis planes disponibles</h3>
    <ul v-if="plans && !pending" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <li v-if="plans.results.length <= 0" class="border border-gray-10 rounded-lg p-6 flex flex-col justify-center items-center">
        <div class="bg-primary-100 text-neutral-white text-center w-full text-sm rounded-lg py-1">
          Actualmente tienes el <b>plan Basico</b>
        </div>
      </li>
      <li v-for="plan in plans.results" :key="plan" class="border border-gray-10 rounded-lg p-6">
        <span class="plan-category"
          :class="{
            'vip': plan.plan.name === 'VIP',
            'exclusive': plan.plan.name === 'EXCLUSIVO',
            'silver': plan.plan.name === 'SILVER',
            '': plan.plan.name === 'DESTACADOS'
          }"
        >
          {{ plan.plan.name }}
        </span>
        <div class="bg-primary-100 text-neutral-white text-center w-full text-sm rounded-lg mt-4 py-1" v-if="plan.quantity > 0">
          Cantidad disponible: <b>{{ plan.quantity }}</b>
        </div>
        <NuxtLink to="plans" class=" block bg-primary-100 text-neutral-white text-center w-full text-sm rounded-lg mt-4 py-1" v-else>
          plan agotado, <b>Compra mas ahora!</b>
        </NuxtLink>
      </li>
    </ul>
    <div v-if="pending" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div class="border border-gray-10 rounded-lg p-6 relative">
        <div class="w-full h-10 skeleton rounded-lg mb-4"></div>
        <hr class="border-neutral-10 my-4">
        <div class="w-full h-5 skeleton rounded-lg"></div>
      </div>
      <div class="border border-gray-10 rounded-lg p-6 relative">
        <div class="w-full h-10 skeleton rounded-lg mb-4"></div>
        <hr class="border-neutral-10 my-4">
        <div class="w-full h-5 skeleton rounded-lg"></div>
      </div>
      <div class="border border-gray-10 rounded-lg p-6 relative">
        <div class="w-full h-10 skeleton rounded-lg mb-4"></div>
        <hr class="border-neutral-10 my-4">
        <div class="w-full h-5 skeleton rounded-lg"></div>
      </div>
      <div class="border border-gray-10 rounded-lg p-6 relative">
        <div class="w-full h-10 skeleton rounded-lg mb-4"></div>
        <hr class="border-neutral-10 my-4">
        <div class="w-full h-5 skeleton rounded-lg"></div>
      </div>
    </div>
  </section>
</template>

<script setup>


const config = useRuntimeConfig();
const token = useState('token')

const { data:plans, pending } = useLazyFetch('user-plans',{
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token.value}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
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