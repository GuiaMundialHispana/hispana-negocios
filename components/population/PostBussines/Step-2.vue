<script setup>
import { usePostsStore } from '~/stores/Post';

const use_posts = usePostsStore();
let next = ref(false);
const current = ref(false)
const config = useRuntimeConfig();
const token = useState('token');
const plans = ref([]);
const emit = defineEmits(['back', 'nexts'])

const { data:userPlans, pending } = await useLazyFetch('user-plans',{
  method: 'GET',
  headers: {'Authorization': `Bearer ${token.value}`},
  baseURL: config.public.API,
  transform(data) {
    return data.results;
  }
});

const { data:generalPlans } = useLazyFetch('generals/plans',{
  method: 'GET',
  server:false,
  baseURL: config.public.API,
  transform(data) {
    return data.results;
  }
});

watch([userPlans, generalPlans], ([userPlans, generalPlans]) => {
  if (userPlans && generalPlans) {
    plans.value = []; // Reinicia el array de planes
    const userPlanIds = userPlans?.map(item => item.plan_id) ?? [];

    const availablePlans = generalPlans?.filter(gp => !userPlanIds.includes(gp.id) && gp.id !== 4) ?? [];

    if (availablePlans.length > 0) {
      userPlans.forEach((plan) => {
        plans.value.push({
          plan: plan.plan,
          quantity: plan.quantity
        });
      });
      availablePlans.forEach((plan) => {
        plans.value.push({
          plan: plan,
          quantity: 0
        });
      });
    } else {
      userPlans.forEach((plan) => {
        plans.value.push({
          plan: plan.plan,
          quantity: plan.quantity
        });
      });
    }
  }
});

function send_plan(id,pictures) {
  use_posts.plan_id = id;
  use_posts.plan_pictures = pictures;
  current.value = false;
  next.value = true;
}

// send_plan(use_posts.plan_id,use_posts.plan_pictures);
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
  <ul v-if="!pending && plans" class="plans-list">
    <li v-for="plan in plans" :key="plan">
      <MoleculesPlanCard
        class="h-full"
        @pay="send_plan"
        :plan="plan.plan"
        :user-quantity="plan.quantity"
      />
    </li>
  </ul>
  <div class="flex justify-center">
    <AtomsLink link-to="/planes" class="mx-auto my-6">Adquirir mas planes</AtomsLink>
  </div>
  <nav class="control-steps-postProperty">
    <AtomsButtons @click="emit('back')" btn-style="outline-primary">
      Atrás
    </AtomsButtons>
    <!-- :disabled="!next" -->
    <AtomsButtons :isDisabled="use_posts.plan_id === 0" @click="emit('nexts')">
      Continuar
    </AtomsButtons>
  </nav>
</template>

<style lang="postcss" scoped>
h4 { @apply font-semibold text-[28px] leading-[42px] mt-11 mb-14 text-center; }

.plans-list { @apply grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-16; }
</style>