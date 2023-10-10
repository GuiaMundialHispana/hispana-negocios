<template>
  <div class="flex flex-wrap gap-2 xl:flex-row flex-col">
    <!-- Marca -->
    <div class="filter-content items-center">
      <button class="flex gap-2.5 filter-btn" @click="brand = true" :class="{'active': brand}">
        <AtomsIcon name="general/car" class="text-primary-100" :size=20  />
        <p>{{ make_name != '' ? make_name : 'Marca' }}</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside v-if="brand" @trigger="brand = false" class="dropdown w-full sm:w-[230px] h-fit">
        <div class="dropdown-wrapper scrollbar border-none min-h-max max-h-[273px]">
          <label
            class="checkbox-labels"
            :for="make.name"
            v-for="make in makes"
            :key="make.id"
            @click="make_name = make.name"
          >
            <input
              type="checkbox"
              class="checkbox"
              :value="make.id"
              :id="make.name"
              v-model="make_id"
            />
            {{ make.name }}
          </label>
        </div>
      </OnClickOutside>
    </div>
    <!-- Modelo -->
    <div class="filter-content items-center" v-if="make_id.length === 1">
      <button class="flex gap-2.5 filter-btn" @click="model = !model" :class="{'active': model}">
        <AtomsIcon name="general/car_model" class="text-primary-100" :size=20  />
        <p>{{ model_name != '' ? model_name : 'Modelo' }}</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside v-if="model" @trigger="model = false" class="dropdown w-full sm:w-[230px] h-fit">
        <div class="dropdown-wrapper scrollbar border-none min-h-max max-h-[273px]">
          <label
            class="checkbox-labels"
            :for="model.name"
            v-for="model in models"
            :key="model.id"
            @click="model_name = model.name"
          >
            <input
              type="radio"
              class="checkbox"
              :value="model.id"
              :id="model.name"
              v-model="model_id"
            />
            {{ model.name }}
          </label>
        </div>
      </OnClickOutside>
    </div>
    <!-- Año -->
    <div class="filter-content items-center">
      <button class="flex gap-2.5 filter-btn" @click="dropYear = !dropYear" :class="{'active': dropYear}">
        <AtomsIcon name="general/calendar" class="text-primary-100" :size=20  />
        <p>{{ year != '' ? year : 'Año' }}</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="dropYear = false" v-if="dropYear" class="dropdown w-[238px] h-fit">
        <p>
          Año
        </p>
        <MultiRangeSlider class="mx-auto mt-[14px] w-[200px]"
          baseClassName="multi-range-slider-bar-only"
          :min="minYear"
          :max="maxYear"
          :step="1"
          :ruler="false"
          :label="false"
          :minValue="minYearValue"
          :maxValue="maxYearValue"
          @input="updateYears"
        />
        <p class="whitespace-normal text-sm font-medium">
          Desde <b>{{ minYearValue }}</b>
          hasta <b>{{ maxYearValue }}</b>
        </p>
      </OnClickOutside>
    </div>
    <!-- Price -->
    <div class="filter-content">
      <button class="flex gap-2.5 filter-btn" @click="priceRange = !priceRange" :class="{'active': priceRange}">
        <AtomsIcon name="general/price" class="text-primary-100" :size=20  />
        <p>Precio</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="priceRange = false" v-if="priceRange"  class="dropdown md:w-[238px] h-fit">
        <p class="flex justify-between text-base text-neutral-black">
          Precio
          <label for="RD" class="price-btn ml-auto">
            <input type="radio" id="RD" value="RD" name="currency" v-model="currency_picked" checked>
          </label>
          <label for="USD" class="price-btn">
            <input type="radio" id="USD" value="USD" name="currency" v-model="currency_picked">
          </label>
        </p>
        <MultiRangeSlider class="mx-auto mt-[14px] md:w-[200px]"
          baseClassName="multi-range-slider-bar-only"
          :min="0"
          :max="maxPrice"
          :step="priceRangeSteps"
          :ruler="false"
          :label="false"
          :minValue="priceMinValue"
          :maxValue="priceMaxValue"
          @input="updatePrice"
        />
        <p class="whitespace-normal text-sm font-medium max-w-[200px]">
          Desde <b>{{currency_picked}}${{ showpriceMinValue }}</b>
          hasta <b>{{currency_picked}}${{ showpriceMaxValue }}</b>+
        </p>
      </OnClickOutside>
    </div>
    <!-- Mileage -->
    <div class="filter-content">
      <button class="flex gap-2.5 filter-btn" @click="mileageRange =! mileageRange" :class="{'active': mileageRange}">
        <AtomsIcon name="general/mileage" class="text-primary-100" :size=20  />
        <p>Kilometraje</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="mileageRange = false" v-if="mileageRange" class="dropdown md:w-[238px] h-fit">
        <p class="flex justify-between text-base text-neutral-black">
          Kilometraje
          <label for="KM" class="price-btn ml-auto mileage-btn">
            <input type="radio" id="KM" value="KM" name="mileage" v-model="mileage_picked" checked>
          </label>
          <label for="M" class="price-btn mileage-btn">
            <input type="radio" id="M" value="M" name="mileage" v-model="mileage_picked">
          </label>
        </p>
        <MultiRangeSlider class="mx-auto mt-[14px] md:w-[200px]"
          baseClassName="multi-range-slider-bar-only"
          :min="0"
          :max="maxMileage"
          :step="5000"
          :ruler="false"
          :label="false"
          :minValue="mileageMinValue"
          :maxValue="mileageMaxValue"
          @input="updateMileage"
        />
        <p class="whitespace-normal text-sm font-medium max-w-[200px] ">
          Desde <b>{{ showMileageMinValue }} {{mileage_picked}}</b>
          hasta <b>{{ showMileageMaxValue }} {{mileage_picked}}</b>+
        </p>
      </OnClickOutside>
    </div>
    <!-- Category -->
    <div class="filter-content">
      <button class="flex gap-2.5 filter-btn" @click="category = !category" :class="{'active': category}">
        <AtomsIcon name="general/car_category" class="text-primary-100" :size=20 />
        <p>Categoria</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside v-if="category" @trigger="category = false" class="dropdown w-full sm:w-[230px] h-fit">
        <div class="dropdown-wrapper scrollbar border-none min-h-max max-h-[273px]">
          <label class="checkbox-labels" :for="category.name" v-for="category in categories" :key="category">
            <input
              type="checkbox"
              class="checkbox"
              name="category"
              v-model="category_id"
              :value="category.id"
              :id="category.name"
            >
            {{ category.name }}
          </label>
        </div>
      </OnClickOutside>
    </div>
    <button class="search-button" @click="clearFilter()" v-if="filter">
      <p class="xl:hidden mr-3 font-semibold">Borrar filtros</p>
      <AtomsIcon name="general/close" :size=17  />
    </button>
  </div>
