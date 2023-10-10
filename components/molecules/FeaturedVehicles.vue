<template>
  <article>
    <AtomsPropertyPlans class="property-type-component" :planType="plantype" planPosition="top" />
    <AtomsButtons
      btn-type="btn-icon"
      icon-name="general/favorite"
      class="favorite-button"
      @click="toggleFavorite()"
      v-if="$route.fullPath != '/profile?tab=anuncio'"
    />
    <Swiper
      :modules="[SwiperFreeMode, SwiperNavigation]"
      :effect="'fade'"
      :lazy="true"
      slides-per-view="auto"
      :space-between="2"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: true
      }"
      :navigation="{
        nextEl: '.nextF',
        prevEl: '.prevF'
      }"
    >
      <nav>
        <AtomsButtons
          class="prevF"
          btn-type="btn-icon"
          btn-size="xsmall"
          btn-style="outline-gray"
          icon-name="arrows/arrow-left"
          :icon-size=15
        />
        <AtomsButtons
          class="nextF"
          btn-type="btn-icon"
          btn-size="xsmall"
          btn-style="outline-gray"
          icon-name="arrows/arrow-right"
          :icon-size=15
        />
      </nav>
      <swiper-slide v-for="image in property.images" :key="image">
        <NuxtLink :to="{
          path: `/search/${property.title}`,
          query: {
            property_id: propertyId
          }
        }" class="h-[254px] relative flex justify-center pb-2 bg-gray-10 rounded-lg figure">
          <img
            :src="`https://hispana-autos-3284x.ondigitalocean.app/${image.image}`"
            :alt="property.title"
            class="object-cover h-full w-full absolute top-0 left-0 rounded-lg"
          >
          <p class="property-name">{{ property.title }}</p>
        </NuxtLink>
      </swiper-slide>
    </Swiper>
    <MoleculesCharacteristics
      :year="property.year"
      :mileage="property.mileage"
      :location="property.location"
      class="my-3 justify-center"
    />
    <p class="title-price">Desde:</p>
    <p class="price">US${{ showParsedPrice(property.price_us) }}</p>
  </article>
</template>

<script>
export default {
  props: {
    plantype: {
      type: String,
      default: "exclusive"
    },
    property: {
      type: Object,
      default: () => {}
    },
    propertyId: {
      type: Number
    }
  },
  methods: {
    showParsedPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  }
}
</script>

<style lang="postcss" scoped>
article {
  @apply rounded-2xl p-2 w-full sm:w-[350px] bg-neutral-white shadow-sm border border-gray-10 relative;

  & .property-type-component { @apply absolute left-2 z-10 top-2 rounded-tl-lg; }

  & nav {
    @apply hidden absolute top-1/2 z-10 w-full justify-between px-4; 
    & button { @apply bg-neutral-white hover:bg-primary-100 border-none !important; }
  }

  & .swiper {
    & .property-name {
      @apply text-neutral-white z-10 relative font-semibold text-2xl mt-auto text-center overflow-hidden truncate whitespace-nowrap w-11/12;
    } 
  }
  & .swiper:hover > nav { @apply flex; }
  
  & .title-price { @apply text-sm text-neutral-black text-center font-normal; }
  & .price { @apply text-primary-100 font-semibold text-xl uppercase text-center; }

  & .figure {
    @apply relative;
    @apply before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-[5] before:rounded-lg;
    &::before {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 60%, #000 100%);
    }
  }

  .favorite-button {
    @apply absolute right-4 top-4 z-[5] bg-neutral-white border border-secondary-100 hover:bg-secondary-100 text-[#ADADAD] hover:text-neutral-white !important;
    &.active { @apply bg-primary-100 text-neutral-white hover:bg-secondary-100 !important; }
  }
}
</style>