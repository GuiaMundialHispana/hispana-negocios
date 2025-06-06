<template>
  <footer class="w-full bg-neutral-white text-primary-100 py-16 shadow-inner">
    <div class="lg:px-16 px-4 grid md:grid-cols-12 grid-cols-1 md:gap-x-8 gap-y-6 items-start 2xl:max-w-screen-2xl 2xl:mx-auto">
      <div class="xl:col-span-3 col-span-12">
        <figure class="mb-6">
          <NuxtLink to="/">
            <img src="/img/logo.svg" class="w-60 mx-auto" alt="Grupo Negocios & mas" />
          </NuxtLink>
        </figure>
      </div>
      <div class="xl:col-span-3 col-start-3 col-end-11">
        <p class=" text-sm font-normal xl:text-left text-center">
          {{ description.description }}
        </p>
      </div>
      <!--  -->
      <nav class="flex xl:flex-col md:flex-row flex-col gap-4 xl:justify-start justify-center xl:items-start items-center flex-none xl:col-span-2 col-span-12">
        <h6 class="uppercase text-primary-100 font-medium text-sm xl:block hidden">NAVEGACIÓN</h6>
        <NuxtLink class="link-to" :to="item.route" v-for="item in navigation" :key="item">
          {{ item.name }}
        </NuxtLink>
      </nav>
      <nav class="flex xl:flex-col md:flex-row flex-col gap-4 xl:justify-start justify-center xl:items-start items-center flex-none xl:col-span-2 col-span-12">
        <h6 class="uppercase text-primary-100 font-medium text-sm xl:block hidden">ACCESOS DIRECTOS</h6>
        <NuxtLink class="link-to" target="blank" :to="item.route" v-for="item in directAccess" :key="item">
          {{ item.name }}
        </NuxtLink>
      </nav>
      <!--  -->
<!--      <nav class="flex flex-none items-center xl:justify-start justify-center gap-2 xl:col-span-2 col-span-12 md:h-full">-->
<!--        <a :href="socialLink.route" target="blank" v-for="socialLink in socialMedia" :key="socialLink" class="social-link">-->
<!--          <AtomsIcon :name="`social-media/${socialLink.icon}`" />-->
<!--        </a>-->
<!--      </nav>-->
    </div>
  </footer>
</template>

<script>
import Footer from '~/assets/mocks/Footer';
export default {
  name: 'AppFooter',
  data() {
    return {
      navigation: Footer.navigation,
      directAccess: Footer.directAccess,
      socialMedia: Footer.socialLinks,
      description: Footer.information
    }
  }
}
</script>

<style lang="postcss" scoped>
.link-to {
  @apply text-primary-100 text-sm block whitespace-nowrap;
}

.social-link {
  @apply w-8 h-8 border-2 border-primary-100 rounded-full flex items-center justify-center text-primary-100 flex-none;
}

.router-link-active {
  @apply font-bold !important;
}
</style>