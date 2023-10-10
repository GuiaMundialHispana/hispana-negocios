<template>
  <div class="absolute left-0 bottom-[-6%] text-[#232323] z-10">
    <div class="flex items-center overflow-hidden rounded-lg border-2 border-gray-100 bg-neutral-white text-[#232323] shadow-sm w-fit flex-none filterStatus-tabs-lg">
      <AtomsButtons
        v-for="(btn,i) in types"
        @click="condition = btn.getType; btnSelected = i"
        :class="{active: i === btnSelected}"
        :key="btn">
        {{btn.name}}
      </AtomsButtons>
    </div>
    <div class="filter-home-wrapper">
      <div class="h-full flex justify-center">
        <button class="filter-btn" @click="toggleList('brand')">
          <div class="icon-container">
            <AtomsIcon class="text-primary-100" name="general/car" :size=20 />
          </div>
          <div>
            <h2>Marca</h2>
            <p>
              Todas las marcas 
              <AtomsIcon class="pl-2 text-primary-100" name="arrows/arrow-down" :size=15 />
            </p>
          </div>
        </button>
        <OnClickOutside @trigger="toggleList('brand')" class="absolute top-[95%] w-[288px] h-[273px]" v-if="dropdownLists.brand">
          <div class="dropdown-wrapper scrollbar mt-[5px] min-h-max max-h-[273px]">
            <label class="checkbox-labels" :for="category.name" v-for="category in makes" :key="category.id">
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
      <!-- Modelo -->
      <span class="buttons-separation" v-if="showModels"></span>
      <div class="flex justify-center" v-if="showModels">
        <button class="filter-btn" :class="{'active': dropdownLists.model}" @click="toggleList('model')">
          <div class="icon-container">
            <AtomsIcon class="text-primary-100" name="general/car_model" :size=20 />
          </div>
          <div>
            <h2>Modelo</h2>
            <p>Todos los modelos
              <AtomsIcon class="pl-2 text-primary-100" name="arrows/arrow-down" :size=15 />
            </p>
          </div>
        </button>
        <OnClickOutside @trigger="toggleList('model')" class="absolute top-[95%] w-[288px] h-[273px]" v-if="dropdownLists.model">
          <div class="dropdown-wrapper scrollbar mt-[5px] min-h-max max-h-[273px]">
            <label class="checkbox-labels" :for="model.name" v-for="model in models" :key="model.id">
              <input
                type="radio"
                class="checkbox"
                name="model"
                v-model="model_id"
                :value="model.id"
                :id="model.name"
              >
              {{ model.name }}
            </label>
          </div>
        </OnClickOutside>
      </div>
      <!-- Año -->
      <span class="buttons-separation"></span>
      <div class="h-full flex justify-center">
        <button class="filter-btn" :class="{'active': dropdownLists.year}" @click="toggleList('year')">
          <div class="icon-container">
          <AtomsIcon class="text-primary-100" name="general/calendar" :size=20 />
        </div>
        <div>
          <h2>Año</h2>
          <p>Años del vehículo
            <AtomsIcon class="pl-2 text-primary-100" name="arrows/arrow-down" :size=15 />
          </p>
        </div>
        </button>
        <OnClickOutside @trigger="toggleList('year')" v-if="dropdownLists.year" class="dropdown w-[238px] h-fit">
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
            @input="UpdateYears"
          />
          <p class="whitespace-normal text-sm font-medium">
            Desde <b>{{ minYearValue }}</b>
            hasta <b>{{ maxYearValue }}</b>
          </p>
        </OnClickOutside>
      </div>
      <!-- Precio -->
      <span class="buttons-separation" v-show="viewport.isGreaterThan('lg')"></span>
      <div class="h-full flex justify-center" v-show="viewport.isGreaterThan('lg')">
        <button class="filter-btn" :class="{'active': dropdownLists.priceRange}" @click="toggleList('priceRange')">
          <div class="icon-container">
          <AtomsIcon class="text-primary-100" name="general/price" :size=20 />
        </div>
        <div>
          <h2>Rango de precio</h2>
          <p>Selecciona el rango de precio
            <AtomsIcon class="pl-2 text-primary-100" name="arrows/arrow-down" :size=15 />
          </p>
        </div>
        </button>
        <OnClickOutside @trigger="toggleList('priceRange')" v-if="dropdownLists.priceRange" class="dropdown w-[238px] h-fit">
          <p class="flex justify-between text-base text-neutral-black">
            Precio
            <label for="RD" class="price-btn ml-auto">
              <input type="radio" id="RD" value="RD" name="currency" checked v-model="picked">
            </label>
            <label for="USD" class="price-btn">
              <input type="radio" id="USD" value="USD" name="currency" v-model="picked">
            </label>
          </p>
          <MultiRangeSlider class="mx-auto mt-[14px] w-[200px]"
            baseClassName="multi-range-slider-bar-only"
            :min="0"
            :max="maxPrice"
            :step="priceRangeSteps"
            :ruler="false"
            :label="false"
            :minValue="priceMinValue"
            :maxValue="priceMaxValue"
            @input="UpdatePriceValues"
          />
          <p class="whitespace-normal text-sm font-medium">
            Desde <b>{{picked}}${{ showPriceMaxValue }}</b>
            hasta <b>{{picked}}${{ showBarMaxValue }}</b>+
            {{publishedBooksMessage  }}
          </p>
        </OnClickOutside>
      </div>
      <span class="buttons-separation"></span>
      <button class="filter-btn rounded-btn" @click="searchProperties()">
        <AtomsIcon class="text-neutral-white" name="general/search" :size=22 />
      </button>
    </div>
  </div>
