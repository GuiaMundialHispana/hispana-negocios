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
        <div class="filters-container relative">
          <label class="form-control">
            <AtomsIcon name="general/search" :size=24 class="text-secondary-100" />
            <input type="text" v-model="title" placeholder="¿Qué buscas?">
          </label>
          <label class="form-control">
            <AtomsIcon name="general/location" :size=24 class="text-secondary-100" />
            <input type="text" placeholder="¿Dónde?">
          </label>
          <div class="form-control relative">
            <button class="categories-btn" @click="showCategory = !showCategory">Categorías</button>
            <OnClickOutside @trigger="showCategory = false" v-if="showCategory" class="absolute lg:top-14 top-16 left-0 w-full h-[270px] shadow-md">
              <div class="dropdown-wrapper scrollbar mt-[5px] min-h-max max-h-[273px]">
                <label class="checkbox-labels" v-for="category in businessCategories" :key="category" :for="category">
                  <input
                    type="checkbox"
                    class="checkbox"
                    :name="category"
                    :value="category"
                    :id="category"
                  >
                  {{ category }}
                </label>
              </div>
            </OnClickOutside>
          </div>
          <AtomsButtons
            icon-name="general/close"
            btn-type="btn-icon"
            class="close-btn flex-none"
            @click="clearFilter()"
          />
        </div>
      </div>
    </OnClickOutside>
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
        <li v-for="property in properties" :key="property">
          <MoleculesBusiness :advertisement="property" />
        </li>
      </ul>
      <div v-if="properties.length === 0 && !pending" class="pt-20">
        <figure class="mb-4">
          <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
        </figure>
        <h6 class="text-4xl text-primary-100 font-bold mb-4 text-center">No hemos encontramos propiedades <br/>con estos resultados</h6>
      </div>
      <div v-if="pending" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    </div>
  </section>
</template>

<script lang="ts" setup>
import { OnClickOutside } from '@vueuse/components';
import { ref } from 'vue';

const config = useRuntimeConfig();
const viewport = useViewport();
const countries = useGetCountry().countries;

//Mostrar propiedades
let properties = ref([]);
let showFilters = ref(false);

const title = ref(useRoute().query.title || '');
const country = ref(useRoute().query.country || '');
const categories = ref(useRoute().query.categorySeleted || []);
const showCategory = ref(false);
const businessCategories = ref([
	"Restaurante",
  "Cafetería",
  "Tienda de ropa",
  "Salón de belleza",
  "Supermercado",
  "Farmacia",
  "Gimnasio",
  "Librería",
  "Taller mecánico",
  "Peluquería",
  "Spa",
  "Panadería",
  "Tienda de electrónica",
  "Cervecería",
  "Joyería",
  "Veterinaria",
  "Agencia de viajes",
  "Estudio de diseño",
  "Estudio de fotografía",
  "Florería",
  "Tienda de música",
  "Estudio de tatuajes",
  "Estudio de yoga",
  "Tienda de muebles",
  "Bar",
  "Pizzería",
  "Cine",
  "Teatro",
  "Agencia inmobiliaria",
]);

const { data, pending, refresh } = useLazyFetch('advertisements/search', {
  method: 'GET',
  baseURL: config.public.API,
  params: {
    title : title,
    country: country,
    category: categories,
  },
  transform(data) {
    properties.value = data.results.data;
  },
});

watch(title, () => { refresh(); });
watch(country, () => { refresh(); });
watch(title, () => { refresh(); });

function clearFilter() {
  title.value = "";
  country.value = "";
  categories.value = "";
  refresh();
}
</script>

<style lang="postcss" scoped>
.swiper-slide {
  @apply flex-none w-[350px] !important;
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


.filters-container{
	@apply lg:bg-neutral-white max-w-[950px] w-full rounded-full p-3 mx-4 mt-3 flex flex-col items-center lg:flex-row lg:justify-between relative z-20 gap-5 lg:gap-0;
}

.form-control{
	@apply 
	bg-neutral-white rounded-full lg:rounded-none p-4 py-4 lg:py-0 w-[400px] items-center justify-between lg:w-full lg:first:pl-0 lg:border-l border-l-neutral-black first:border-none text-neutral-black flex gap-2.5;
	& input {
		@apply  outline-none appearance-none w-full;
	}
}
</style>