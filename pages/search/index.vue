<template>
  <section class="lg:px-16 md:px-8 px-4 md:min-h-screen">
    <AtomsButtons
      v-show="viewport.isLessThan('xl')"
      class="mt-5 font-semibold w-full"
      icon-position="right"
      btn-style="solid-primary" 
      icon-name="general/search"
      btn-size="large"
      :icon-size=18
      @click="showFilters = !showFilters"
      >Filtrar propiedades
    </AtomsButtons>
    <OnClickOutside @trigger="showFilters = false" :class="{'hidden': !showFilters, 'flex' : showFilters}" class="filters-overflow">
      <AtomsButtons
        v-show="viewport.isLessThan('xl')"
        btn-type="btn-icon"
        icon-name="general/close"
        :icon-size=20
        btn-size="small"
        class="mr-0 ml-auto flex-none"
        @click="showFilters = false"
      />
      <div class="flex flex-wrap gap-2 xl:flex-row flex-col">
        <MoleculesFilterStatusProperties
          @change="getCondition"
          class="filterStatus-tabs-sm"
        />
        <MoleculesSearchFiltersBar
          @make="getMake"
          @priceType="getPriceType"
          @price="getPrice"
          @unitType="getUnitType"
          @unit="getUnit"
          @year="getYear"
          @category="getCategory"
          @model="getModel"
        />
      </div>
    </OnClickOutside>
    <div v-if="!peending" class="flex items-center justify-between mt-8 2xl:mt-11 text-sm font-normal">
      <p class="text-neutral-black">
        <span class="text-primary-100 font-semibold">
          {{ properties.length}} resultados
        </span>
        encontrados
      </p>
    </div>
    <div class="mt-8 pb-14">
      <ul class="property-list" v-if="!peending">
        <li v-for="property in properties" :key="property">
          <MoleculesVehicle
            :property="property.auto"
            :property-id="property.advertisement_id"
          />
        </li>
      </ul>
      <div v-else class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      <div v-if="properties.length === 0 && !peending">
        <figure class="mb-4">
          <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
        </figure>
        <h6 class="text-4xl text-primary-100 font-bold mb-4 text-center">No hemos encontramos propiedades <br/>con estos resultados</h6>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { OnClickOutside } from '@vueuse/components';
import { ref } from 'vue';
const config = useRuntimeConfig();
const viewport = useViewport();

//Mostrar propiedades
let properties = ref([]);
let showFilters = ref(false);
const makeId = ref(null);
let priceType = useRoute().query.priceType;
let condition = useRoute().query.condition;
let price = useRoute().query.price || '';
const unitType = ref("KM");
const unit = ref("");
let year = useRoute().query.year || '';
let category = useRoute().query.category || [];
let model = useRoute().query.model || null;
let peending = ref(true);

function getCondition(x: string) {
  condition = x;
  getAds();
}

function getMake(make:null) {
  makeId.value = make.join();
  getAds();
}

function getModel(models:null) {
  model = models.join();
  getAds();
}

function getPriceType(priceTypes:null) {
  priceType = priceTypes;
  getAds();
}

function getPrice(prices:null) {
  price = prices;
  getAds();
}

function getUnitType(unitTypes: null) {
  unitType.value = unitTypes;
  getAds();
}

function getUnit(units: null) {
  unit.value = units;
  getAds();
}

function getYear(years:null) {
  console.log(years)
  year = years;
  getAds();
}

function getCategory(categorys: null) {
  category = categorys.join();
  getAds();
}

function getAds() {
  peending.value = true;
  const { data,pending } = useLazyFetch('advertisements/search', {
    method: 'GET',
    baseURL: config.public.API,
    params: {
      condition: condition,
      price_type: priceType,
      price: price,
      unit_type: unitType.value,
      unit: unit.value,
      year: year,
      categories: category,
      make_ids: makeId.value,
      model_ids: model
    },
    watch: [
      condition,
      priceType,
      price,
      unitType.value,
      unit.value,
      year,
      category,
      makeId.value,
      model
    ],
    transform(data) {
      properties.value = data.results.data;
    },
    onResponse({response}) {
      if(response.status === 200 ) {
        peending.value = false;
      }
    }
  });
}

getAds();
</script>

<style lang="postcss" scoped>
.swiper-slide {
  @apply flex-none w-[350px] !important;
}

.property-list {
  @apply grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5;
}

.search-button {
  @apply flex bg-primary-100 w-full sm:w-[230px] p-2 h-12 xl:w-10 xl:h-10 rounded-full items-center justify-center hover:bg-secondary-100 border-primary-100 border flex-none text-neutral-white;
}

/* .navigation-button {
  @apply rounded-sm cursor-pointer hover:text-neutral-white hover:font-bold hover:bg-primary-100 !important;
  &.active { @apply text-neutral-white font-bold bg-primary-100 !important; }
} */

.filters-overflow {
  @apply w-full sm:w-fit xl:mt-12 2xl:h-fit top-0 fixed xl:relative xl:flex flex-col 2xl:flex-row gap-4 2xl:gap-1.5 md:items-end bg-neutral-white right-0 2xl:mr-0 mt-0 px-4 md:px-6 md:py-12 xl:p-0 py-4 xl:py-0 z-[80] xl:z-10;
  @media (max-width:1280px) {
    @apply overflow-y-auto overflow-hidden border-l-2 border-l-gray-300 h-screen;
  }

  @media (max-width:720px) {
    @apply border-l-0;
  }
}

.skeleton {
  @apply border border-neutral-10 rounded-lg p-3;
  & .skeleton-image { @apply w-full md:h-72 h-[230px] bg-neutral-10 mb-3; }
  & .skeleton-date { @apply w-32 h-4 bg-neutral-10 mb-2; }
  & .skeleton-body { @apply w-4/5 h-4 bg-neutral-10; }
}
</style>