</template>

<script setup>
  import { OnClickOutside } from '@vueuse/components';
  const viewport = useViewport();
</script>

<script>
import  MultiRangeSlider  from "multi-range-slider-vue";
export default {
  data() {
    return {
      btnSelected:0,
      route: useRoute(),
      config:useRuntimeConfig(),
      types:[
        {
          getType: 'New',
          name: 'Nuevos'
        },
        {
          getType: 'Used',
          name: 'Usados'
        },
      ],
      dropdownLists: {
        brand: false,
        model: false,
        version: false,
        year: false,
        priceRange: false,
      },
      priceMinValue:0,
      priceMaxValue:10000000,
      showPriceMaxValue: '0',
      showBarMaxValue:"10,000,000",
      maxPrice: 50000000,
      categories: [],
      category_id: [],
      state_id:0,
      picked:'RD',
      price:'',
      priceRangeSteps: 500000,
      minYear: 1998,
      maxYear: 2024,
      minYearValue: 2007,
      maxYearValue: 2021,
      year: null,
      status:'',
      queryBody: {},
      condition: 'New',
      sendType: '',
      ready: true,
      makes: null,
      make_id: null,
      models: [],
      model_id:null,
      showModels: false
    }
  },
  components: {
    MultiRangeSlider
  },
  methods: {
    UpdatePriceValues(e) {
      this.priceMinValue = e.minValue;
      this.priceMaxValue = e.maxValue;
      this.showPriceMaxValue = this.priceMinValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.showBarMaxValue = this.priceMaxValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.price = this.priceMinValue.toString() + '-' + this.priceMaxValue.toString();
    },
    UpdateYears(e) {
      this.minYearValue = e.minValue;
      this.maxYearValue = e.maxValue;
      this.year = this.minYearValue.toString() + '-' + this.maxYearValue.toString();
    },
    toggleList(list) {
      if (this.dropdownLists[list]) {
        setTimeout(() => {
          this.dropdownLists[list] = false;
        }, 50);
      } else { this.dropdownLists[list] = true; }
    },
    async searchProperties() {
      // console.log(this.queryBody)
      useRouter().push({
        path: '/search', 
        query: this.queryBody 
      })
    },
    async getCategories() {
      const categoriesApi = await $fetch(this.config.public.API+'generals/categories');
      this.categories = categoriesApi.results;
    },
    async getMakes() {
      const makes = await $fetch(this.config.public.API+'generals/makes');
      this.makes = makes.results;
    },
    async getModels(model) {
      this.models = [];
      const { data,pending } = await useFetch(`generals/models/${model}`, {
        baseURL: this.config.public.API,
        transform(data){
          return data.results;
        }
      });
      if(!pending.value) {
        this.models.push(data.value);
        this.showModels = true;
      }
    },
  },
  watch: {
    picked(newPicked) {
      this.queryBody.priceType = newPicked;
      if (newPicked === 'USD') {
        this.priceMinValue = 0,
        this.priceMaxValue = 1000000,
        this.showPriceMaxValue = '0';
        this.showBarMaxValue = '1,000,000';
        this.maxPrice = 3000000;
        this.priceRangeSteps = 50000;
      } else{
        this.priceMinValue = 0,
        this.priceMaxValue = 10000000,
        this.showPriceMaxValue = '0';
        this.showBarMaxValue = '10,000,000';
        this.maxPrice = 50000000;
        this.priceRangeSteps = 500000;
      }
    },
    price(price) {
      this.queryBody.price = price;
    },
    condition(route) {
      this.queryBody.condition = route;
    },
    year(year) {
      this.queryBody.year = year;
    },
    category_id(makes) {
      this.queryBody.category = makes.join();
      if(makes.length > 1) {
        this.showModels = false;
        return true;
      } else {
        this.getModels(makes);
      }
    },
    model_id(model) {
      this.queryBody.model = model;
    }
  },
  mounted() {
    this.getMakes();
    this.getCategories();
    this.queryBody.condition = this.condition;
    this.queryBody.priceType = this.picked;
  }
}
</script>

