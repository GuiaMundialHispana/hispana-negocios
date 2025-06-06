<template>
  <header>
    <div class='w-full mx-auto flex items-center justify-between xl:px-14 px-4'>
      <NuxtLink to="/">
        <figure>
          <img src='/img/logo.svg' alt='Grupo Casas & mass' class="lg:w-32 w-24 object-contain">
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
            <li v-for="item in menu" :key='item.name' class="nav-item" :class="{'active': route.fullPath === item.route}">
              <NuxtLink :to='item.route'  @click="showMenu = false">{{item.name}}</NuxtLink>
            </li>
            <li class="nav-item cursor-pointer" :class="{'active': route.fullPath === '/create-ad'}" @click="checkSell">
              Vender
            </li>
            <li class="nav-item" :class="{'active': route.fullPath === '/contacto'}">
              <NuxtLink to='/contacto' @click="showMenu = false">Contacto</NuxtLink>
            </li>
            <li class="nav-item" :class="{'active': route.fullPath === '/planes'}">
              <NuxtLink to='/planes' @click="showMenu = false">Planes</NuxtLink>
            </li>
            <li class="mb-4 lg:mb-0" v-show="!isLogged">
              <AtomsButtons @click="showMenu = false; displayModal = true">
                Iniciar sesión
              </AtomsButtons>
            </li>
            <!-- User Logged -->
            <li class="user-wrapper" v-if="isLogged && user" @click="userDropdown = !userDropdown">
              <div class="flex items-center gap-2">
                <NuxtImg
                  v-if="user.profile_pic !== null"
                  :src="user.profile_pic"
                  placeholder="/favicon.jpg"
                  :alt="user.name"
                />
                {{ user.name }} {{ user.lastname }}
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
                    <li @click="useErrorResponseLogOut(); showMenu = false">
                      <AtomsIcon name="general/logout" class="mr-2.5" />
                      Cerrar sesión
                    </li>
                  </ul>
                </div>
              </OnClickOutside>
            </li>
            <li v-show="isLogged">
              <AtomsLink
                @click="showMenu = false"
                link-to="/create-ad"
                icon-name="general/plus"
                icon-position="left"
                :icon-size=14
                btnStyle="outline-primary"
              >
                Publicar
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
    @closeModal="displayModal = false, showMenu = false"
    v-if="displayModal"
  />
</template>

<script lang="ts" setup>
import {OnClickOutside} from "@vueuse/components";
const user = useState('user');
const viewport = useViewport();

const showMenu = ref(false);
const userDropdown = ref(false);
const displayModal = ref(false);
const isLogged = useState('isLogged');
const route = useRoute();

defineComponent({
  components: {
    OnClickOutside
  }
})

const menu = reactive([
  { name: 'Buscar', route: '/search' },
]);

// Watchers
watch(showMenu, (newValue: boolean) => {
  if (newValue) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }
});

function checkSell() {
  if(isLogged.value) {
    navigateTo('/create-ad');
    showMenu.value = false
  } else {
    showMenu.value = false
    displayModal.value = true
  }
}

watch(displayModal, (newValue: boolean) => {
  if (newValue) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }
});
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
        & li > a, & li:last-child { @apply px-4 py-2 flex items-center border-b border-gray-100 text-sm text-neutral-black font-normal hover:bg-[#8994AF] hover:text-neutral-white bg-neutral-white; }
        & li:last-child { @apply border-b-0 }
      }
    }
  }
}

.router-link-active {
  @apply text-primary-100 font-semibold
}
</style>