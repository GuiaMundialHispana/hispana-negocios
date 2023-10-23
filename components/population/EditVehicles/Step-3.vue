<script setup>
import {ref, watch} from 'vue';
import { usePostsStore } from '~/stores/Post';
import { useUserStore } from '~/stores/User';

const use_posts = usePostsStore();
const user = useUserStore();
const config = useRuntimeConfig();
const title = ref('');
const description = ref('');
const phone = ref("");
const whatsapp = ref("");
const website = ref("");
const instagram = ref("");
const facebook = ref("");
const countries = useGetCountry().countries;
const country = ref("");
const profile_pic = ref(null);
let sectors = reactive([]);
let sector = ref(0);
let displaySector = ref(false);
let cities = reactive([]);
let city = ref([]);
let displayCity = ref(false);
let categories = [];
let lat = null;
let log = null;
let address = ref('');

const props = defineProps({
  countryId: {
    type: Number
  },
  sectorId: {
    type: Number
  },
  cityId: {
    type: Number
  }
});
getStates(props.countryId);
getCities(props.sectorId);

const week = ref([
  {
    day: "Domingo",
    open: "00:00",
    close: "00:00",
    isClose: 0,
    franja: "AM",
    franjaClose: "PM"
  },
  {
    day: "Lunes",
    open: "00:00",
    close: "00:00",
    isClose: 0,
    franja: "AM",
    franjaClose: "PM"
  },
  {
    day: "Martes",
    open: "00:00",
    close: "00:00",
    isClose: 0,
    franja: "AM",
    franjaClose: "PM"
  },
  {
    day: "Miercoles",
    open: "00:00",
    close: "00:00",
    isClose: 0,
    franja: "AM",
    franjaClose: "PM"
  },
  {
    day: "Jueves",
    open: "00:00",
    close: "00:00",
    isClose: 0,
    franja: "AM",
    franjaClose: "PM"
  },
  {
    day: "Viernes",
    open: "00:00",
    close: "00:00",
    isClose: 0,
    franja: "AM",
    franjaClose: "PM"
  },
  {
    day: "Sabado",
    open: "00:00",
    close: "00:00",
    isClose: 0,
    franja: "AM",
    franjaClose: "PM"
  }
]);

async function getStates(country_id) {
  const statesApi = await $fetch(`generals/states/${country_id}`, {
    baseURL: config.public.API
  });
  sectors.push(statesApi.results.data);
};

async function getCities(sector_id) {
  const citiesApi = await $fetch(`generals/cities/${sector_id}`, {
    baseURL: config.public.API
  });
  cities.push(citiesApi.results.data);
};

function getAddress(lant, long, location) {
  lat = lant;
  log = long;
  use_posts.address = location;
};

watch(country,(country_id) => {
  getStates(country_id);
  sectors = reactive([]);
  cities = reactive([]);
  displaySector.value = true;
});

watch(sector,(sector_id) => {
  getCities(sector_id);
  cities = reactive([]);
  displayCity.value = true;
});

function getFranja(hour) {
  const queEs = hour.substring(0, 2);
  if(parseInt(queEs) > 12) { return 'PM' } else { return 'AM' }
}

const images = ref(null);
const profilePic = ref("");
const isNewImage = ref(false);

function previewFiles(event) {
  images.value = event.target.files[0]
  profilePic.value = URL.createObjectURL(images.value);
  isNewImage.value = true;
};
</script>

