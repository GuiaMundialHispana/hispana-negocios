<template>
  <section>
    <swiper
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }"
      :spaceBetween="10"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="[SwiperNavigation,SwiperThumbs]"
      class="swiper-hero">
        <swiper-slide
          @click="showModal = true"
          v-for="image in images" :key="image"
        >
          <div class="overlay">
            <AtomsIcon name="general/zoom" :size=35 class="text-neutral-white" />
          </div>
          <img :src="`https://hispana-autos-3284x.ondigitalocean.app/${image.image}`" class="w-full h-full object-cover rounded-lg" />
        </swiper-slide>
        <atoms-property-plans :plan-type="renderPlanText" plan-position="top" />
    </swiper>
    <!--  -->
    <!-- Thumbs -->
    <swiper
      @swiper="setThumbsSwiper"
      :spaceBetween="10"
      class="swiper-thumbs"
      :breakpoints="{
        320: { direction: 'horizontal' },
        1280: { direction: 'vertical' },
      }"
    >
      <swiper-slide v-for="image in images" :key="image">
        <img :src="`https://hispana-autos-3284x.ondigitalocean.app/${image.image}`" class="w-full h-full object-cover rounded-lg" />
      </swiper-slide>
    </swiper>
    <!-- Zoom image -->
    <PopulationSearchDetailModalZoomSlides
      :modalImages="images"
      @close="showModal = false"
      v-show="showModal"
    />
  </section>
</template>

<script>
import { ref } from 'vue';
import { Thumbs } from 'swiper';
export default {
  props: ['images','planType'],
  setup(props) {
    const thumbsSwiper = ref(null);
    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };
    const showModal = ref(false);
    const renderPlanText = computed(() => {
      if(props.planType === 1) {
        return 'vip';
      } else if (props.planType === 3 ) {
        return 'silver';
      } else if ( props.planType === 2) {
        return 'exclusive';
      } else if(props.planType === 4 ) {
        return 'destacado';
      }
    });
    return { Thumbs, thumbsSwiper, setThumbsSwiper, showModal, renderPlanText};
  },
}
</script>

<style lang="postcss" scoped>

section {
  @apply md:px-14 px-4 mb-10 gap-5 mt-8 2xl:max-w-[1440px] mx-auto grid xl:grid-cols-[auto,205px];
}

.swiper-hero {
  @apply md:h-[560px] h-[360px] max-w-6xl flex-grow m-0 !important;

  & .swiper-wrapper {
    @apply h-full w-full rounded-lg overflow-hidden m-0;
  }

  & > span { @apply absolute z-10 rounded-lg top-4 left-4 h-8 !important; }

  & .overlay { @apply bg-neutral-black bg-opacity-50 z-[65] absolute w-full h-full bottom-0 left-0 hidden items-center justify-center p-4 cursor-pointer; }

  & .swiper-slide:hover > .overlay { @apply flex; }

}

.swiper-thumbs {
  @apply xl:w-52 w-full xl:h-[560px] h-32 ;

  & .swiper-wrapper {
    @apply w-52 h-full m-0 !important;

    & .swiper-slide { @apply w-52 h-32 xl:mx-0 mr-4 mb-4 object-cover !important; }
  }
}

.swiper-slide { @apply rounded-lg overflow-hidden relative !important; }
</style>