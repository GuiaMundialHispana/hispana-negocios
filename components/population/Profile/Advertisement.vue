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
        <AtomsLink link-to="/PostBussines" class="mx-auto">Crear un anuncio</AtomsLink>
      </div>
      <p class="text-sm text-neutral-black text-center">¡No dejes pasar esta oportunidad de mostrar tu propiedad al mundo!</p>
    </div>
    <!-- Tablita -->
    <div v-if="!pending" class="overflow-x-auto md:overflow-visible h-full">
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
              <NuxtLink v-if="business.status != 'revision'" :to="{ path: `edit-business`, query: { property_id: business.business_id }}" class="xsmall btn solid-secondary whitespace-nowrap w-full">
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
                  <li class="actions-options" v-if="business.status != 'inactive'" @click="api_status = 'inactive', changeStatus(business.id)">
                    Cerrar temporalmente
                  </li>
                  <li class="actions-options" v-if="business.status != 'trashed'" @click="api_status = 'trashed', changeStatus(business.id)">
                    Eliminar empresa
                  </li>
                </ul>
              </OnClickOutside>
            </td>
            <td v-if="business.status != 'revision'">
              <NuxtLink disabled="true" class="flex gap-2.5 whitespace-nowrap" :to="{path: `/search/${ business.business.name}`,query: { property_id: business.id}}">
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
    </div>
    <!-- End of tablita -->

    <!-- Results -->
    <div v-if="advertisement" class="ads">
      <!-- <div v-if="tab === 0">
        <div v-if="actives.length > 0">
          <h3>Anuncios Activos</h3>
          <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <li v-for="item in actives" :key="item" class="relative">
              <AtomsButtons
                btn-type="btn-icon"
                icon-name="general/tune"
                class="status-button"
                v-if="show_drop != item.id"
                @click="show_drop = item.id"
              />
              <AtomsButtons
                btn-type="btn-icon"
                icon-name="general/close"
                class="status-button"
                v-if="show_drop === item.id"
                @click="show_drop = 0"
              />
              <MoleculesVehicle
                :property="item.auto"
                :property-id="item.id"
              />
              <OnClickOutside @trigger="show_drop = 0">
                <div class="status-dropdown" v-if="show_drop === item.id">
                  <div class="flex items-center gap-3 cursor-pointer" @click="api_status = 'inactive', changeStatus(item.id)">
                    <input type="radio" name="status">
                    Inactivar
                  </div>
                  <div class="flex items-center gap-3 cursor-pointer" @click="api_status = 'trashed', changeStatus(item.id)">
                    <input type="radio" name="status">
                    Borrar
                  </div>
                </div>
              </OnClickOutside>
            </li>
          </ul>
        </div>
        <div class="empty-state" v-if="actives.length <= 0">
          <figure class="mb-4">
            <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
          </figure>
          <h6 class="text-xl text-primary-100 font-bold mb-4 text-center">No tienes anuncios activos</h6>
        </div>
      </div> -->
      <!-- Expirados -->
      <!-- <div v-if="tab === 1">
        <div v-if="expired.length > 0">
          <h3>Anuncios Expirados</h3>
          <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <li v-for="item in expired" :key="item">
              <MoleculesVehicle
                :property="item.auto"
                :property-id="item.id"
                status-message="Anuncio expirado"
                status-background="bg-secondary-100 border-2 border-primary-100 text-neutral-white"
              />
            </li>
          </ul>
        </div>
        <div class="empty-state" v-if="expired.length <= 0">
          <figure class="mb-4">
            <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
          </figure>
          <h6 class="text-xl text-primary-100 font-bold mb-4 text-center">No tienes anuncios expirados</h6>
        </div>
      </div> -->
      <!-- Revision -->
      <!-- <div v-if="tab === 2">
        <div v-if="revision.length > 0">
          <h3>Anuncios en revision</h3>
          <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <li v-for="item in revision" :key="item">
              <MoleculesVehicle
                :property="item.auto"
                :property-id="item.id"
              />
            </li>
          </ul>
        </div>
        <div class="empty-state" v-if="revision.length <= 0">
          <figure class="mb-4">
            <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
          </figure>
          <h6 class="text-xl text-primary-100 font-bold mb-4 text-center">No tienes anuncios en revision</h6>
        </div>
      </div> -->
      <!-- Rechazados -->
      <!-- <div v-if="tab === 3">
        <div v-if="rejected.length > 0">
          <h3>Anuncios rechazados</h3>
          <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <li v-for="item in rejected" :key="item">
              <MoleculesVehicle
                :property="item.auto"
                :property-id="item.id"
                status-message="Anuncio Rechazado"
                status-background="bg-primary-100"
                />
            </li>
          </ul>
        </div>
        <div class="empty-state" v-if="rejected.length <= 0">
          <figure class="mb-4">
            <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
          </figure>
          <h6 class="text-xl text-primary-100 font-bold mb-4 text-center">No tienes anuncios rechazados</h6>
        </div>
      </div> -->
      <!-- Inactivos -->
      <!-- <div v-if="tab === 4">
        <div v-if="inactive.length > 0">
          <h3>Anuncios Inactivos</h3>
          <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <li v-for="item in inactive" :key="item" class="relative">
              <AtomsButtons
                btn-type="btn-icon"
                icon-name="general/tune"
                class="status-button"
                v-if="show_drop != item.id"
                @click="show_drop = item.id"
              />
              <AtomsButtons
                btn-type="btn-icon"
                icon-name="general/close"
                class="status-button"
                v-if="show_drop === item.id"
                @click="show_drop = 0"
              />
              <MoleculesVehicle
                :property="item.auto"
                :property-id="item.id"
              />
              <OnClickOutside @trigger="show_drop = 0">
                <div class="status-dropdown" v-if="show_drop === item.id">
                  <div class="flex items-center gap-3 cursor-pointer" @click="api_status = 'trashed', changeStatus(item.id)">
                    <input type="radio" name="status">
                    Borrar
                  </div>
                </div>
              </OnClickOutside>
            </li>
          </ul>
        </div>
        <div class="empty-state" v-if="inactive.length <= 0">
          <figure class="mb-4">
            <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
          </figure>
          <h6 class="text-xl text-primary-100 font-bold mb-4 text-center">No tienes anuncios inactivos</h6>
        </div>
      </div> -->
      <!-- Borrados -->
      <!-- <div v-if="tab === 5">
        <div v-if="trashed.length > 0">
          <h3>Anuncios borrados</h3>
          <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <li v-for="item in trashed" :key="item" class="relative">
              <AtomsButtons
                btn-type="btn-icon"
                icon-name="general/tune"
                class="status-button"
                v-if="show_drop != item.id"
                @click="show_drop = item.id"
              />
              <AtomsButtons
                btn-type="btn-icon"
                icon-name="general/close"
                class="status-button"
                v-if="show_drop === item.id"
                @click="show_drop = 0"
              />
              <MoleculesVehicle
                :property="item.auto"
                :property-id="item.id"
                status-message="Anuncio Borrado"
                status-background="bg-neutral-white text-neutral-black font-semibold"
              />
              <OnClickOutside @trigger="show_drop = 0">
                <div class="status-dropdown" v-if="show_drop === item.id">
                  <div class="flex items-center gap-3 cursor-pointer" @click="api_status = 'inactive', changeStatus(item.id)">
                    <input type="radio" name="status">
                    Inactivar
                  </div>
                </div>
              </OnClickOutside>
            </li>
          </ul>
        </div>
        <div class="empty-state" v-if="trashed.length <= 0">
          <figure class="mb-4">
            <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
          </figure>
          <h6 class="text-xl text-primary-100 font-bold mb-4 text-center">No tienes anuncios borrados</h6>
        </div>
      </div> -->
      <div class="flex justify-center my-8">
        <AtomsLink link-to="/PostBussines" class="mx-auto">Crear un anuncio</AtomsLink>
      </div>
    </div>
  </section>
