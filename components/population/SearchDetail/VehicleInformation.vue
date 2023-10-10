<template>
  <section class="md:px-14 px-4">
    <div class="grid md:grid-cols-12 grid-cols-1 gap-8 justify-center 2xl:max-w-[1440px] mx-auto">
      <div class="lg:col-span-8 col-span-12">
        <h1 class="text-[28px] leading-[28px] font-semibold mb-2">{{ property.title }}</h1>
        <h2 class="md:mb-12 mb-8 text-lg font-semibold">{{ property.condition === 'New' ? 'Nuevo' : 'Usado' }}</h2>
        <!-- Price -->
        <div class="flex md:items-center md:flex-row flex-col md:gap-6 gap-2 border-b border-gray-100 pb-4 mb-8">
          <p class="text-neutral-black text-base font-normal">
            Precio
            <br>
            <span class="text-primary-100 xl:text-[28px] text-xl xl:leading-[28px] font-semibold mt-2">US${{ showParsedNumber(property.price_us) }}</span>
          </p>
          <a href="#loan" class="btn-loan">
            <AtomsIcon class="mr-2.5" name="general/price" :size=18 />
            Calcula tu préstamo
          </a>
        </div>
        <!-- Estado -->
        <ul class="short-information">
          <li class="md:border-r flex-grow border-primary-100 xl:px-14 md:px-8 px-4 bg-primary-100 text-neutral-white rounded-lg">
            <AtomsIcon name="general/calendar_month" :size=19 class="text-secondary-100 mr-2.5" />
            Año de fabricación: {{ property.year}}
          </li>
          <li class="md:border-r border-primary-100 xl:px-14 md:px-8">
            <AtomsIcon name="general/mileage" :size=19 class="text-primary-100 mr-2.5" />
            {{ showParsedNumber(property.price_us) }} km
          </li>
          <li class="xl:pl-14 md:pl-8">
            <AtomsIcon name="general/share-location" :size=19 class="text-primary-100 mr-2.5" />
            {{ property.address }}
          </li>
        </ul>
      </div>
      <!-- User information -->
      <div class="lg:col-span-4 md:col-span-8 md:col-start-3 col-span-12 pb-4 border-b border-gray-100 h-max">
        <figure class="user-image">
          <img v-if="user.profile_pic != null" :src="`https://hispana-autos-3284x.ondigitalocean.app/${user.profile_pic}`" :alt="user.name">
          <span v-else class="w-full h-full flex items-center justify-center font-bold text-primary-100 text-2xl uppercase bg-secondary-100">
            {{user.name.charAt(0)}}{{ user.lastname.charAt(0) }}
          </span>
        </figure>
        <h6 class="user-name">{{ user.name }} {{ user.lastname }}</h6>
        <p class="user-position">Vendedor inmobiliario</p>
        <div class="flex justify-center">
          <a :href="`tel:${user.phone}`" class="contact-whatsapp mx-auto">
            <AtomsIcon name="general/mail" :size=18 class="mr-2.5"/>
            Contactar vendedor
          </a>
        </div>
        <a :href="`mailto:${user.email}`" class="hover:text-primary-100 flex items-center justify-center mt-4">
          <AtomsIcon name="general/mail" :size=18 class="mr-2.5"/>
          {{ user.email }}
        </a>
        <a v-if="user.cellphone != '' && user.cellphone != null" target="_blank" :href="`https://api.whatsapp.com/send?phone=${user.cellphone}`" class="hover:text-primary-100 flex items-center justify-center mt-4">
          <AtomsIcon name="social-media/whatsapp" :size=18 class="mr-2.5"/>
          {{ user.cellphone }}
        </a>
      </div>
    </div>
    <!-- Caracteristicas -->
    <div class="pb-[56px] md:pt-16 pt-8 2xl:max-w-[1440px] mx-auto">
      <h2 class="text-[28px] leading-[28px] font-semibold mb-8">Características</h2>
        <div class="characteristics-wrapper">
          <div>
            <AtomsIcon name="general/car" :size=42 class="text-primary-100 mr-1" />
            <p>
              Marca
              <span>{{property.make_details.name }}</span>
            </p>
          </div>
          <div>
            <AtomsIcon name="general/car_model" :size=42 class="text-primary-100 mr-1" />
            <p>
              Modelo
              <span>{{ property.model_details.name }}</span>
            </p>
          </div>
          <div>
            <AtomsIcon name="general/car_color" :size=42 class="text-primary-100 mr-1" />
            <p>
              Color exterior
              <span>{{ property.exterior_color }}</span>
            </p>
          </div>
          <div>
            <AtomsIcon name="general/car_interior" :size=42 class="text-primary-100 mr-1" />
            <p>
              Color interior
              <span>{{ property.interior_color }}</span>
            </p>
          </div>
          <div>
            <AtomsIcon name="general/ac_unit" :size=42 class="text-primary-100 mr-1" />
            <p>
              Aire acondicionado
              <span>{{ property.air_conditioned === 0 ? 'No' : 'Si' }}</span>
            </p>
          </div>
          <div>
            <AtomsIcon name="general/car_category" :size=42 class="text-primary-100 mr-1" />
            <p>
              Tracción
              <span>{{ property.traction }}</span>
            </p>
          </div>
          <div>
            <AtomsIcon name="general/fuel" :size=42 class="text-primary-100 mr-1" />
            <p>
              Combustible
              <span>{{ property.fuel_type }}</span>
            </p>
          </div>
          <div>
            <AtomsIcon name="general/transmission" :size=42 class="text-primary-100 mr-1" />
            <p>
              Transmisión
              <span>{{ property.transmission }}</span>
            </p>
          </div>
          <div>
            <AtomsIcon name="general/engine" :size=42 class="text-primary-100 mr-1" />
            <p>
              Motor
              <span>{{ property.engine }}</span>
            </p>
          </div>
          <div>
            <AtomsIcon name="general/shield" :size=42 class="text-primary-100 mr-1" />
            <p>
              Bolsa de aire
              <span>{{ property.air_bag === 0 ? 'No' : 'Si' }}</span>
            </p>
          </div>
        </div>
    </div>
    <!-- Description -->
    <div class="pb-8 md:pt-8 2xl:max-w-[1440px] mx-auto">
      <h2 class="text-[28px] leading-[28px] font-semibold mb-8">Descripción del vehículo</h2>
      <p class="text-sm text-neutral-black font-normal">{{ property.description }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'VehicleInformation',
  props: {
    property: {
      type: Object,
      default: () => {}
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  data(){
    return {
      features: [],
      config: useRuntimeConfig()
    }
  },
  computed: {
    renderMap() {
      return  `https://maps.google.com/maps?q=${this.property.latitude},${this.property.longitude}&hl=es;z%3D14&amp&output=embed`;
    }
  },
  methods: {
    showParsedNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
}
</script>

<style lang="postcss" scoped>
.user-image {
  @apply w-24 h-24 rounded-full border-4 border-solid border-secondary-100 overflow-hidden mx-auto mb-2;
  & img { @apply w-full h-full bg-cover bg-center; }
}

.user-name { @apply text-neutral-black text-base font-semibold text-center; }
.user-position { @apply text-sm text-neutral-black text-center font-normal mb-4; }

.btn { @apply rounded-lg !important; }

.characteristics-table {
  @apply rounded-lg border border-[#ADADAD] max-w-sm;

  & li {
    @apply grid grid-cols-1;

    & h3 { @apply px-7 py-2.5 border-b border-[#ADADAD] font-semibold text-base text-neutral-black; }
    & p { @apply px-7 py-2.5 border-b border-gray-100 font-normal text-base text-neutral-black; }
  }

  & li:last-child h3 { @apply border-b-0; }
  & li:last-child p { @apply border-b-0; }
}

/* .characteristics-table {
  @apply rounded-lg border border-[#ADADAD] ;

  & li {
    @apply grid grid-cols-2;

    & h3 { @apply px-7 py-2.5 border-b border-r border-[#ADADAD] font-semibold text-base text-neutral-black; }
    & p { @apply px-7 py-2.5 border-b border-gray-100 font-normal text-base text-neutral-black; }
  }

  & li:last-child h3 { @apply border-b-0; }
  & li:last-child p { @apply border-b-0; }
} */

.btn-loan { 
  @apply md:ml-auto md:w-max w-full border-2 border-gray-100 rounded-lg h-10 flex items-center justify-center text-sm text-neutral-black font-normal px-2.5 hover:text-neutral-white hover:bg-primary-100 hover:font-semibold hover:border-primary-100;
}

.short-information {
  @apply max-w-4xl p-2.5 md:flex justify-center grid sm:grid-cols-2 md:gap-0 gap-2 md:items-center md:flex-row flex-col bg-[#E5FEFF] rounded-lg;

  & li {
    @apply md:h-11 h-8 flex items-center justify-center xl:text-base text-xs font-semibold whitespace-nowrap;
  }
}
.contact-whatsapp {
  @apply inline-flex rounded-lg justify-center items-center no-underline cursor-pointer duration-300 focus:outline-none text-sm px-4 bg-primary-100 border hover:border-secondary-100 hover:bg-secondary-100 text-neutral-white h-8;
}

.characteristics-wrapper{
  @apply grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-16 md:gap-y-20 gap-y-10 md:mb-8 mb-2;
  & div{
    @apply flex items-center gap-3 whitespace-nowrap mr-5;
    & p {
      @apply text-base text-neutral-black font-semibold flex flex-col text-start;
      & span {
        @apply text-neutral-20 text-sm font-normal 
      }
    }
  }
}
</style>