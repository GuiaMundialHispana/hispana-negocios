<template>
  <div>
    <NuxtLoadingIndicator />
    <OrganismHeader />
    <main class="lg:pt-[102px] pt-16">
      <section class="pb-28">
        <div class="xl:container mx-auto lg:px-16 md:px-8 px-4">
          <div class="profile-wrapper">
            <figure v-if="pendingUserData" class="profile-image overflow-hidden">
              <div class="skeleton w-[117px] h-[117px] rounded-full"></div>
            </figure>
            <figure v-if="!pendingUserData && user" class="profile-image overflow-hidden">
              <NuxtImg
                :src="user.profile_pic"
                placeholder="/favicon.jpg"
                :alt="user.name"
              />
            </figure>
            <div v-if="!pendingUserData && user" class="profile-information">
              <h3 v-if="user.name != null || user.name !== ''">
                <span class="text-primary-100">Hola,</span><br class="md:block hidden">
                {{user.name}} {{user.lastname}}
              </h3>
              <div v-if="user.name === null || user.name === ''" class="w-40 h-5 skeleton rounded-lg mb-4"></div>
              <AtomsLink btn-style="outline-primary" link-to="/profile/edit-profile">Editar perfil</AtomsLink>
            </div>
          </div>
          <nav class="user-filter">
            <NuxtLink
              class="btn-tab"
              :class="{ active: route.fullPath === '/profile?tab=anuncio'} "
              :to="{ path: 'profile', query: { tab: 'anuncio' }}"
            >
              Mis anuncios
            </NuxtLink>
            <NuxtLink
              class="btn-tab"
              :to="{ path: 'profile', query: { tab: 'plan' }}"
              :class="{ active: route.fullPath === '/profile?tab=plan'} "
            >
              Mis planes
            </NuxtLink>
          </nav>
        </div>
      </section>
      <slot />
    </main>
    <OrganismFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'check-auth'
});

import useRefresh from '~/composables/RefreshToken';
const isLogged = useState<boolean>('isLogged', () => false);
const { refresh_token } = useRefresh();
const { pendingUserData } = useUser();
const user = useState('user');
const route = useRoute();

setInterval(async () => {
  if (isLogged.value) {
    await refresh_token();
  }
}, 120000);
</script>

<style lang="postcss" scoped>
.profile-wrapper {
  @apply flex items-center justify-center gap-5 py-16 border-b border-gray-300 mb-10;
  & .profile-image img { @apply overflow-hidden w-[117px] h-[117px] rounded-full object-cover object-center border-4 border-primary-50; }
  & h3 { @apply text-[28px] leading-[28px] font-semibold mb-4; }
}

.user-filter {
  @apply border-b border-gray-300 flex md:overflow-hidden overflow-x-scroll;
  & .btn-tab {
    @apply flex-none mr-8 hover:text-primary-100 hover:border-b hover:border-primary-100 text-neutral-black text-base pb-2;
    &.active { @apply text-primary-100 border-b border-primary-100;}
  }
}
</style>