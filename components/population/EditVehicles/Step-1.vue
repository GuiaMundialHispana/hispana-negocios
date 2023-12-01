<script lang="ts" setup>
import { usePostsStore } from '~/stores/Post';

const use_posts = usePostsStore();
const config = useRuntimeConfig();
let categorySelected = ref(0);

const { data, pending } = useLazyFetch('generals/categories', {
  baseURL: config.public.API
});

categorySelected.value = use_posts.category_id;
watch(categorySelected,(value) => {
  use_posts.category_id = value;
});

const emit = defineEmits(['back', 'nexts'])
</script>

<template>
  <h4>
    Selecciona la categoría de tu <span class=" text-secondary-100"> negocio </span>
  </h4>
  <div class="wrapper" v-if="pending">
    <div class="w-96 h-5 skeleton rounded-lg mb-4"></div>
    <hr class="border-b border-neutral-10 mb-4 block">
    <div class="w-40 h-5 skeleton rounded-lg mb-4"></div>
    <hr class="border-b border-neutral-10 mb-4 block">
    <div class="w-96 h-5 skeleton rounded-lg mb-4"></div>
    <hr class="border-b border-neutral-10 mb-4 block">
    <div class="w-40 h-5 skeleton rounded-lg mb-4"></div>
    <hr class="border-b border-neutral-10 mb-4 block">
    <div class="w-96 h-5 skeleton rounded-lg mb-4"></div>
    <hr class="border-b border-neutral-10 mb-4 block">
    <div class="w-40 h-5 skeleton rounded-lg mb-4"></div>
    <hr class="border-b border-neutral-10 mb-4 block">
    <div class="w-96 h-5 skeleton rounded-lg mb-4"></div>
    <hr class="border-b border-neutral-10 mb-4 block">
    <div class="w-40 h-5 skeleton rounded-lg mb-4"></div>
    <hr class="border-b border-neutral-10 mb-4 block">
    <div class="w-96 h-5 skeleton rounded-lg mb-4"></div>
    <hr class="border-b border-neutral-10 mb-4 block">
    <div class="w-40 h-5 skeleton rounded-lg mb-4"></div>
    <hr class="border-b border-neutral-10 mb-4 block">
    <div class="w-96 h-5 skeleton rounded-lg mb-4"></div>
    <hr class="border-b border-neutral-10 mb-4 block">
    <div class="w-40 h-5 skeleton rounded-lg mb-4"></div>
    <hr class="border-b border-neutral-10 mb-4 block">
  </div>
  <div v-if="data && !pending" class="wrapper scrollbar">
    <label
      v-for="category in data.results"
      :key="category"
      class="option"
      :class="[{checked: use_posts.category_id === category.id}]">
      <input type="radio" :value="category.id" v-model="use_posts.category_id">
      {{ category.name }}
    </label>
  </div>
  <nav class="control-steps-PostBussines">
    <AtomsLink btn-style="outline-primary" link-to="/profile?tab=anuncio">
      Cancelar
    </AtomsLink>
    <AtomsButtons @click="emit('nexts')" :disabled="use_posts.category_id === 0">
      Continuar
    </AtomsButtons>
  </nav>
</template>

<style lang="postcss" scoped>
h4 {
  @apply font-semibold text-[28px] leading-[42px] mt-11 mb-7 text-center;
}
.wrapper {
  @apply max-w-[971px] h-[490px]  overflow-y-scroll hover:overscroll-contain mx-auto px-5;
}

.option {
  @apply cursor-pointer select-none flex items-center font-normal text-base  leading-[22px] border-b h-[70px] border-b-gray-100 hover:bg-secondary-100 px-4;
  &.checked {
    @apply bg-primary-100 text-neutral-white font-semibold text-lg;
  }
  & input { @apply appearance-none; }
}

.scrollbar {
  &::-webkit-scrollbar {
    @apply lg:w-[68px] w-[28px];
  }

  &::-webkit-scrollbar-track {
    @apply bg-neutral-white rounded-full;
  }

  &::-webkit-scrollbar-thumb {
    @apply lg:border-[30px] border-[10px] border-solid border-neutral-white rounded-full bg-[#C1C1C1];
  }
}
</style> 