</template>

<script setup>
import { OnClickOutside } from '@vueuse/components';
const emit = defineEmits([
  'make',
  'model',
  'priceType',
  'price',
  'category',
  'unitType',
  'unit',
  'year'
]);
const config = useRuntimeConfig();
const route = useRoute();
const brand = ref(false);
const model = ref(false);
const dropYear = ref(false);
const priceRange = ref(false);
const mileageRange = ref(false);
const category = ref(false);
const makes = ref([]);
const make_id = ref([]);
const make_name = ref("");
const models = ref([]);
const model_id = ref(null);
const model_name = ref("");
const priceMinValue = ref(0);
const priceMaxValue = ref(10000000);
const showpriceMinValue = ref('0');
const showpriceMaxValue = ref("10,000,000");
const maxPrice = ref(50000000);
const country_name = ref('');
const currency_picked = ref('RD');
const price = ref('');
const priceRangeSteps = ref(500000);
const status = ref('');
const filter = ref(true);
const minYear = ref(1998);
const maxYear = ref(2024);
const minYearValue = ref(2007);
const maxYearValue = ref(2021);
const year = ref('');
const mileage = ref('');
const mileage_picked = ref('KM');
const maxMileage = ref(150000);
const mileageMinValue =  ref(0);
const mileageMaxValue = ref(50000);
const showMileageMinValue = ref('0');
const showMileageMaxValue = ref("50,000");
const category_id = ref([])

