<template>
  <section v-if="property && property.length > 0">
    <div class="flex justify-between border-b border-[#F5F5F5] py-2 mb-6">
      <h2 class="text-[28px] leading-8 text-center md:text-left mx-auto md:mx-0 font-medium">
        Vehículos VIP
      </h2>
      <nav class="hidden md:flex gap-4" v-if="property.length >= 4">
        <AtomsButtons class="prevVIP" btn-type="btn-icon" btn-style="outline-gray" icon-name="arrows/arrow-left" btn-size="xsmall" :icon-size=15 />
        <AtomsButtons class="nextVIP" btn-type="btn-icon" btn-style="outline-gray" icon-name="arrows/arrow-right" btn-size="xsmall" :icon-size=15 />
      </nav>
    </div>
    <Swiper
      v-if="property"
      :modules="[SwiperFreeMode, SwiperNavigation, SwiperAutoplay]"
      :effect="'fade'"
      :lazy="true"
      :space-between="32"
      slides-per-view="auto"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: true
      }"
      :navigation="{
        nextEl: '.nextVIP',
        prevEl: '.prevVIP'
      }"
    >
      <swiper-slide v-for="plan in property" :key="plan">
        {{ plan.name }}
        <MoleculesFeaturedVehicles :property-id="plan.id" plantype="vip" :property="plan.auto" />
      </swiper-slide>
    </Swiper>
    <Swiper
      v-if="pending"
      :modules="[SwiperFreeMode, SwiperNavigation, SwiperAutoplay]"
      :effect="'fade'"
      :lazy="true"
      :space-between="32"
      slides-per-view="auto"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: true
      }"
      :navigation="{
        nextEl: '.nextVIP',
        prevEl: '.prevVIP'
      }"
    >
      <swiper-slide v-for="index in 5" :key="index">
        <div class="skeleton">
          <div class="skeleton-image"></div>
          <div class="skeleton-date"></div>
          <div class="skeleton-body"></div>
        </div>
      </swiper-slide>
    </Swiper>
  </section>
</template>

<script setup>
const config = useRuntimeConfig();

const { data: property, pending, error} = await useFetch('advertisements/home?plan=1', {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_property) => _property.results.data
});
</script>

<style lang="postcss" scoped>
section { @apply pt-6 md:pt-14 lg:px-16 md:px-6 px-4 mx-auto max-w-[97rem]; }
.swiper-slide { @apply md:w-max; }

.skeleton {
  @apply border border-neutral-10 rounded-lg p-3 w-[350px];
  & .skeleton-image { @apply w-full md:h-72 h-[230px] bg-neutral-10 mb-3; }
  & .skeleton-date { @apply w-32 h-4 bg-neutral-10 mb-2; }
  & .skeleton-body { @apply w-4/5 h-4 bg-neutral-10; }
}
</style>