<template>
  <Head v-if=" advertisement">
    <Title>{{ advertisement.business.name }}</Title>
    <Meta name="title" :content="advertisement.business.name" />
    <Meta name="description" :content="advertisement.business.description" />
    <Meta property="og:type" content="article" />
    <Meta property="og:url" :content="currentUrl" />
    <Meta property="og:title" :content="advertisement.business.name" />
    <Meta property="og:description" :content="advertisement.business.description" />
    <Meta property="og:image" :content="advertisement.business.image" />
    <Meta property="og:image" :content="advertisement.business.image" />
    <Meta property="og:locale" content="es_ES" />
    <Meta name="twitter:card" :content="advertisement.business.image" />
  </Head>
  <div v-if="!pending" class="flex flex-nowrap items-center justify-center relative overflow-x-scroll bg-primary-100 bg-opacity-30">
    <NuxtImg
      v-if="advertisement.business.images.length > 1"
      v-for="image in advertisement.business.images"
      :src="`${image.image}`"
      :alt="advertisement.business.name"
      placeholder="/img/logo.png"
      class="w-auto h-[290px] object-cover"
    />
    <NuxtImg
      v-else
      v-for="image in advertisement.business.images"
      :src="`${image.image}`"
      :alt="advertisement.business.name"
      placeholder="/img/logo.png"
      class="w-full h-[290px] object-cover"
    />
  </div>
  <main v-if="!pending" class="lg:px-20 md:px-8 px-5">
    <section class="max-w-[1250px] mx-auto flex flex-col lg:px-5">
      <div class="relative flex lg:mb-[60px] mb-8 lg:flex-row flex-col pt-10 justify-between items-center">
        <figure class="bg-neutral-white p-6 w-[170px] h-[170px] border-2 rounded-lg flex items-center justify-center border-[#F5F5F5] absolute lg:-top-2/3 -top-1/4 ">
          <NuxtImg
            :src="advertisement.business.image"
            :alt="advertisement.business.name"
            placeholder="/img/logo.png"
          />
        </figure>
        <h2 class="lg:ml-[200px] mt-[90px] lg:mt-0 xl:text-5xl text-4xl font-semibold text-primary-100 mr-4 whitespace-nowrap">{{ advertisement.business.name}}</h2>
        <div class="flex gap-3.5 text-sm mt-4 lg:mt-0 flex-wrap md:justify-end justify-center">
          <p class="hour" :class="[ isOpen ? 'open' : 'closed']">
            <AtomsIcon name="general/clock" :size=32 class="absolute left-0 "/>
            {{ schedule_message }}
          </p>
          <p class="bussines-category">
            {{ category_type.name }}
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-[18px] text-sm leading-6 text-justify"> 
        <p class="text-gray-20">{{ advertisement.business.description }}</p>
      </div>
      <MoleculesCharacteristics
        :facebook="advertisement.business.facebook"
        :whatsapp="advertisement.business.whatsapp"
        :phone="advertisement.business.phone"
        :email="advertisement.business.email"
        :instagram="advertisement.business.instagram"
        :website="advertisement.business.webpage"
        :id="advertisement.id"
        class="contact-info"
      />
    </section>
    <section class="max-w-[1250px] mx-auto lg:px-5">
      <h3 class="w-full border-b border-b-[#F5F5F5] text-[28px] font-medium py-2.5 mb-5">
        Ubicación
      </h3>
      <div class="w-full pb-20">
        <ClientOnly>
          <iframe class="rounded-2xl w-full h-[240px]" :src="renderMap"></iframe>
        </ClientOnly>
      </div>
    </section>
  </main>
  <div class="p-16" v-if="pending">
    <OrganismSkeleton class="md:h-[560px] h-[360px] max-w-6xl mb-7" />
    <OrganismSkeleton class="w-40 h-8 mb-2" />
    <OrganismSkeleton class="w-80 h-8 mb-2" />
    <OrganismSkeleton class="w-40 h-8 mb-2" />
    <OrganismSkeleton class="w-96 h-8 mb-2" />
    <OrganismSkeleton class="w-40 h-8 mb-2" />
    <OrganismSkeleton class="w-24 h-8 mb-2" />
    <OrganismSkeleton class="w-40 h-8 mb-2" />
    <OrganismSkeleton class="w-80 h-8" />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const categories = useCategories().categories;
const {isOpen, actual_day, checkSchedule, schedule_message} = useRenderSchedule();
const category_type = ref(null);
const renderMap = ref(null);
const url = useRequestURL();
const route = useRoute();
const origin = computed(() => `${url.protocol}//${url.host}`);
const currentUrl = computed(() => `${origin.value}${route.fullPath}`);

const { data: advertisement, pending, error} = await useLazyFetch(`advertisements/${useRoute().params.id}`, {
  method: 'GET',
  baseURL: config.public.API,
  server: false,
  transform:(_advertisement) => _advertisement.results,
  onResponse({response}) {
    if(response.status === 400) {
      return navigateTo('/notFound')
    }
  }
});

watchEffect(()=> {
  if(advertisement.value != null) {
    category_type.value = categories.value.find(element => element.id === advertisement.value.business.business_category_id);
    renderMap.value = `https://maps.google.com/maps?q=${advertisement.value.business.latitude},${advertisement.value.business.longitude}&hl=es;z%3D14&amp&output=embed`;
    const days = [];
    advertisement.value.business.schedule.forEach(element => {
      days.push(element);
    });
    days.find((elex,i) => i === actual_day ? checkSchedule(elex) : '')

    useFetch(`statistics/lead/${advertisement.value.id}/profile_views`, {
      method: 'POST',
      baseURL: config.public.API,
    });
  }
});

watch(advertisement, () => {
  useSchemaOrg({
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: advertisement.value.business.name,
    image: advertisement.value.business.image,
    description: advertisement.value.business.description,
  });
})

definePageMeta({
  middleware: ["not-found"]
});
</script>

<style lang="postcss" scoped>
.hour{
  @apply flex  relative items-center justify-center rounded-lg h-8 pl-8 pr-2 before:mr-1 whitespace-nowrap;
  &.closed {
    @apply bg-[#FFE4E3] text-[#FF2625];
  }
  &.open {
    @apply bg-[#D3FFD5] text-[#4CAF50];
  }
}
.bussines-category{
  @apply text-primary-100 bg-[#F1F1F1] flex items-center justify-center text-center px-2 rounded-lg h-8;
}
.contact-info{
  @apply lg:gap-x-16 gap-x-8 bg-[#FCFCFC] py-6 px-10 rounded-2xl w-full items-center justify-center my-16 !important
  }
</style>