const { data: makes_data } = useFetch('generals/makes', {
  baseURL: config.public.API,
  transform(makes_data) {
    makes.value = makes_data.results;
  }
});

watch(make_id,() => {
  emit('make', make_id.value);
  if(make_id.value.length > 1 ){
    return true;
  } else {
    const { data: models_data } = useFetch(`generals/models/${make_id.value}`, {
      baseURL: config.public.API,
      transform(models_data) {
        models.value.push(models_data.results);
      }
    });
  }

  if(make_id.value.length <= 0) {
    make_name.value = 'Marca';
  }
});

watch(model_id, () => {
  emit('model', model_id.value);
});

let countries = [];
let country = ref(0);
let countriesApi = await $fetch('generals/countries', {
  baseURL: config.public.API
});
countriesApi.results.data.forEach(element => {
  if(element.id === 63 || element.id === 236) {
    countries.push(element)
  }
});

let categories = ref([]);
const categoriesApi = await $fetch(config.public.API+'generals/categories');
categories.value = categoriesApi.results;

watch(category_id, (new_category_id) => {
  emit('category', new_category_id);
});

let sectors = reactive([]);
let sector = ref(0);
async function getStates(country_id) {
  const statesApi = await $fetch(`generals/states/${country_id}`, {
    baseURL: config.public.API
  });
  sectors.push(statesApi.results.data);
};

