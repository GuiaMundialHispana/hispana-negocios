<template>
	<main class="hero-bg">
		<span class="bg-overlay"></span>
		<h1 class="text-center relative z-10 leading-[52px] text-5xl">
			Te ayudamos a encontrar <br> 
			<strong>eso que necesitas</strong>
		</h1>
		<p class="text-center relative z-10 text-sm leading-[22px] mx-4" >Busca y encuentra ese negocio que necesitas en 
			<strong>
				Grupo Negocios & mas
			</strong>
			, el buscador <br hidden class="lg:block"> de negocios que te ofrece la mejor selección de opciones. 
		</p>
		<!--  -->
		<div class="filters-container relative">
			<label class="form-control">
				<AtomsIcon name="general/search" :size=24 class="text-secondary-100" />
				<input type="text" v-model="searchText" placeholder="¿Qué buscas?">
			</label>
			<label class="form-control relative">
				<AtomsIcon name="general/location" :size=24 class="text-secondary-100" />
				<button class="categories-btn" @click="displayCountry = !displayCountry">
					{{ checkedCountry.length < 1 ? 'Pais' : countryName }}
				</button>
				<OnClickOutside @trigger="displayCountry = false" class="absolute lg:top-14 top-16 left-0 w-full h-[270px] shadow-md" v-if="displayCountry">
					<div class="dropdown-wrapper scrollbar mt-[5px] min-h-max max-h-[273px]">
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
			<div class="form-control relative">
				<button class="categories-btn" @click="displayCategories = !displayCategories">
					{{ checkedCategories.length < 1 ? 'Categorías' : categoryName }}
				</button>
				<AtomsButtons v-if="displayCategories" icon-name="general/close" btn-type="btn-icon" class="close-btn" @click="displayCategories = false" />
				<OnClickOutside @trigger="displayCategories = false" class="absolute lg:top-14 top-16 left-0 w-full h-[270px] shadow-md" v-if="displayCategories">
					<div class="dropdown-wrapper scrollbar mt-[5px] min-h-max max-h-[273px]">
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
			</div>
			<button class="search-btn" @click="searchAds()">
				Buscar 
				<AtomsIcon name="general/search" :size=12 class="text-neutral-white "/>
			</button>
		</div>
	</main>
</template>
<script setup>
import {ref} from 'vue';
import { OnClickOutside } from '@vueuse/components';

const searchText = ref("");
const displayCountry = ref(false);
const countries = useGetCountry().countries;
const countryName = ref("");
const checkedCountry = ref([]);
const displayCategories = ref(false);
const checkedCategories = ref([]);
const categoryName = ref('');
const categories = useCategories().categories;

function searchAds() {
	useRouter().push({
		path: '/search', 
		query: {
			title: searchText.value,
			country: checkedCountry.value,
			categories: checkedCategories.value
		}
	});
}
</script>

<style scoped>
.hero-bg{
	background: url("/img/hero.jpg"), no-repeat center ;
	background-size: cover;
	@apply text-neutral-white relative z-20 flex flex-col gap-3.5 justify-center items-center h-[calc(100vh_-_64px)] lg:h-[calc(100vh_-_102px)]
}
.bg-overlay {
	@apply absolute bg-primary-100 h-full w-full top-0 opacity-60;
}
.filters-container{
	@apply lg:bg-neutral-white max-w-[950px] w-full rounded-full p-3 mx-4 mt-3 flex flex-col items-center lg:flex-row lg:justify-between relative z-20 gap-5 lg:gap-0;
}
.search-btn{
	@apply bg-primary-100 text-neutral-white rounded-full flex items-center justify-center px-6 py-3 ml-3 gap-4 font-normal hover:bg-secondary-100 ease-in-out duration-300 border-2 lg:border-none;
}
.form-control{
	@apply 
	bg-neutral-white rounded-full lg:rounded-none p-4 py-4 lg:py-0 w-[400px] items-center justify-between lg:w-full lg:first:pl-0 lg:border-l border-l-neutral-black first:border-none text-neutral-black flex gap-2.5;
	& input {
		@apply  outline-none appearance-none w-full;
	}
}
.close-btn{
	@apply flex flex-none border-none !important;
}

.categories-btn {
	@apply text-[#9ca3af] hover:text-primary-100 transition-all ease-in-out duration-150 w-full text-start bg-neutral-white;
}
</style>