<template>
  <h4 class="mt-11 mb-7 text-center">
    Cuéntanos sobre tu <span class="text-secondary-100">negocio </span>
  </h4>
  <div class="mx-4 px-4 md:px-8 sm:grid sm:grid-cols-2 sm:mx-auto gap-4 max-w-[995px]">
    <!-- Nombre -->
    <label class="col-span-2 sm:mb-2 title-label mb-5">
      Nombre del negocio
      <input class="form-control" v-model="use_posts.title" placeholder="Nombre del negocio" type="text">
    </label>
    <!-- Descripcion -->
    <label for="description" class="col-span-2 title-label mb-5">Descripción
      <textarea id="description" type="text" v-model="use_posts.description" placeholder="Descripción del negocio"></textarea>
    </label>
    <!-- Horario -->
    <ul class="col-span-2 flex flex-col gap-5 text-sm leading-[22px] mb-5">
      <p>Horario</p>
      <li v-for="day in use_posts.day_of_week" :key="day.id">
        <p class="mb-3.5 font-medium">
          {{day.day_of_week}}
        </p>
        <div class="flex items-center gap-x-11 gap-y-2 flex-wrap">
          <label class="checkbox-labels">
            <input type="checkbox" class="checkbox" v-model="day.is_closed" :true-value=1 :false-value=0>
            Cerrado
          </label>
          <div class="flex items-center gap-1.5" v-if="day.is_closed === 0">
            <label for="openHour" class="whitespace-nowrap">Abre a las(s)</label>
            <div class="hour-select-container">
              <input type="time" :placeholder="day.open_time" v-model="day.open_time" min="00:00" max="12:50">
              <select>
                <option>{{ getFranja(day.open_time) }}</option>
                <option value="AM">A.M.</option>
                <option value="PM">P.M.</option>
              </select>
            </div>
          </div>
          <div class="flex items-center gap-1.5" v-if="day.is_closed === 0">
            <label for="openHour" class="whitespace-nowrap">Cierra a las(s)</label>
            <div class="hour-select-container">
              <input type="time" :placeholder="day.open_time" v-model="day.close_time" min="00:00" max="12:50">
              <select>
                <option>{{ getFranja(day.close_time) }}</option>
                <option value="AM">A.M.</option>
                <option value="PM">P.M.</option>
              </select>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- telefono y whatsapp -->
    <div class="flex gap-4 mt-2">
      <label for="phone" class="title-label mb-5">
        Número telefónico
        <input type="tel" name="phone" id="phone" v-model="use_posts.phone" placeholder="(829) 123-4567" class="form-control">
      </label>
      <label for="whatsapp" class="title-label mb-5">
        WhatsApp
        <input type="tel" name="whatsapp" id="whatsapp" v-model="use_posts.whatsapp" placeholder="(829) 123-4567"  class="form-control">
      </label>
    </div>
    <!-- Web -->
    <label for="website" class="title-label mb-5 col-span-2">
      Página Web
      <input type="text" name="website" id="website" v-model="use_posts.website" placeholder="ej: https://hispana-negocios.com" class="form-control">
    </label>
    <!-- Instagram -->
    <label for="instagram" class="title-label mb-5 col-span-2">
      Instagram
      <input type="text" name="instagram" id="instagram" v-model="use_posts.instagram" placeholder="ej: https://instagram.com/hispana-negocios" class="form-control">
    </label>
    <!-- Facebook -->
    <label for="facebook" class="title-label col-span-2">
      Facebook
      <input type="text" name="facebook" id="facebook" v-model="use_posts.facebook" placeholder="ej: https://facebook.com/hispana-negocios" class="form-control">
    </label>

    <!-- Foto de perfil -->
    <div class="mt-8 md:h-40 flex flex-col md:flex-row col-span-2 items-center md:items-start">
      <div class="flex md:mr-14 mb-6">
        <div class="flex flex-col items-center">
          <p class="whitespace-nowrap text-sm">Foto de perfil</p>
          <figure v-if="use_posts.image.length > 0 && !isNewImage" class="w-[107px] h-[107px] rounded-full border-[5px] border-secondary-100 mt-5 flex items-center justify-center z-10 overflow-hidden">
            <img
              :src="`${config.public.IMAGE_ROUTE+use_posts.image}`"
              class="w-full h-full object-cover"
            >
          </figure>
          <figure v-if="isNewImage" class="w-[107px] h-[107px] rounded-full border-[5px] border-secondary-100 mt-5 flex items-center justify-center z-10 overflow-hidden">
            <img
              :src="`${profilePic}`"
              class="w-full h-full object-cover"
            >
          </figure>
        </div>
      </div>
      <div class="flex flex-col relative items-center justify-center border border-gray-300 rounded-md w-full h-40 overflow-hidden text-center">
        <div class="flex items-center justify-center rounded-full bg-neutral-10 w-14 h-14">
          <AtomsIcon name="general/upload" :size=28 class="text-primary-100" />
        </div>
        <p class="text-[#707070] text-sm">
          <span class="text-primary-100">Click para subir</span>
          o arrastra y suelta SVG, PNG, <br> JPG or GIF (max. 800px400px)
        </p>
        <input type="file" @change="previewFiles" class="absolute left-0 top-0 scale-[9] cursor-pointer opacity-0">
      </div>
    </div>

    <!-- Map -->
    <div class="col-span-2 gap-4 sm:grid grid-cols-2 mt-4 md:mt-0">
      <div class="col-span-2">
        <label for="map" class="text-sm">Ubicación</label>
        <ClientOnly>
          <PopulationEditVehiclesMap :lat="use_posts.lat" :long="use_posts.log" @send-location="getAddress"/>
        </ClientOnly>
      </div>
      <!-- ubicacion -->
      <label class="w-full sm:mb-2 mb-5 col-span-2 title-label">
        Dirección
        <input class="form-control hover:cursor-not-allowed" readonly v-model="use_posts.address" placeholder="Direccion" type="text">
      </label>
    </div>   
    <!-- Pais -->
    <label class="w-full sm:mb-2 mb-5 title-label">
      País
      <select class="form-control" v-model="use_posts.country_id">
        <option v-for="country in countries" :key="country" :value="country.id" class="option-label">
          {{ country.name }}
        </option>
      </select>
    </label>
    <!-- Ciudad -->
    <label class="w-full sm:mb-2 mb-5 title-label" >
      Ciudad
      <select class="form-control" v-model="use_posts.town_id" >
        <option v-for="sector in sectors[0]" :value="sector.id" :key="sector.id" class="option-label">
        {{ sector.name }}
        </option>
      </select>
    </label>
    <!-- Sector -->
    <label class="w-full sm:mb-2 mb-5 title-label">
      Sector
      <select class="form-control" v-model="use_posts.city_id">
        <option v-for="item in cities[0]" :value="item.id" :key="item.id" class="option-label">
        {{ item.name }}
        </option>
      </select>
    </label>
  </div>
 
  <nav class="control-steps-PostBussines">
    <AtomsButtons @click="$emit('back')" btn-style="outline-primary">
      Atras
    </AtomsButtons>
    <AtomsButtons @click="$emit('nexts'), save_data()">
      Continuar
    </AtomsButtons>
  </nav>