let cities = reactive([]);
let city = ref([]);
async function getCities(sector_id) {
  const citiesApi = await $fetch(`generals/cities/${sector_id}`, {
    baseURL: config.public.API
  });
  cities.push(citiesApi.results.data);
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

watch(currency_picked, (newPicked) => {
  emit('priceType', newPicked);
  if (newPicked === 'USD') {
    priceMinValue.value = 0,
    priceMaxValue.value = 1000000,
    showpriceMinValue.value = '0';
    showpriceMaxValue.value = '1,000,000';
    maxPrice.value = 3000000;
    priceRangeSteps.value = 50000;
  } else{
    priceMinValue.value = 0,
    priceMaxValue.value = 10000000,
    showpriceMinValue.value = '0';
    showpriceMaxValue.value = '10,000,000';
    maxPrice.value = 50000000;
    priceRangeSteps.value = 500000;
  }
})

watch(price, (prices) => {
  emit('price', prices);
});

watch(mileage_picked, (new_mileage_picked) => {
  emit('unitType',new_mileage_picked);
})

watch(mileage, (new_mileage) => {
  console.log(new_mileage)
  emit('unit',new_mileage);
})

function updatePrice(e) {
  priceMinValue.value = e.minValue;
  priceMaxValue.value = e.maxValue;
  showpriceMinValue.value = priceMinValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  showpriceMaxValue.value = priceMaxValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  price.value = priceMinValue.value.toString() + '-' + priceMaxValue.value.toString();
}

function updateYears(e) {
  minYearValue.value = e.minValue;
  maxYearValue.value = e.maxValue;
  year.value = minYearValue.value.toString() + '-' + maxYearValue.value.toString();
  emit('year', year.value);
}

function updateMileage(e) {
  mileageMinValue.value = e.minValue;
  mileageMaxValue.value = e.maxValue;
  showMileageMinValue.value = mileageMinValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  showMileageMaxValue.value = mileageMaxValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  mileage.value = mileageMinValue.value.toString() + '-' + mileageMaxValue.value.toString();
}

function toggleList(list) {
  if (dropdownLists[list]) {
    setTimeout(() => {
      dropdownLists[list] = false;
    }, 50);
  } else { dropdownLists[list] = true; }
}

function clearFilter() {
  emit('make', make_id.value = []);
  emit('model', model_id.value = []);
  emit('category', category_id.value = []);
  emit('priceType', '');
  emit('price', price.value = '');
  emit('unitType', '');
  emit('unit',mileage.value = '');
};
</script>

<script>
import  MultiRangeSlider  from "multi-range-slider-vue";
export default {
  components: {
    MultiRangeSlider
  },
}
</script>

<style lang="postcss" scoped>
.property-quantity-btn {
  @apply m-0 w-full h-10 flex items-center justify-center border-gray-300 border-r border-t border-b first:border-l first:rounded-tl-sm first:rounded-bl-sm last:rounded-tr-sm last:rounded-br-sm hover:bg-secondary-100 checked:bg-secondary-100;
  &.active {
    @apply bg-secondary-100 font-bold text-primary-100;
    & span { @apply text-neutral-black; }
  }

  & input { @apply appearance-none; }
}
.filters-overflow {
  @apply w-full sm:w-fit h-screen 2xl:mt-12 lg:mt-[102px] 2xl:h-fit py-4 2xl:py-0 fixed top-0 md:absolute 2xl:relative 2xl:flex flex-col 2xl:flex-row gap-4 2xl:gap-1.5 md:items-end bg-neutral-white z-[80] right-0 2xl:mr-0 mt-0 px-4 md:px-6 2xl:px-0;
  @media (max-width:1536px) {
    @apply overflow-y-auto overflow-hidden border-l-2 border-l-gray-300;
  }
}
/*  */

.filter-btn {
  @apply flex justify-between w-full 2xl:w-[160px] items-center border-2 rounded-lg border-gray-100 mt-2.5 font-normal text-sm leading-[22px] h-10 px-2.5 first:mt-0 hover:bg-secondary-100 hover:border-primary-100 bg-neutral-white whitespace-nowrap mx-auto text-neutral-black !important;
  &.active { @apply border-primary-100 bg-neutral-white !important; }
  & p { @apply flex-none !important; }
}
.price-btn {
  @apply cursor-pointer select-none flex items-center font-normal text-xs;

  & input {
    @apply relative appearance-none flex-none w-10 h-5 border border-gray-300 rounded-sm cursor-pointer hover:bg-secondary-100 hover:border-none checked:bg-primary-100 checked:hover:bg-gray-300 checked:border-none checked:after:text-neutral-white overflow-hidden
    after:w-full
    after:h-full
    after:flex
    after:justify-center
    after:items-center
    after:hover:text-neutral-white
  }
}

.price-btn:first-child {
  & input { @apply after:content-['RD'] border-r-0 rounded-tr-none rounded-br-none; }
}

.price-btn:last-child {
  & input { @apply after:content-['USD'] rounded-tl-none rounded-bl-none; }
}

.mileage-btn:first-child {
  & input { @apply after:content-['KM'] border-r-0 rounded-tr-none rounded-br-none; }
}

.mileage-btn:last-child {
  & input { @apply after:content-['M'] rounded-tl-none rounded-bl-none; }
}

.filter-content {
  @apply flex flex-col relative xl:w-fit;
}

.search-button {
  @apply flex bg-primary-100 w-full sm:w-[230px] p-2 h-12 xl:w-10 xl:h-10 rounded-full items-center justify-center hover:bg-secondary-100 border-primary-100 border flex-none text-neutral-white;
}

.sector-filter-btn{
  @apply flex justify-between items-center w-full border-2 rounded-lg border-gray-100 mt-2.5 font-normal text-sm leading-[22px] h-10 px-2.5 first:mt-0 hover:bg-secondary-100 hover:border-primary-100;
  &.active{
    @apply border-primary-100 hover:bg-neutral-white;
  }
}

.dropdown{
  @apply bg-neutral-white border-2 border-gray-100 rounded-lg p-2.5 shadow-md xl:absolute min-w-[230px] right-full xl:left-0 xl:top-[95%] mt-[5px] mr-1.5 2xl:mr-0 z-10;
}
</style>