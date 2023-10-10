<template>
  <div class="modal-container" @keyup.esc="$emit('close')" tabindex="0">
    <AtomsButtons btn-type="btn-icon" icon-name="general/close" @click="$emit('close')"/>
    <OnClickOutside @trigger="$emit('close')">
      <swiper
        :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }"
        :spaceBetween="10"
        :navigation="true"
        :modules="[SwiperFreeMode,SwiperNavigation]"
        class="swiper-hero"
      >
        <swiper-slide v-for="image in modalImages" :key="image">
          <img :src="`https://hispana-autos-3284x.ondigitalocean.app/${image.image}`" class="w-full h-full object-cover rounded-lg">
        </swiper-slide>
      </swiper>
    </OnClickOutside>
  </div>
</template>
<script setup>
  import { OnClickOutside } from '@vueuse/components';
</script>
<script>
export default {
  props: {
    modalImages: {
      type: null
    }
  }
}
</script>

<style lang="postcss" scoped>
.modal-container {
  @apply bg-neutral-black bg-opacity-60 left-0 fixed z-[60] top-0 w-full h-full pt-20 pb-16 px-4;

  & .swiper-hero {
    @apply max-w-5xl mx-auto !important;
  }
}
</style>  