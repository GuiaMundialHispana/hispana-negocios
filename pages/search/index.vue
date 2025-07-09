<template>
  <section class="lg:px-16 md:px-8 px-4 md:min-h-screen">
    <div class="flex flex-wrap gap-2 xl:flex-row flex-col">
      <div class="filters-container">
        <label class="form-control min-w-[250px]">
          <AtomsIcon name="general/search" :size=22 class="text-secondary-100" />
          <input type="text" v-model="title" placeholder="¿Qué buscas?">
        </label>
        <label class="form-control relative " :class="{'bg-[#e2ecf7]': displayCountry}">
          <AtomsIcon name="general/location" :size=26 class="text-secondary-100" />
          <button class="whitespace-nowrap" @click="displayCountry = !displayCountry">
            {{ checkedCountry.length < 1 ? 'País' : countryName }}
          </button>
          <OnClickOutside @trigger="displayCountry = false" class="absolute lg:top-12 top-11 left-0 sm:w-full h-fit z-10" v-if="displayCountry">
            <div class="dropdown-wrapper scrollbar h-fit w-[200px] shadow-md">
              <label class="checkbox-labels" v-for="country in countries" :key="country">
                <input
                  type="radio"
                  class="checkbox"
                  :name="country.name"
                  :id="country.name"
                  :value="country.id"
                  v-model="checkedCountry"
                  @click="countryName = country.name"
                >
                {{ country.name }}
              </label>
            </div>
          </OnClickOutside>
        </label>
        <label class="form-control relative min-w-[100px] cursor-pointer" :class="{'bg-[#e2ecf7]': displayCategories}">
          <button class="flex gap-2 whitespace-nowrap" @click="displayCategories = !displayCategories">
            <AtomsIcon name="general/tune" :size=22 class="text-secondary-100" />
            {{ checkedCategories.length < 1 ? 'Categorías' : categoryName }}
          </button>
          <OnClickOutside @trigger="displayCategories = false" v-if="displayCategories" class="absolute lg:top-12 top-11 left-0 sm:w-full h-fit">
            <div class="dropdown-wrapper scrollbar h-fit w-[200px] shadow-md absolute z-30">
              <label class="checkbox-labels" v-for="category in categories" :key="category">
                <input
                  type="radio"
                  class="checkbox"
                  :name="category.name"
                  :id="category.name"
                  :value="category.id"
                  v-model="checkedCategories"
                  @click="categoryName = category.name"
                >
                {{ category.name }}
              </label>
            </div>
          </OnClickOutside>
        </label>
        <AtomsButtons
          icon-name="general/close"
          btn-type="btn-icon"
          class="close-btn flex-none clearFilter-btn"
          @click="clearFilter()"
        />
      </div>
    </div>
    <div v-if="properties.length > 0" class="flex items-center justify-between mt-8 2xl:mt-11 text-sm font-normal">
      <p class="text-neutral-black">
        <span class="text-primary-100 font-semibold">
          {{ properties.length}} resultados
        </span>
        encontrados
      </p>
    </div>
    <div class="mt-8 pb-14">
      <ul class="property-list" v-if="!pending">
        <!-- <li v-for="property in properties" :key="property">
          <MoleculesBusiness :advertisement="property" :schedule="property.business.schedule" :category="property.business.business_category_id" />
        </li> -->
        <li v-for="property in propertiesVip" :key="property">
          <MoleculesBusiness :advertisement="property" :schedule="property.business.schedule" :category="property.business.business_category_id" />
        </li>
        <li v-for="property in propertiesExclusive" :key="property">
          <MoleculesBusiness :advertisement="property" :schedule="property.business.schedule" :category="property.business.business_category_id" />
        </li>
        <li v-for="property in propertiesSilver" :key="property">
          <MoleculesBusiness :advertisement="property" :schedule="property.business.schedule" :category="property.business.business_category_id" />
        </li>
        <li v-for="property in propertiesBasic" :key="property">
          <MoleculesBusiness :advertisement="property" :schedule="property.business.schedule" :category="property.business.business_category_id" />
        </li>
      </ul>
      <div v-if="properties.length === 0 && !pending" class="pt-20">
        <figure class="mb-4">
          <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
        </figure>
        <h6 class="text-4xl text-primary-100 font-bold mb-4 text-center">No hemos encontramos negocios <br/>con estos resultados</h6>
      </div>
      <div v-if="pending">
        <div class="skeleton">
          <div class="skeleton-image"></div>
          <div class="flex-grow">
            <div class="skeleton-date"></div>
            <div class="skeleton-body"></div>
            <div class="skeleton-date"></div>
            <div class="skeleton-body"></div>
          </div>
        </div>
        <div class="skeleton">
          <div class="skeleton-image"></div>
          <div class="flex-grow">
            <div class="skeleton-date"></div>
            <div class="skeleton-body"></div>
            <div class="skeleton-date"></div>
            <div class="skeleton-body"></div>
          </div>
        </div>
        <div class="skeleton">
          <div class="skeleton-image"></div>
          <div class="flex-grow">
            <div class="skeleton-date"></div>
            <div class="skeleton-body"></div>
            <div class="skeleton-date"></div>
            <div class="skeleton-body"></div>
          </div>
        </div>
        <div class="skeleton">
          <div class="skeleton-image"></div>
          <div class="flex-grow">
            <div class="skeleton-date"></div>
            <div class="skeleton-body"></div>
            <div class="skeleton-date"></div>
            <div class="skeleton-body"></div>
          </div>
        </div>
        <div class="skeleton">
          <div class="skeleton-image"></div>
          <div class="flex-grow">
            <div class="skeleton-date"></div>
            <div class="skeleton-body"></div>
            <div class="skeleton-date"></div>
            <div class="skeleton-body"></div>
          </div>
        </div>
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
let propertiesVip = ref([]);
let propertiesExclusive = ref([]);
let propertiesSilver = ref([]);
let propertiesBasic = ref([]);
let showFilters = ref(false);

