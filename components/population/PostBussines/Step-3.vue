<script setup>
import {ref, watch} from 'vue';
import { usePostsStore } from '~/stores/Post';

const use_posts = usePostsStore();
const config = useRuntimeConfig();
const currencyTab = ref(true);
const mileageTab = ref(true);
const title = ref('');
const make_id = ref(null);
const year = ref(null);
const makes = ref([]);
const models = ref([]);
const model_id = ref(null);
const exterior_color = ref(null);
const interior_color = ref(null);
const air_conditioned = ref(Number);
const traction = ref("");
const transmission = ref("");
const engine = ref("");
const air_bag = ref(Number);
const fuel_type = ref("");
let price = ref(Number);
let price_us = ref(Number);
let price_temp = ref(Number);
let mileage_temp = ref(Number);
let mileage_km = ref(Number);
let mileage_m = ref(Number);
const description = ref('');
// const condition = ref('');
// const vehicleStatus = [
//   {
//     name: 'Nuevo',
//     value: 'New'
//   },
//   {
//     name: 'Usado',
//     value: 'Used'
//   },
// ];
let countries = [];
let country = ref(0);
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
let pricePlaceholder = ref('pesos dominicanos');
let mileagePlaceholder = ref('Kilómetros (KM)');
let priceInput = ref('');
const workSchedule = ['01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30']
const weekdays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

let countriesApi = await $fetch('generals/countries', {
  baseURL: config.public.API
});
countriesApi.results.data.forEach(element => {
  if(element.id === 63 || element.id === 236) {
    countries.push(element)
  }
});

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
  address.value = location;
  console.log(lat, log, address.value)
};

function currencyFormat() {
  let valor = priceInput.value.replace(/[^\d.]/g, '');
  let numero = parseFloat(valor);
  if (!isNaN(numero)) {
    priceInput.value = numero.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    price_temp.value = numero;
  }
}
function validateInput(event) {
  const inputValue = event.target.value;
  const regex = /^[0-9.]*$/;
  if (inputValue === '' || event.inputType === 'deleteContentBackward') {
    priceInput.value = inputValue;
    return;
  }
  if (!regex.test(inputValue)) {
    priceInput.value = inputValue.replace(/[^\d.]/g, '');
  };
  return {
    priceInput,
    validateInput,
  };
}
function toggle(value) {
  if (value === true) {
    console.log("de true a false");
    day.value = false;
  } else {
    console.log("de false a true");
    day.value = true;
  }
}
// Marcas
const { data: makes_data } = useFetch('generals/makes', {
  baseURL: config.public.API,
  transform(makes_data) {
    makes.value = makes_data.results;
  }
});

watch(make_id,() => {
  const { data: models_data } = useFetch(`generals/models/${make_id.value}`, {
    baseURL: config.public.API,
    transform(models_data) {
      models.value.push(models_data.results);
    }
  });
});

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

watch(currencyTab,(new_value) => {
  priceInput.value = '';
  price_temp.value = 0;
  price.value = 0;
  price_us.value = 0;
  if (new_value === true) {
    pricePlaceholder = "pesos dominicanos DOP";
  } else{
    pricePlaceholder = "dólares USD";
  }
});

watch(mileageTab,(new_value) => {
  mileage_temp.value = 0;
  mileage_km.value = 0;
  mileage_m.value = 0;
  if (new_value === true) {
    mileagePlaceholder = "Kilómetros (KM)";
  } else{
    mileagePlaceholder = "Millas (M)";
  }
});

watch(mileage_temp,(new_mileage) => {
  if (mileageTab.value === true) {
    mileage_km.value = parseInt(new_mileage);
    mileage_m.value = parseInt(new_mileage / 1.6);
  } else {
    mileage_m.value = parseInt(new_mileage);
    mileage_km.value = parseInt(new_mileage * 1.6);
  }
});

watch(price_temp,(new_price) => {
  if (currencyTab.value === true) {
    price.value = parseInt(new_price);
    price_us.value = parseInt(new_price / 58);
  } else {
    price_us.value = parseInt(new_price);
    price.value = parseInt(new_price * 58);
  }
});

