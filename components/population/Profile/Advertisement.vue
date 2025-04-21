<template>
  <section>
    <!-- No results -->
    <div v-if="pending">
      <figure class="mb-4">
        <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
      </figure>
      <h6 class="text-4xl text-primary-100 font-bold mb-4 text-center">Aún no publicas
        <span class="text-primary-100">nada.</span>
      </h6>
      <div class="flex justify-center mb-4">
        <AtomsLink link-to="/create-ad" class="mx-auto">Crear un anuncio</AtomsLink>
      </div>
      <p class="text-sm text-neutral-black text-center">¡No dejes pasar esta oportunidad de mostrar tu propiedad al mundo!</p>
    </div>
    <div v-if="!pending && data.length === 0">
      <figure class="mb-4">
        <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
      </figure>
      <h6 class="text-4xl text-primary-100 font-bold mb-4 text-center">Aún no publicas
        <span class="text-primary-100">nada.</span>
      </h6>
      <div class="flex justify-center mb-4">
        <AtomsLink link-to="/create-ad" class="mx-auto">Crear un anuncio</AtomsLink>
      </div>
      <p class="text-sm text-neutral-black text-center">¡No dejes pasar esta oportunidad de mostrar tu propiedad al mundo!</p>
    </div>
    <!-- Tablita -->
    <div v-if="!pending && data.length > 0" class="overflow-x-auto md:overflow-visible h-full">
      <table class="w-full text-sm">
        <thead>
          <th>Nombre del negocio</th>
          <th>Estado</th>
          <th>Editar</th>
          <th>Acciones</th>
          <th>Ver</th>
        </thead>
        <tbody class="rounded-xl">
          <tr v-for="(business, index) in data" :key="index">
            <td>
              <p>{{ business.business.name }}</p>
              <p class="text-xs text-secondary-100 leading-[22px]">{{ business.business.address }}</p>
            </td>
            <td v-if="business.status === 'inactive'">
              <p class="flex items-center justify-center gap-2">
                <span class="w-2.5 h-2.5 bg-[#FF2625] rounded-full block" :class="{'state-active': false }"></span>
                Inactivo
              </p> 
            </td>
            <td v-if="business.status === 'active'">
              <p class="flex items-center justify-center gap-2">
                <span class="w-2.5 h-2.5 bg-[#FF2625] rounded-full block" :class="{'state-active': true }"></span>
                Activo
              </p> 
            </td>
            <td v-if="business.status === 'revision'">
              <p class="flex items-center justify-center gap-2">
                <span class="w-2.5 h-2.5 bg-[#FFCC00] rounded-full block"></span>
                En revision
              </p> 
            </td>
            <td v-if="business.status === 'trashed'">
              <p class="flex items-center justify-center gap-2">
                <span class="w-2.5 h-2.5 bg-[#FF2625] rounded-full block" :class="{'state-active': false }"></span>
                Eliminado
              </p> 
            </td>
            <td v-if="business.status === 'refused'">
              <p class="flex items-center justify-center gap-2">
                <span class="w-2.5 h-2.5 bg-[#FF2625] rounded-full block" :class="{'state-active': false }"></span>
                {{ business.status }}
              </p> 
            </td>
            <td v-if="business.status === 'expired'">
              <p class="flex items-center justify-center gap-2">
                <span class="w-2.5 h-2.5 bg-[#FF2625] rounded-full block" :class="{'state-active': false }"></span>
                Expirado
              </p> 
            </td>
            <td>
              <NuxtLink v-if="business.status != 'revision'" :to="{ path: `edit-ad`, query: { slug: business.business.slug }}" class="xsmall btn solid-secondary whitespace-nowrap w-full">
                Editar negocio
              </NuxtLink>
              <AtomsButtons v-if="business.status === 'revision'" :disabled="business.status === 'revision'" class="xsmall btn w-full">
                Editar negocio
              </AtomsButtons>
            </td>
            <td class="relative">
              <OnClickOutside @trigger="actionsIndex = null, actionsDropdown = false">
                <AtomsButtons class="action-btn" :disabled="business.status === 'revision'" @click="actionsIndex = index, actionsDropdown = !actionsDropdown" >
                  Acciones 
                  <AtomsIcon name="general/arrow-down" :class="[{arrow: index === actionsIndex && actionsDropdown }]" />
                </AtomsButtons>
                <ul class="actions-dropdown" v-if="index === actionsIndex && actionsDropdown">
                  <li  class="actions-options">
                    <NuxtLink :to="{path: `/visitsChart`,query: { id: business.id, name: business.business.name}}">Estadística</NuxtLink>
                  </li>
                  <li class="actions-options" v-if="business.status != 'inactive'" @click="api_status = 'inactive', changeStatus(business.business.id)">
                    Cerrar temporalmente
                  </li>
                  <li class="actions-options" v-if="business.status != 'trashed'" @click="api_status = 'trashed', changeStatus(business.business.id)">
                    Eliminar empresa
                  </li>
                </ul>
              </OnClickOutside>
            </td>
            <td v-if="business.status != 'revision'">
              <NuxtLink disabled="true" class="flex gap-2.5 whitespace-nowrap" :to="{path: `/search/${business.business.slug}`}">
                <AtomsIcon name="general/eye" class="text-secondary-100" :size=24 />
                <span hidden class="md:block">Ver Perfil</span>
              </NuxtLink>
            </td>
            <td v-else class="text-[red] align-middle text-center">
              No disponible
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-center my-8">
        <AtomsLink link-to="/create-ad" class="mx-auto">Crear un anuncio</AtomsLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { OnClickOutside } from '@vueuse/components';