const title = ref(useRoute().query.title || '');
const country = ref(useRoute().query.country || '');
const displayCountry = ref(false);
const countries = useGetCountry().countries;
const countryName = ref("");
const checkedCountry = ref([])
const checkedCategories = ref(useRoute().query.categories || "");
const categoryName = ref('');
const categories = useCategories().categories;
const displayCategories = ref(false);

const { data, pending, refresh } = useLazyFetch('advertisements/search', {
  method: 'GET',
  baseURL: config.public.API,
  params: {
    title : title,
    country: checkedCountry,
    categories: checkedCategories,
  },
  transform(data) {
    // properties.value = data.results.data;
    let response = data.results.data;
    propertiesVip.value = [];
    propertiesExclusive.value = [];
    propertiesSilver.value = [];
    propertiesBasic.value = [];
    properties.value = [];
    response.forEach(element => {
      if(element.plan_id === 1) propertiesVip.value.push(element)
      if(element.plan_id === 2) propertiesExclusive.value.push(element)
      if(element.plan_id === 3) propertiesSilver.value.push(element)
      if(element.plan_id === 4) propertiesBasic.value.push(element)
      properties.value.push(element)
    });
  },
});

watch(title, () => { refresh(); });
watch(country, () => { refresh(); });
watch(checkedCategories, () => { refresh(); });

function clearFilter() {
  title.value = "";
  checkedCountry.value = "";
  checkedCategories.value = "";
  refresh();
}
</script>

<style lang="postcss" scoped>
.skeleton {
  @apply border flex items-start border-neutral-10 rounded-lg p-3 gap-3 w-full mb-3;
  & .skeleton-image { @apply w-36 h-36 bg-neutral-10 mb-3; }
  & .skeleton-date { @apply w-full h-4 bg-neutral-10 mb-2 ; }
  & .skeleton-body { @apply w-4/5 h-4 bg-neutral-10 mb-2; }
}

.filters-container{
	@apply w-full p-3 md:mx-4 flex items-center relative z-10 gap-4 flex-wrap mt-5;
}
.form-control{
	@apply p-4 py-1.5 items-center w-full sm:w-fit border-2 rounded-lg text-neutral-black flex gap-2;
	& input {
		@apply outline-none appearance-none w-full;
	}
}
.clearFilter-btn{
  @media (max-width:640px) {
    @apply after:content-['Borrar_filtros'] w-full flex gap-2 !important
  }
}
</style>