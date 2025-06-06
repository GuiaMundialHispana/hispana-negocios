<template>
  <section>
    <div class="grid lg:grid-cols-2 min-h-screen">
      <div class="w-full lg:px-8 px-4 lg:py-16 py-8">
        <h4 class="flex items-center">
          <AtomsButtons @click="useRouter().back()" btn-type="btn-icon" class="mr-2" iconName="arrows/arrow-left"></AtomsButtons>
          Información de pago
        </h4>
        <ul class="payment-plan-resume">
          <li class="plan-price-card">
            <div class="plan-name-card" :class="[renderPlanText]">
              <p>{{useRoute().query.name}}</p>
            </div>
            <div class="plan-information">
              <p class="capitalize">Plan {{ useRoute().query.name }}</p>
              <select readonly="readonly">
                <option :value="parseInt(useRoute().query.quantity)">Cantidad: {{useRoute().query.quantity}}</option>
              </select>
            </div>
            <h6 class="plan-price" v-if="useRoute().query.price > 0">
              RD$ {{ convertPrice(useRoute().query.price) }}
            </h6>
            <h6 class="plan-price uppercase" v-else>gratis</h6>
          </li>
        </ul>
        <p class="total-price max-w-max md:w-full md:ml-auto md:mr-0 mr-auto">
          <span class="text-sm font-normal block text-left mt-8">Pago total</span>
          RD$ {{ convertPrice($route.query.newPrice) }}
        </p>
      </div>
      <!--  -->
      <div class="payment-wrapper">
        <div class="form-group">
          <label>Nombre</label>
          <input type="text" v-model="name">
        </div>
        <div class="form-group my-4">
          <label>Correo</label>
          <input type="email" v-model="email">
        </div>
        <div id="card-form" ref="cardRef" class=" mt-8"></div>
        <p v-if="stripeError.length > 0" class="font-semibold text-primary-100 my-3">{{stripeError}}</p>
        <AtomsButtons btnSize="medium" @click="processPayment()" class="w-full mt-4" :disabled="name.length === 0 || email.length === 0">Pagar</AtomsButtons>
      </div>
    </div>
    <OrganismPaymentConfirmation v-if="modal" />
  </section>
</template>

<script lang="ts" setup>
const stripe = useStripe();
const cardRef = ref(null);
const email = ref("");
const name = ref("");
const modal = stripe.successPayment;
const stripeError = stripe.stripeMessage;

definePageMeta({
  middleware: 'check-auth'
});

onMounted( async () => {
  await stripe.initStripe();
});

const refer = useState('refer');
async function processPayment() {
  await stripe.submitPayment(
    email.value,
    name.value,
    useRoute().query.quantity,
    useRoute().query.planId,
    refer.value
  );
}

function convertPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const renderPlanText = computed(()=> {
  if(useRoute().query.name === 'VIP') {
    return 'vip';
  } else if (useRoute().query.name === 'SILVER') {
    return 'silver';
  } else if (useRoute().query.name === 'EXCLUSIVO') {
    return 'exclusive';
  } else if(useRoute().query.name === 'DESTACADOS') {
    return '';
  } else if(useRoute().query.name === 'BÁSICO') {
    return 'basic';
  }
});

</script>

<style lang="postcss" scoped>
h4 {
  @apply font-bold text-[28px] leading-[42px] md:mb-14 mb-4;
}

.payment-plan-resume {
  & .plan-price-card {
    @apply py-4 border-b border-[#D9D9D9] w-full flex gap-3 md:items-center items-start md:flex-row flex-col;

    & .plan-name-card {
      @apply rounded-lg md:w-[100px] w-full md:h-[70px] h-8 flex items-center justify-center font-medium;

      &.basic { @apply bg-primary-100 text-neutral-white; }
      
      &.vip {
        background: linear-gradient(99.8deg, #FFAE10 -9.48%, #FFB800 45.36%, #FFD058 96.88%);
        @apply text-neutral-black;
      }
      &.silver { background: linear-gradient(104.59deg, #D9D9D9 8.17%, #ADADAD 51.17%, #FFFFFF 120.16%); }
      &.exclusive { 
        background: linear-gradient(100.63deg, #000000 -6.24%, #2F1C1B 45.46%, #A89494 95.05%);
        color: white;
      }
    }

    & .plan-information {
      @apply flex md:flex-col flex-row md:items-start items-center mr-auto;
      & p { @apply text-neutral-black text-sm font-medium md:mb-3 mb-0 md:mr-0 mr-4; }
      & select { @apply bg-[#FFE9E9] text-primary-100 px-1.5 text-sm font-normal rounded-lg min-w-[123px] focus:outline-none h-10; }
    }

    & .plan-price { @apply md:ml-auto text-sm text-neutral-black font-medium; }
  }
}

.form-group {
  @apply mb-4 w-full;
  & label { @apply text-neutral-black text-sm mb-1 block; }
  & input { @apply w-full border border-[#D9D9D9] rounded-sm block px-4 h-8 font-light placeholder:text-[#D9D9D9]; }
}

.card-information {
  & input:first-child { @apply border-t-0 border-r-0; }
  & input:last-child { @apply border-t-0; }
}

.total-price {
  @apply font-bold text-neutral-black text-[28px] leading-[42px] text-right;
}

.payment-wrapper {
  @apply bg-[#F8F8F8] w-full h-full lg:py-40 py-8 lg:px-8 px-4;
}
</style>