</template>

<style lang="postcss" scoped>
h4 { @apply font-semibold text-[28px] leading-[42px]; }

.title-label {
  @apply flex flex-col font-normal text-sm text-opacity-[0.85] gap-3;
}
.hour-select-container{
  @apply flex items-center px-2 py-1 bg-neutral-white border border-neutral-10 rounded-lg;

  & select{
    @apply text-[#a8a8a8] appearance-none border-none focus:outline-none scrollbar cursor-pointer;
    & option{
      @apply text-neutral-black
    }
  }
}
.form-control {
  @apply h-8 w-full border border-[#D9D9D9] text-sm rounded-md px-3 placeholder:text-opacity-25 placeholder:font-normal focus:outline-primary-100 disabled:cursor-not-allowed disabled:bg-neutral-10;
}
.select-multiple { @apply h-40; }
.value-toggle_btn {
  @apply border-y border-gray-300 text-primary-100 w-[37px] h-8 text-[12px] mb-0 mt-auto ;
  &.active { @apply bg-primary-100 text-neutral-white border-none; }
}

textarea {
  @apply border border-[#D9D9D9] text-sm rounded-md px-3 py-2 placeholder:text-opacity-25 placeholder:font-normal focus:outline-primary-100 h-[130px];
}
.amenities-wrapper {
  @apply bg-neutral-white border border-gray-100 rounded-lg px-2.5 pt-3 overflow-y-scroll hover:overscroll-contain h-56  ;
}

.checkbox-labels {
  @apply cursor-pointer select-none flex items-center;
  & .checkbox {
    @apply relative appearance-none flex-none w-4 h-4 border border-gray-300 rounded-sm mr-2 cursor-pointer hover:bg-secondary-100 hover:border-none checked:bg-primary-100 checked:hover:bg-gray-300 checked:border-none
    after:w-full
    after:h-full
    after:absolute
    after:bg-no-repeat
    after:bg-center
    after:bg-[length:10px]
    after:bg-[url('~/assets/icons/general/check.svg')];
  }
}

.scrollbar {
  &::-webkit-scrollbar {
    @apply w-5;
  }

  &::-webkit-scrollbar-track {
    @apply bg-neutral-white rounded-full;
  }

  &::-webkit-scrollbar-thumb {
    @apply border-[6px] border-solid border-neutral-white rounded-full bg-[#C1C1C1];
  }
}

</style>