function save_data() {
  use_posts.title = title.value;
  use_posts.price = price.value;
  use_posts.price_us = price_us.value;
  use_posts.lat = lat;
  use_posts.log = log;
  // use_posts.address = address.value;
  // use_posts.country_id = country.value;
  // use_posts.town_id = sector.value;
  // use_posts.city_id = city.value;
  // use_posts.condition = condition.value;
  use_posts.description = description.value;
  use_posts.make_id = parseInt(make_id.value);
  use_posts.model_id = parseInt(model_id.value);
  use_posts.exterior_color = exterior_color.value;
  use_posts.interior_color = interior_color.value;
  use_posts.air_conditioned = air_conditioned.value;
  use_posts.traction = traction.value;
  use_posts.transmission = transmission.value;
  use_posts.engine = engine.value;
  use_posts.air_bag = air_bag.value;
  use_posts.fuel_type = fuel_type.value;
  use_posts.year = year.value;
  use_posts.mileage = parseInt(mileage_m.value);
  use_posts.kilometer = parseInt(mileage_km.value);
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
      <input class="form-control" v-model="title" placeholder="Nombre del negocio" type="text">
    </label>
    <!-- Descripcion -->
    <label for="description" class="col-span-2 title-label mb-5">Descripción
      <textarea id="description" type="text" v-model="description" placeholder="Descripción del negocio"></textarea>
    </label>
    <!-- Horario -->
    <ul class="col-span-2 flex flex-col gap-5 text-sm leading-[22px] mb-5">
      <p>Horario</p>
      <li v-for="day in weekdays">
        <p class="mb-3.5 font-medium">
          {{day}}
        </p>
        <div class="flex items-center gap-x-11 gap-y-2 flex-wrap">
          <label class="checkbox-labels">
            <input type="checkbox" class="checkbox">
            Cerrado
          </label>
          <div class="flex items-center gap-1.5">
            <label for="openHour" class="whitespace-nowrap">Abre a las(s)</label>
            <div  class="hour-select-container ">
              <select name="openHour" id="openHour">
                <option v-for="hour in workSchedule">{{ hour }}</option>
              </select>
              <select>
                <option value="AM">A.M.</option>
                <option value="PM">P.M.</option>
              </select>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <label for="openHour" class="whitespace-nowrap">Cierra a las(s)</label>
            <div  class="hour-select-container ">
              <select name="openHour" id="openHour">
                <option v-for="hour in workSchedule">{{ hour }}</option>
              </select>
              <select>
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
        <input type="tel" name="phone" id="phone" placeholder="(829) 123-4567" class="form-control">
      </label>
      <label for="whatsapp" class="title-label mb-5">
        WhatsApp
        <input type="tel" name="whatsapp" id="whatsapp" placeholder="(829) 123-4567"  class="form-control">
      </label>
    </div>
    <!-- Web -->
    <label for="website" class="title-label mb-5 col-span-2">
      Página Web
      <input type="text" name="website" id="website" placeholder="ej: https://hispana-negocios.com" class="form-control">
    </label>
    <!-- Instagram -->
    <label for="instagram" class="title-label mb-5 col-span-2">
      Instagram
      <input type="text" name="instagram" id="instagram" placeholder="ej: https://instagram.com/hispana-negocios" class="form-control">
    </label>
    <!-- Facebook -->
    <label for="facebook" class="title-label col-span-2">
      Facebook
      <input type="text" name="facebook" id="facebook" placeholder="ej: https://facebook.com/hispana-negocios" class="form-control">
    </label>

    <!-- Foto de perfil -->
    <div class="mt-8 md:h-40 flex flex-col md:flex-row col-span-2 items-center md:items-start">
      <div class="flex md:mr-14 mb-6">
        <div class="flex flex-col items-center">
          <p class="whitespace-nowrap text-sm">Foto de perfil</p>
          <figure class="w-[107px] h-[107px] rounded-full border-[5px] border-secondary-100 mt-5 flex items-center justify-center z-10">
            <img
              src="/img/business.png"
              class=" w-full object-cover"
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
        <input type="file" class="absolute left-0 top-0 scale-[9] cursor-pointer opacity-0">
      </div>
    </div>

    <!-- Map -->
    <div class="col-span-2 gap-4 sm:grid grid-cols-2 mt-4 md:mt-0">
      <div class="col-span-2">
        <label for="map" class="text-sm">Ubicación</label>
        <ClientOnly>
          <PopulationPostBussinesMap @send-location="getAddress" name="map" id="map" />
        </ClientOnly>
      </div>
      <!-- ubicacion -->
      <label class="w-full sm:mb-2 mb-5 col-span-2 title-label">
        Dirección
        <input class="form-control hover:cursor-not-allowed" readonly v-model="address" placeholder="Direccion" type="text">
      </label>
    </div>   
    <!-- Pais -->
    <label class="w-full sm:mb-2 mb-5 title-label">
      País
      <select class="form-control" v-model="country">
        <option v-for="country in countries" :value="country.id" :key="country.id" class="option-label">
        {{ country.name }}
        </option>
      </select>
    </label>
    <!-- Ciudad -->
    <label class="w-full sm:mb-2 mb-5 title-label" >
      Ciudad
      <select class="form-control" v-model="sector" :disabled="!displaySector">
        <option v-for="sector in sectors[0]" :value="sector.id" :key="sector.id" class="option-label">
        {{ sector.name }}
        </option>
      </select>
    </label>
    <!-- Sector -->
    <label class="w-full sm:mb-2 mb-5 title-label">
      Sector
      <select class="form-control" v-model="city" :disabled="!displayCity">
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