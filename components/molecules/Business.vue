<template>
  <article class="flex lg:flex-row flex-col border-b-2 rounded-2xl rounded-br-none rounded-bl-none p-6 gap-12 border-b-gray-300 w-full">
    <NuxtLink :to="`/search/${advertisement.business.name}`" @click="saveId(advertisement.advertisement_id)">
      <figure class="bg-neutral-white lg:w-[170px] w-full h-[170px] flex items-center justify-center">
        <img :src="advertisement.business.image" :alt="advertisement.business.name" class="w-full h-full object-cover object-top">
      </figure>
    </NuxtLink>
    <div class="flex flex-col gap-[18px] flex-grow">
      <div class="flex justify-between w-full lg:flex-row flex-col">
        <NuxtLink :to="`/search/${advertisement.business.name}`" @click="saveId(advertisement.advertisement_id)" class="text-primary-100 font-semibold text-xl h-fit">
          {{ advertisement.business.name }}
        </NuxtLink>
        <div class="flex gap-3.5 text-sm">
          <p class="hour" :class="{closed: !open}">
            <AtomsIcon name="general/clock" :size=32 class="absolute left-0 "/>
            8:00 a.m. -  5:00 p.m.
          </p>
          <p class="bussines-category">
            {{ category_type.name }}
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-[18px] text-sm leading-6"> 
        <p class="flex items-center gap-2 text-primary-100">
          <AtomsIcon name="general/business_location" :size=24 class="text-primary-100"/>
          {{  advertisement.business.address }}
        </p>
        <p class="text-gray-20">
          {{ advertisement.business.description }}
        </p>
      </div>
      <MoleculesCharacteristics
        :facebook="advertisement.business.facebook"
        :whatsapp="advertisement.business.whatsapp"
        :phone="advertisement.business.phone"
        :email="advertisement.business.email"
        :instagram="advertisement.business.instagram"
        :website	="advertisement.business.webpage"
      />
    </div>
  </article>
</template>

<script setup>
const open = ref(true);
const categories = useCategories().categories;

const category_type = categories.value.find(element => element.id === props.advertisement.business.business_category_id)

const props = defineProps({
  advertisement: {
    type: Object,
    default: () => {}
  }
});

function saveId(propertyId) {
  sessionStorage.setItem('propertyId', propertyId);
};
</script>

<style lang="postcss" scoped>
  .hour{
    @apply flex bg-[#D3FFD5] text-[#4CAF50] relative items-center justify-center rounded-lg h-8 pl-8 pr-2 before:content-['Abierto:'] before:mr-1 whitespace-nowrap;
    &.closed {
      @apply bg-[#FFE4E3] text-[#FF2625] before:content-['Cerrado:'];
    }
  }
  .bussines-category{
    @apply text-primary-100 bg-[#F1F1F1] flex items-center justify-center text-center px-2 rounded-lg;
  }
</style>