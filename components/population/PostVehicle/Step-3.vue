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
const condition = ref('');
const vehicleStatus = [
  {
    name: 'Nuevo',
    value: 'New'
  },
  {
    name: 'Usado',
    value: 'Used'
  },
];
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
  use_posts.country_id = country.value;
  use_posts.town_id = sector.value;
  use_posts.city_id = city.value;
  use_posts.condition = condition.value;
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
    Cuéntanos sobre tu <span class="text-secondary-100">vehículo </span>
  </h4>
  <div class="mx-4 px-4 md:px-8 sm:grid sm:grid-cols-2 sm:mx-auto gap-4 max-w-[995px]">
    <!-- Titulo -->
    <label class="col-span-2 sm:mb-2 mb-5">
      Título de la publicación
      <input class="form-control" v-model="title" placeholder="Escriba el título" type="text">
    </label>
    <!-- Descripcion -->
    <div class="flex flex-col col-span-2">
      <label for="description">Descripción</label>
      <textarea id="description" type="text" v-model="description" placeholder="Descripcion de la propiedad"></textarea>
    </div>
    <div class="col-span-2 gap-4 sm:grid grid-cols-2">
      <!-- Marca -->
      <label class="w-full sm:mb-2 mb-5">
        Marca
        <select class="form-control col-span-2" v-model="make_id">
          <option v-for="make_id in makes" :value="make_id.id" :key="make_id.id" class="option-label">
          {{ make_id.name }}
          </option>
        </select>
      </label>
      <!-- Modelo -->
      <label class="w-full sm:mb-2 mb-5">
        Modelo
        <select class="form-control col-span-2" v-model="model_id">
          <option v-for="model_id in models" :value="model_id.id" :key="model_id.id" class="option-label">
          {{ model_id.name }}
          </option>
        </select>
      </label>
      <!-- Price -->
      <div class="flex sm:mb-2 mb-5">
        <label class="w-full">
          Precio
          <input
            class="form-control"
            v-model="priceInput" 
            @blur="currencyFormat"
            @input="validateInput"
            :placeholder="`Precio en `+ pricePlaceholder"
          >
        </label>
        <div class="flex items-center ml-2">
          <button 
            class="value-toggle_btn border-l rounded-l-md" 
            :class="{'active': currencyTab}" 
            @click="currencyTab = true">RD
          </button>
          <button 
            class="value-toggle_btn border-r rounded-r-md" 
            :class="{'active': !currencyTab}" 
            @click="currencyTab = false">USD
          </button>
        </div>
      </div>
      <!-- Estado -->
      <label for="vehicleStatus" class="mb-2">
        Estado
        <select class="form-control" v-model="condition" id="vehicleStatus">
          <option v-for="condition in vehicleStatus" :key="condition" :value="condition.value" class="option-label">
            {{ condition.name }}
          </option>
        </select>
      </label>
      <!-- year -->
      <label class="w-full sm:mb-2 mb-5">
        Año
        <input class="form-control" v-model="year" placeholder="Escriba el Año" type="text">
      </label>
      <!-- Map -->
      <!-- <div class="col-span-2">
        <ClientOnly>
          <PopulationPostVehicleMap @send-location="getAddress"/>
        </ClientOnly>
      </div> -->
      <!-- ubicacion -->
      <!-- <label class="w-full sm:mb-2 mb-5 col-span-2">
        Ubicación
        <input class="form-control" readonly v-model="address" placeholder="Direccion" type="text">
      </label> -->
      <!-- Pais -->
      <label class="w-full sm:mb-2 mb-5">
        País
        <select class="form-control col-span-3" v-model="country">
          <option v-for="country in countries" :value="country.id" :key="country.id" class="option-label">
          {{ country.name }}
          </option>
        </select>
      </label>
      <!-- Ciudad -->
      <label class="w-full sm:mb-2 mb-5">
        Ciudad
        <select class="form-control col-span-3" v-model="sector" :disabled="!displaySector">
          <option v-for="sector in sectors[0]" :value="sector.id" :key="sector.id" class="option-label">
          {{ sector.name }}
          </option>
        </select>
      </label>
      <!-- Sector -->
      <label class="w-full sm:mb-2 mb-5">
        Sector
        <select class="form-control" v-model="city" :disabled="!displayCity">
          <option v-for="item in cities[0]" :value="item.id" :key="item.id" class="option-label">
          {{ item.name }}
          </option>
        </select>
      </label>
      <!-- Kilometraje -->
      <div class="flex sm:mb-2 mb-5">
        <label class="w-full">
          Kilometraje
          <input
          type="number"
            class="form-control"
            v-model="mileage_temp" 
            :placeholder="`Kilometraje en `+ mileagePlaceholder"
          >
        </label>
        <div class="flex items-center ml-2">
          <button 
            class="value-toggle_btn border-l rounded-l-md" 
            :class="{'active': mileageTab}" 
            @click="mileageTab = true">KM
          </button>
          <button 
            class="value-toggle_btn border-r rounded-r-md" 
            :class="{'active': !mileageTab}" 
            @click="mileageTab = false">M
          </button>
        </div>
      </div>
      <!-- Color exterior -->
      <label class="w-full sm:mb-2 mb-5">
        Color exterior
        <input type="text" v-model="exterior_color" class="form-control" />
      </label>
      <!-- Color Interior -->
      <label class="w-full sm:mb-2 mb-5">
        Color interior
        <input type="text" v-model="interior_color" class="form-control" />
      </label>
      <!-- Aire acondicionado -->
      <label class="w-full sm:mb-2 mb-5">
        Aire acondicionado
        <select class="form-control col-span-2" v-model="air_conditioned">
          <option value="0">No</option>
          <option value="1">Si</option>
        </select>
      </label>
      <!-- Tracciön -->
      <label class="w-full sm:mb-2 mb-5">
        Tracción
        <input type="text" v-model="traction" class="form-control" />
      </label>
      <!-- Transmisión -->
      <label class="w-full sm:mb-2 mb-5">
        Transmisión
        <select v-model="transmission" class="form-control">
          <option value="automática">Automática</option>
          <option value="mecánica">Mecánica</option>
        </select>
      </label>
      <!-- Motor -->
      <label class="w-full sm:mb-2 mb-5">
        Motor
        <input type="text" v-model="engine" class="form-control" />
      </label>
      <!-- Bolsa de aire -->
      <label class="w-full sm:mb-2 mb-5">
        Bolsa de aire
        <select class="form-control col-span-2" v-model="air_bag">
          <option value="0">No</option>
          <option value="1">Si</option>
        </select>
      </label>
      <!-- Combustible -->
      <label class="w-full sm:mb-2 mb-5">
        Combustible
        <input type="text" v-model="fuel_type" class="form-control" />
      </label>
    </div>   
  </div>
  <nav class="control-steps-PostVehicle">
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

label {
  @apply flex flex-col font-normal text-sm text-opacity-[0.85] gap-2;
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
  @apply mt-2 border border-[#D9D9D9] text-sm rounded-md px-3 py-2 placeholder:text-opacity-25 placeholder:font-normal focus:outline-primary-100 h-[130px];
}
.amenities-wrapper {
  @apply bg-neutral-white border border-gray-100 rounded-lg px-2.5 pt-3 overflow-y-scroll hover:overscroll-contain h-56  ;
}

.checkbox-labels {
  @apply cursor-pointer select-none flex flex-row items-center font-normal text-sm leading-[22px] mb-3;

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
    @apply w-7;
  }

  &::-webkit-scrollbar-track {
    @apply bg-neutral-white rounded-full;
  }

  &::-webkit-scrollbar-thumb {
    @apply border-[10px] border-solid border-neutral-white rounded-full bg-[#C1C1C1];
  }
}

</style>