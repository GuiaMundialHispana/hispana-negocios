<template>
  <article class="flex border-b-2 rounded-2xl p-6 gap-12 border-b-gray-300">
    <figure class="bg-neutral-white min-w-[170px] flex items-center justify-center">
      <img :src="useRuntimeConfig().public.IMAGE_ROUTE+advertisement.business.image" :alt="advertisement.business.name">
    </figure>
    <div class="flex flex-col gap-[18px]">
      <div class="flex justify-between">
        <h2 class="text-primary-100 font-semibold text-xl h-fit">
          {{ advertisement.business.name }}
        </h2>
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