import Swal from 'sweetalert2';

const config = useRuntimeConfig();
const actionsIndex = ref(0);
const api_status = ref('');

const { data, pending, refresh } = await useLazyFetch('advertisements', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  server: false,
  baseURL: config.public.API,
  transform(data) {
    return data.results;
  }
});

async function changeStatus(id) {
  const {data} = await useFetch(`advertisements/change-status/${id}/${api_status.value}?_method=PUT`,{
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    server: false,
    baseURL: config.public.API,
    onResponse({response}) {
      if(response.status === 200 ) {
        Swal.fire({
          icon: 'success',
          text: 'Hemos actualizado el estado del anuncio',
          showConfirmButton: false,
          timer: 2000
        });
        refresh();
      } else {
        Swal.fire({
          icon: 'error',
          text: 'En estos momentos tenemos un error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
  });
}

</script>

<style lang="postcss" scoped>

h3 {
  @apply font-medium text-sm text-neutral-black text-[28px] leading-[42px] mb-8 uppercase pb-4 border-b border-[#F5F5F5];
}

.status-button { @apply absolute top-4 right-4 z-10; }
.status-dropdown {
  @apply rounded-lg bg-neutral-white p-4 absolute top-14 right-4 z-10;
}
.ads {
  & nav {
    & .btn {
      @apply flex-grow justify-between border-2 hover:border-primary-100 hover:text-secondary-100;
      & span { @apply w-6 h-6 flex items-center justify-center rounded-full font-medium text-sm bg-[#F5F5F5] text-[#ADADAD]; }
      &.active {
        @apply bg-primary-100 text-neutral-white border-primary-100 hover:text-secondary-100 !important;
        & span { @apply text-primary-100 bg-secondary-100; }
      }
    }
  }
}
.checkbox {
  @apply relative appearance-none flex-none w-4 h-4 border border-gray-300 rounded-sm mr-2 cursor-pointer 
  hover:bg-primary-100 hover:border-none checked:bg-secondary-100 checked:hover:bg-gray-300 checked:border-none
  after:w-full
  after:h-full
  after:absolute
  after:bg-no-repeat
  after:bg-center
  after:bg-[length:10px]
  after:bg-[url('~/assets/icons/general/check.svg')];
}
.action-btn {
  @apply flex w-full justify-between gap-2;
  .arrow{
    @apply rotate-180 transition-all ease-in-out duration-200;
  }
}

th {
  @apply p-4 lg:text-left text-center [&:nth-child(2)]:text-left font-semibold whitespace-nowrap
}
tr {
  @apply border rounded-t-lg
}

td {
  @apply lg:text-left text-center [&:nth-child(2)]:text-left p-3 md:p-4 border border-neutral-20
}

tbody {
  @apply p-4 
}
.state-active{
  @apply bg-[#4CAF50] 
}

.actions-options{
  @apply py-2.5 px-3.5 border-t-2 cursor-pointer border-neutral-10 first:border-none last:text-[#FF2625] last:hover:text-neutral-white last:hover:font-semibold last:hover:bg-[#FF2625] whitespace-nowrap hover:bg-neutral-10 last:rounded-b-lg transition-all ease-in-out duration-300
}

.actions-dropdown{
  @apply absolute w-fit bg-neutral-white left-2/4 -translate-x-2/4 mt-2 z-50 border-2 border-neutral-10 rounded-lg shadow-2xl text-left text-sm;
}


.btn {
  @apply rounded-lg inline-flex justify-center items-center no-underline cursor-pointer duration-300 focus:outline-none;

  &.solid-secondary {
    @apply bg-secondary-100 border hover:border-primary-100 hover:bg-secondary-100 text-neutral-white;
  }

  &.xsmall { @apply h-8; }
}

</style>