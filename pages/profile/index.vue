<template>
  <section class="pb-32">
    <div class="xl:container mx-auto lg:px-16 md:px-8 px-4">
      <div class="profile-wrapper">
        <figure class="profile-image overflow-hidden" v-if="user.userData.name === null || user.userData.name === ''">
          <div class="skeleton w-[117px] h-[117px] rounded-full"></div>
        </figure>
        <figure class="profile-image overflow-hidden" v-else>
<!--          <img v-if="user.userData.profile_pic != null" :src="user.userData.profile_pic" :alt="user.userData.name">-->
          <NuxtImg
            v-if="user.userData.profile_pic != null"
            :src="user.userData.profile_pic"
            :alt="user.userData.name"
          />
          <!--  -->
          <span v-if="user.userData.profile_pic === null" class="w-[117px] h-[117px] uppercase flex items-center justify-center font-bold text-primary-100 text-6xl rounded-full border-2 border-primary-100 bg-secondary-100">
            {{user.userData.name.charAt(0)}}{{ user.userData.lastname.charAt(0) }}
          </span>
        </figure>
        <div class="profile-information">
          <h3 v-if="user.userData.name != null || user.userData.name !== ''">
            <span class="text-primary-100">Hola,</span><br class="md:block hidden">
            {{user.userData.name}} {{user.userData.lastname}}
          </h3>
          <div v-if="user.userData.name === null || user.userData.name === ''" class="w-40 h-5 skeleton rounded-lg mb-4"></div>
          <AtomsLink btn-style="outline-primary" link-to="/profile/editProfile">Editar perfil</AtomsLink>
        </div>
      </div>
      <nav class="user-filter">
        <NuxtLink
          class="btn-tab"
          :class="{ active: $route.fullPath === '/profile?tab=anuncio'} "
          :to="{ path: 'profile', query: { tab: 'anuncio' }}"
        >
          Mis anuncios
        </NuxtLink>
        <NuxtLink
          class="btn-tab"
          :to="{ path: 'profile', query: { tab: 'plan' }}"
          :class="{ active: $route.fullPath === '/profile?tab=plan'} "
        >
          Mis planes
        </NuxtLink>
      </nav>
      <PopulationProfileAdvertisement v-show="$route.query.tab === 'anuncio'" />
      <PopulationProfilePlans v-show="$route.query.tab === 'plan'" /> 
    </div>
  </section>
</template>

<script setup>
  import { useUserStore } from '~/stores/User';
  definePageMeta({
    middleware: 'check-auth'
  });
  const user = useUserStore();
</script>

<style lang="postcss" scoped>
.profile-wrapper {
  @apply flex items-center justify-center gap-5 py-16 border-b border-gray-300 mb-10;
  & .profile-image img { @apply overflow-hidden w-[117px] h-[117px] rounded-full object-cover object-center border-4 border-secondary-100; }
  & h3 { @apply text-[28px] leading-[28px] font-semibold mb-4; }
}

.user-filter {
  @apply border-b border-gray-300 mb-10 flex md:overflow-hidden overflow-x-scroll;
  & .btn-tab {
    @apply flex-none mr-8 hover:text-primary-100 hover:border-b hover:border-primary-100 text-neutral-black text-base pb-2;
    &.active { @apply text-primary-100 border-b border-primary-100;}
  }
}
</style>