</template>

<!-- <script>
import { useUserStore } from '~/stores/User';
import Swal from 'sweetalert2';

export default {
  name: 'Advertisement',
  data() {
    return {
      tab: 0,
      selectedTab: 'activos',
      actionsIndex: null,
      actionsDropdown: false,
      status: [
        {
          name:'activos',
          size: this.active_size
        },
        {
          name:'expirados',
          size: this.active_size
        },
        {
          name:'en revision',
          size: this.active_size
        },
        {
          name:'rechazados',
          size: this.active_size
        },
        {
          name:'inactivos',
          size: this.active_size
        },
        {
          name:'borrados',
          size: this.active_size
        },
      ],
      user:useUserStore(),
      advertisement: false,
      propertys: [],
      actives: [],
      expired: [],
      revision: [],
      rejected: [],
      inactive: [],
      trashed: [],
      config: useRuntimeConfig(),
      api_status: '',
      show_drop: 0,
      active_size: 0,
      expired_size: 0,
      revision_size: 0,
      rejected_size: 0,
      inactive_size: 0,
      trashed_size: 0,
      testBusinessArray: [
        {
          seleccion: true,
          nombre: "Objeto 1",
          direccion: "Direccion 1",
          estado: false,
          accion: "Accion 1"
        },
        {
          seleccion: false,
          nombre: "Objeto 2",
          direccion: "Direccion 2",
          estado: true,
          accion: "Accion 2"
        },
        {
          seleccion: true,
          nombre: "Objeto 3",
          direccion: "Direccion 3",
          estado: true,
          accion: "Accion 3"
        },
        {
          seleccion: false,
          nombre: "Objeto 4",
          direccion: "Direccion 4",
          estado: false,
          accion: "Accion 4"
        },
        {
          seleccion: true,
          nombre: "Objeto 5",
          direccion: "Direccion 5",
          estado: true,
          accion: "Accion 5"
        }
      ],
      actions: [ "Estadística", "Cambiar plan", "Cerrar temporalmente", "Eliminar empresa" ],
    }
  },
  methods: {
    checkAdvertisement(value,index) {
      this.tab = index;
      this.selectedTab = value;
    },
    async getAdvertisement() {
      const data = await $fetch('advertisements',{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        baseURL: this.config.public.API
      });
      const res = data.results;
      
      if(res.length > 0) {
        this.propertys = res;
        this.advertisement = true;

        for (let i = 0; i < res.length; i++) {
          const objeto = res[i];
          if (objeto.status === 'active') {
            this.actives.push(objeto);
            this.status[0].size = this.actives.length;
          }
          if(objeto.status === 'expired') {
            this.expired.push(objeto);
            this.status[1].size = this.expired.length;
          }
          if(objeto.status === 'revision') {
            this.revision.push(objeto);
            this.status[2].size = this.revision.length;
          }
          if(objeto.status === 'refused') {
            this.rejected.push(objeto);
            this.status[3].size = this.rejected.length;
          }

          if(objeto.status === 'inactive') {
            this.inactive.push(objeto);
            this.status[4].size = this.inactive.length;
          }

          if(objeto.status === 'trashed') {
            this.trashed.push(objeto);
            this.status[5].size = this.trashed.length;
          }
        }
      }
    },
    async changeStatus(id) {
      const {data} = await useFetch(`advertisements/change-status/${id}/${this.api_status}?_method=PUT`,{
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        baseURL: this.config.public.API,
        onResponse({response}) {
          if(response.status === 200 ) {
            Swal.fire({
              icon: 'success',
              text: 'Hemos actualizado el estado del anuncio',
              showConfirmButton: false,
              timer: 2000
            });
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
      if(data) {
        this.show_drop = false;
        this.trashed = [];
        this.actives = [];
        this.expired = [];
        this.revision = [];
        this.rejected = [];
        this.inactive = [];
        this.getAdvertisement();
      }
    }
  },
  beforeMount() {
    this.getAdvertisement();
  }
}
</script> -->

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
  const {data} = await useFetch(`advertisements/change-status/${id}/${this.api_status}?_method=PUT`,{
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