<style lang="postcss" scoped>
.filter-home-wrapper {
  @apply overflow-hidden flex items-center w-fit h-[101px] bg-neutral-white rounded-2xl shadow-xl mt-3;
}
.filter-btn{
  @apply flex items-center h-full px-6 text-left;

  & h2{ @apply text-xl leading-8 font-semibold; }
  & p { @apply text-sm leading-[22px] flex items-center whitespace-nowrap;}

  &.rounded-btn{
    @apply justify-center rounded-full h-14 w-14 mx-6 px-0 bg-primary-100 hover:bg-secondary-100 flex-none; 
  }
}
.icon-container{
  @apply w-9 h-9 flex items-center justify-center mr-2.5 border-2 rounded-lg border-gray-300;
}
.buttons-separation{
  @apply w-[2px] h-16 bg-gray-300;
}
.sector-filter-btn{
  @apply flex justify-between items-center w-full border-2 rounded-lg border-gray-100 mt-2.5 font-normal text-sm leading-[22px] h-10 px-2.5 first:mt-0 hover:bg-secondary-100 hover:border-primary-100;
  &.active{
    @apply border-primary-100 hover:bg-neutral-white;
  }
}

/*  */

.filterStatus-tabs-lg {
  & .btn { @apply flex items-center text-neutral-black border-none bg-neutral-white relative before:w-0.5 before:h-3/4 before:bg-primary-100 before:block before:absolute before:left-0 before:top-1/2 before:-translate-y-2/4 hover:bg-secondary-100 hover:text-neutral-white hover:before:hidden first:before:hidden rounded-none !important;
    &.active {
      @apply bg-primary-100 text-neutral-white before:hidden font-semibold !important;
      & + button { @apply before:hidden !important }
    }
  }
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
.dropdown{
  @apply absolute top-[95%] bg-neutral-white border-2 border-gray-100 rounded-lg p-2.5 shadow-md;
}
</style>