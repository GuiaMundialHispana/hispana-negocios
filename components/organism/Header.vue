<template>
  <header>
    <div class='w-full mx-auto flex items-center justify-between xl:px-14 px-4'>
      <NuxtLink to="/">
        <figure class="mr-3">
          <img src='/img/logo.png' alt='Hispana Negocios' class="lg:w-32 w-24 object-contain">
        </figure>
      </NuxtLink>
      <OnClickOutside @trigger="showMenu = false">
        <nav :class="{'hidden':!showMenu}">
          <span class="w-full flex justify-end" v-if="showMenu === true">
            <AtomsButtons 
            @click="showMenu = false"
            btn-type="btn-icon" 
            btn-style="outline-primary" 
            icon-name="general/close" 
            btn-size="xsmall" 
            :icon-size=16 
          />
          </span>
          <ul>
            <li v-for='item in menu'
              :key='item.name'
              class="text-sm text-neutral-black font-normal hover:text-primary-100 mb-4 lg:mb-0 cursor-pointer"
            >
              <NuxtLink :to='item.route'  @click="showMenu = false">{{item.name}}</NuxtLink>
            </li>
            <li class="mb-4 lg:mb-0" v-show="!auth.isLoggedIn">
              <AtomsButtons @click="showMenu = false; displayModal = true">
                Iniciar sesión
              </AtomsButtons>
            </li>
            <!-- User Logged -->
            <li class="user-wrapper" v-if="auth.isLoggedIn" @click="userDropdown = !userDropdown">
              <div class="flex items-center gap-2">
                <img v-if="user.userData.profile_pic !== null" :src="user.userData.profile_pic" :alt="user.userData.name">
                <span v-else class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-primary-100 text-sm border border-primary-100 bg-secondary-100">
                  {{user.userData.name.charAt(0)}}{{ user.userData.lastname.charAt(0) }}
                </span>
                <!-- <img src="/img/user.jpg" v-if="user.userData.profile_pic === null || ''" :alt="user.userData.name"> -->
                {{ user.userData.name }} {{ user.userData.lastname }}
                <AtomsIcon name="arrows/arrow-down" v-show="!userDropdown" :size=15 class="text-primary-100" />
                <AtomsIcon name="arrows/arrow-down" v-show="userDropdown" :size=15 class="text-primary-100 rotate-180" />
              </div>
              <OnClickOutside @trigger="userDropdown = false" class="user-dropdown">
                <div v-show="userDropdown">
                  <ul>
                    <li>
                      <NuxtLink to="/profile?tab=anuncio" @click="showMenu = false">
                        <AtomsIcon name="general/border-all" class="mr-2.5" />
                        Mis anuncios
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/profile?tab=plan" @click="showMenu = false">
                        <AtomsIcon name="general/user-document" class="mr-2.5" />
                        Mis planes
                      </NuxtLink>
                    </li>
                    <li @click="auth.logOut(), showMenu = false">
                      <AtomsIcon name="general/logout" class="mr-2.5" />
                      Cerrar sesión
                    </li>
                  </ul>
                </div>
              </OnClickOutside>
            </li>
            <li v-show="auth.isLoggedIn">
              <AtomsLink
                @click="showMenu = false"
                link-to="/PostBussines"
                icon-name="general/plus"
                icon-position="left"
                :icon-size=14
                btnStyle="outline-primary"
              >
                Publicar mi negocio
              </AtomsLink>
            </li>
          </ul>
        </nav>
      </OnClickOutside>
      <!-- Open Menu -->
      <button
        v-show="viewport.isLessThan('lg')"
        class="bg-primary-100 w-8 h-8 flex items-center justify-center"
        @click="showMenu = !showMenu"
      >
        <AtomsIcon name="general/menu" class="text-neutral-white"></AtomsIcon>
      </button>
    </div>
  </header>
  <!-- Modal login and register component -->
  <OrganismLogInaAndRegister
    @closeModal="displayModal = false"
    v-if="displayModal"
  />
</template>

<script>
import { useAuthStore } from '~/stores/Auth';
import { useUserStore } from '~/stores/User';
export default {
  name: 'AppHeader',
  data() {
    return {
      auth: useAuthStore(),
      user: useUserStore(),
      viewport: useViewport(),
      showMenu: false,
      userDropdown: false,
      displayModal: false,
      menu: [
      {
        name: 'Buscar',
        route: '/search'
      },
      {
        name: 'Contacto',
        route: '/contact'
      },
      {
        name: 'Planes',
        route: '/plans'
      }
      ]
    }
  },
  watch: {
    showMenu: function() {
      if(this.showMenu) {
        document.body.classList.add('modal-open')
      } else {
        document.body.classList.remove('modal-open')
      }
    },
    displayModal: function() {
      if(this.displayModal) {
        document.body.classList.add('modal-open')
      } else {
        document.body.classList.remove('modal-open')
      }
    }
  },
}
</script>

<script setup>
import { OnClickOutside } from '@vueuse/components';
</script>

<style lang="postcss" scoped>

header {
  @apply w-full lg:h-[102px] h-16 flex items-center py-2 absolute top-0 lg:z-[60] bg-neutral-white border-b border-gray-300;
}

nav {
  @apply lg:block lg:static absolute top-0 right-0 h-screen lg:h-full lg:w-max w-full md:max-w-sm lg:max-w-none max-w-full lg:p-0 p-6 z-[80] bg-neutral-white;

  & > ul { @apply flex lg:items-center xl:gap-x-8 lg:gap-3 lg:flex-row flex-col; }

  & .user-wrapper {
    @apply flex lg:items-center font-semibold text-primary-100 lg:ml-4 cursor-pointer mb-4 lg:mb-0 lg:flex-row flex-col;

    & img { @apply w-8 h-8 rounded-full border-[2px] border-secondary-100 object-cover overflow-hidden; }

    & .user-dropdown {
      @apply lg:absolute lg:mt-0 mt-4 top-20 lg:w-56 w-full h-auto z-50 bg-neutral-white bottom-0;

      & ul {
        @apply flex flex-col overflow-hidden lg:border border-gray-100 rounded-lg;
        & li > a, & li:last-child { @apply px-4 py-2 flex items-center border-b border-gray-100 text-sm text-neutral-black font-normal hover:bg-[#bafbff] hover:text-primary-100 bg-neutral-white; }
        & li:last-child { @apply border-b-0 }
      }
    }
  }
}

.router-link-active {
  @apply text-primary-100 font-semibold
}
</style>