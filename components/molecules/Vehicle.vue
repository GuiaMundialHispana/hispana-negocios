<template>
  <article>
    <AtomsButtons
      btn-type="btn-icon"
      icon-name="general/favorite"
      class="favorite-button"
      @click="toggleFavorite()"
      v-if="$route.fullPath != '/profile?tab=anuncio'"
    />
    <NuxtLink
      :to="{
        path: `edit-vehicle`,
        query: {
          property_id: propertyId
        }
      }"
      class="btn-icon small active absolute left-4 z-10 top-1"
      v-if="$route.fullPath === '/profile?tab=anuncio'"
    >
      <AtomsIcon name="general/pencil" class="text-neutral-white" />
    </NuxtLink>
    <figure class="h-52 bg-gray-10">
      <div class="advertisements" v-if="
        $route.path === '/profile' && statusMessage !== ''"
      >
        <p :class="statusBackground">{{ statusMessage }}</p>
      </div>
      <img :src="`https://hispana-autos-3284x.ondigitalocean.app/${property.image}`" :alt="property.title" class="object-cover h-full w-full">
    </figure>
    <NuxtLink :to="{
      path: `/search/${property.title}`,
      query: {
        property_id: propertyId
      }
    }">
      <p class="property-title">{{property.title }}</p>
      <!-- Caracteristicas -->
      <MoleculesCharacteristics class="my-3"
        :year="property.year"
        :mileage="property.mileage"
        :location="property.location"
      />
      <!-- Price -->
      <div class="flex items-center gap-2">
        <p class="price-title">Desde:</p>
        <p class="price">US${{showParsedPrice(property.price_us)}}</p>
      </div>
    </NuxtLink>
  </article>
</template>

<script>
import { useAuthStore } from '~/stores/Auth';
import Swal from 'sweetalert2';
import { useUserStore } from '~/stores/User';

export default {
  props: {
    property: {
      type: Object,
      default: () => {}
    },
    isFavorite: {
      type: Boolean,
      default: false
    },
    propertyId: {
      type:Number
    },
    statusMessage: {
      type: String,
      default: ''
    },
    statusBackground: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      config: useRuntimeConfig(),
      route: useRouter(),
      auth: useAuthStore(),
      user_store: useUserStore(),
      test: 4
    }
  },
  methods: {
    showParsedPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async addFavorite() {
      const {data} = await useFetch('users/favorites',{
        method: 'post',
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        body: { property_id: this.property.id},
        baseURL: this.config.public.API,
        onResponse({response}) {
          if(response._data.code === 400 ) {
            Swal.fire({
              icon: 'error',
              text: response._data.message,
              showConfirmButton: false,
              timer: 2000
            });
          }

          if(response._data.code === 200) {
            Swal.fire({
              icon: 'success',
              text: response._data.message,
              showConfirmButton: false,
              timer: 2000
            });
            this.isFavorite = true;
            this.user_store.get_user();
          }
        }
      });
    },
    async deleteFavorite() {
      const {data} = await useFetch('users/favorites',{
        method: 'delete',
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        body: { property_id: this.property.id},
        baseURL: this.config.public.API,
        onResponse({response}) {
          if(response._data.code === 400 ) {
            Swal.fire({
              icon: 'error',
              text: response._data.message,
              showConfirmButton: false,
              timer: 2000
            });
          }

          if(response._data.code === 200) {
            Swal.fire({
              icon: 'success',
              text: response._data.message,
              showConfirmButton: false,
              timer: 2000
            });
          }
        }
      });
    },
    toggleFavorite() {
      if(this.auth.isLoggedIn) {
        if(this.isFavorite) {
          this.deleteFavorite();
        } else {
          this.addFavorite();
        }

      } else {
        this.$swal.fire({
          icon: 'error',
          text: 'Necesitas iniciar sesion para poder agregar esta propiedad a favoritos',
          showConfirmButton: true,
          timer: 2000
        });
      }
    }
    //end methods
  },
  mounted() {
    // console.log(this.property)
  }
}
</script>

<style lang="postcss" scoped>
article {
  @apply rounded-2xl bg-neutral-white p-2 w-full relative;

  &:hover { box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.07); }

  & > button.favorite-button {
    @apply absolute right-4 top-4 z-[5] bg-neutral-white border border-secondary-100 hover:bg-secondary-100 text-[#ADADAD] hover:text-neutral-white !important;
    &.active { @apply bg-primary-100 text-neutral-white hover:bg-secondary-100 !important; }
  }

  & > a, & h6 { @apply font-semibold text-neutral-black mt-3 text-base block; }

  & .property-title {
    @apply overflow-hidden truncate whitespace-nowrap w-11/12;
  }

  & .address { @apply flex items-start font-normal text-neutral-black my-3 overflow-hidden truncate whitespace-nowrap w-11/12; }

  & .price-title { @apply text-sm text-neutral-black font-normal; }
  & .price { @apply text-primary-100 font-semibold text-xl uppercase; }

  & .swiper:hover > nav { @apply flex; }

  & nav { @apply hidden absolute top-1/2 z-10 w-full justify-between px-4; 
  & button { @apply bg-neutral-white hover:bg-primary-100 border-none !important; }
  }
  & .advertisements{
    @apply absolute z-20 text-neutral-white top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-opacity-40 bg-neutral-white;
    & p {
      @apply py-1.5 px-[15px] rounded-lg text-base w-fit text-center min-w-[209px];
    }
  }

  & .btn-icon {
    @apply bg-primary-100 inline-flex justify-center items-center no-underline cursor-pointer duration-300 focus:outline-none hover:bg-secondary-100 ;

    &.small { @apply w-8 rounded-full h-8; }
  }

}
</style>
