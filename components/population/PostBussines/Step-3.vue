<script lang="ts" setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import {ref, watch} from 'vue';
import { usePostsStore } from '~/stores/Post';
import { useUserStore } from '~/stores/User';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const emit = defineEmits(['nexts']);
const use_posts = usePostsStore();
const user = useUserStore();
const config = useRuntimeConfig();
const phone = ref("");
const countries = useGetCountry().countries;
const country = ref("");
let sector = ref(0);
let displaySector = ref(false);
let city = ref([]);
let displayCity = ref(false);
// let categories = [];
let lat = ref(null);
let log = ref(null);
let address = ref('');
const time = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes()
})
const mapNotSupported = ref(false);

function formatTime(value) {
  const hours = value.hours % 12 || 12; // Convierte a formato de 12 horas
  const minutes = value.minutes.toString().padStart(2, '0'); // Asegura que los minutos tengan 2 dígitos
  const period = value.hours >= 12 ? 'PM' : 'AM'; // Determina si es AM o PM
  return `${hours}:${minutes} ${period}`;
}

const week = ref([
  {
    day: "Domingo",
    open: formatTime(time.value),
    close: formatTime(time.value),
    isClose: 0,
    timeOpen: ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    }),
    timeClose: ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    })
  },
  {
    day: "Lunes",
    open: formatTime(time.value),
    close: formatTime(time.value),
    isClose: 0,
    timeOpen: ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    }),
    timeClose: ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    })
  },
  {
    day: "Martes",
    open: formatTime(time.value),
    close: formatTime(time.value),
    isClose: 0,
    timeOpen: ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    }),
    timeClose: ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    })
  },
  {
    day: "Miércoles",
    open: formatTime(time.value),
    close: formatTime(time.value),
    isClose: 0,
    timeOpen: ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    }),
    timeClose: ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    })
  },
  {
    day: "Jueves",
    open: formatTime(time.value),
    close: formatTime(time.value),
    isClose: 0,
    timeOpen: ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    }),
    timeClose: ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    })
  },
  {
    day: "Viernes",
    open: formatTime(time.value),
    close: formatTime(time.value),
    isClose: 0,
    timeOpen: ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    }),
    timeClose: ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    })
  },
  {
    day: "Sábado",
    open: formatTime(time.value),
    close: formatTime(time.value),
    isClose: 0,
    timeOpen: ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    }),
    timeClose: ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    })
  }
]);

week.value.forEach((day) => {
  watch(
    () => day.open,
    (newValue) => {
      if (typeof newValue === 'object' && newValue.hours !== undefined) {
        day.open = formatTime(newValue);
      }
    }
  );
  watch(
    () => day.close,
    (newValue) => {
      if (typeof newValue === 'object' && newValue.hours !== undefined) {
        day.close = formatTime(newValue);
      }
    }
  );
});

for(let i = 0; i < week.value.length; i++) {
  use_posts.day_of_week.push(week.value[i]);
}

function getAddress(lat:any, long:any, location:string) {
  use_posts.lat = lat;
  use_posts.log = long;
  address.value = location;
  setFieldValue('address', location);
}

let sectors = ref([])
watch(country,(country_id) => {
  displaySector.value = true;
  sectors.value = [];
  const { data } = useFetch(`generals/states/${country_id}`, {
    method: 'GET',
    baseURL: config.public.API,
    server: false,
    transform(data) {
      sectors.value.push(data.results.data)
    }
  })
});

let cities = ref([]);
watch(sector,(sector_id) => {
  displayCity.value = true;
  cities.value = [];
  const { data } = useFetch(`generals/cities/${sector_id}`, {
    method: 'GET',
    baseURL: config.public.API,
    server: false,
    transform(data) {
      cities.value.push(data.results.data)
    }
  })
});

const images = ref(null);
const profilePic = ref("");
const isNewImage = ref(false);

function previewFiles(event:any) {
  images.value = event.target.files[0]
  profilePic.value = URL.createObjectURL(images.value);
  isNewImage.value = true;
}

const schema = yup.object({
  title: yup.string().required("El nombre es requerido"),
  description: yup.string().required("La descripción es requerida"),
  country: yup.string().required("El país es requerido"),
  sector: yup.number().required("El sector es requerido"),
  city: yup.number().required("La ciudad es requerida"),
  phone: yup.string().required("Este campo es requerido"),
  whatsapp: yup.number(),
  web: yup.string(),
  instagram: yup.string(),
  facebook: yup.string(),
  address: yup.string().required("Este campo es requerido"),
  imageProfile: yup.mixed().required("La imagen de perfil es requerida"),
});

const { handleSubmit, setFieldValue} = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit((values) => {
  if( use_posts.lat === 0 || use_posts.log === 0) {
    window.scrollTo(0, 0);
    return alert('Por favor mueva el indicador en el mapa a la ubicación de la propiedad');
  }
  use_posts.title = values.title;
  use_posts.lat;
  use_posts.log;
  use_posts.country_id = values.country;
  use_posts.town_id = values.sector;
  use_posts.city_id = values.city;
  use_posts.condition = values.condition;
  use_posts.description = values.description;
  use_posts.phone = values.phone;
  use_posts.whatsapp = values.whatsapp;
  use_posts.website = values.website;
  use_posts.instagram = values.instagram;
  use_posts.facebook = values.facebook;
  use_posts.address = values.address;
  use_posts.image = images.value;
  emit('nexts');
});
</script>

<template>
  <h4 class="mt-11 mb-7 text-center">
    Cuéntanos sobre tu <span class="text-secondary-100">negocio </span>
  </h4>
  <form @submit="onSubmit" :validation-schema="schema" class="mx-4 px-4 md:px-8  sm:mx-auto gap-4 max-w-[995px]">
    <!-- Nombre -->
    <label class="col-span-2 sm:mb-2 title-label mb-5">
      Nombre del negocio
      <Field class="form-control" name="title" type="text" placeholder="Nombre del negocio" />
      <ErrorMessage name="title" />
    </label>
    <!-- Descripcion -->
    <label for="description" class="col-span-2 title-label mb-5">Descripción
      <Field as="textarea" name="description" type="text" placeholder="Descripcion de la propiedad" />
      <ErrorMessage name="description" />
    </label>
    <h3 class="font-bold mb-4">Horario</h3>
    <ul class="col-span-2 flex flex-col gap-5 text-sm leading-[22px] mb-5">
      <li v-for="day in week" :key="day.day">
        <p class="mb-3.5 font-medium">
          {{day.day}}
        </p>
        <div class="flex md:flex-row flex-col md:items-center gap-x-11 gap-y-2">
          <label class="checkbox-labels">
            <input type="checkbox" class="checkbox" v-model="day.isClose" :true-value=1 :false-value=0>
            Cerrados
          </label>
          <div class="flex flex-wrap items-center gap-1.5" v-if="day.isClose === 0">
            <label for="openHour" class="whitespace-nowrap">Abre a las(s)</label>
            <VueDatePicker v-model="day.timeOpen" @update:model-value="(value) => day.open = value" :is-24="false" time-picker  />
          </div>
          <div class="flex flex-wrap items-center gap-1.5" v-if="day.isClose === 0">
            <label for="closeHour" class="whitespace-nowrap">Cierra a las(s)</label>
            <VueDatePicker v-model="day.timeClose" @update:model-value="(value) => day.close = value" :is-24="false" time-picker />
          </div>
        </div>
      </li>
    </ul>
    <!-- phone y whatsapp -->
    <div class="grid grid-cols-2 gap-4 mt-2">
      <label for="phone" class="title-label mb-5">
        Número telefónico
        <Field name="phone" v-model="phone">
          <vue-tel-input mode="international" v-model="phone" class="form-control"></vue-tel-input>
        </Field>
        <ErrorMessage name="phone" />
      </label>
      <label for="whatsapp" class="title-label mb-5">
        WhatsApp
        <Field class="form-control" name="whatsapp" type="number" placeholder="(829) 123-4567" />
      </label>
    </div>
    <!-- Web -->
    <label for="website" class="title-label mb-5 col-span-2">
      Página Web
      <Field class="form-control" name="website" type="text" placeholder="ej: https://hispana-negocios.com" />
    </label>
    <!-- Instagram -->
    <label for="instagram" class="title-label mb-5 col-span-2">
      Instagram
      <Field class="form-control" name="instagram" type="text" placeholder="ej: https://instagram.com/hispana-negocios" />
    </label>
    <!-- Facebook -->
    <label for="facebook" class="title-label col-span-2">
      Facebook
      <Field class="form-control" name="facebook" type="text" placeholder="ej: https://facebook.com/hispana-negocios" />
    </label>
    <!--  Profile photo-->
    <div class="mt-8 md:h-40 flex flex-col md:flex-row col-span-2 items-center md:items-start">
      <div class="flex md:mr-14 mb-6">
        <div class="flex flex-col items-center">
          <p class="whitespace-nowrap text-sm">Foto de perfil</p>
          <figure class="w-[107px] h-[107px] rounded-full border-[5px] border-secondary-100 mt-5 flex items-center justify-center z-10 overflow-hidden">
            <span class="font-bold text-5xl text-primary-100" v-if="!isNewImage">{{user.userData.name.charAt(0)}}{{ user.userData.lastname.charAt(0) }}</span>
            <img
              v-if="isNewImage"
              :src="`${profilePic}`"
              class="w-full h-full object-cover"
            >
            <img
              v-else
              src="/favicon.jpg"
              class="w-full h-full object-cover"
            >
          </figure>
        </div>
      </div>
      <div class="flex flex-col relative items-center justify-center border border-gray-300 rounded-md w-full h-40 overflow-hidden text-center">
        <div class="flex items-center justify-center rounded-full bg-neutral-10 w-14 h-14">
          <AtomsIcon name="general/upload" :size=28 class="text-primary-100" />
        </div>
        <p class="text-[#707070] text-sm">
          <span class="text-primary-100">Click para subir</span>
          o arrastra y suelta SVG, PNG, <br> JPG or GIF (max. 800px400px)
        </p>
        <Field name="imageProfile" v-slot="{ handleChange }">
          <input type="file" @change="(e) => { handleChange(e); previewFiles(e); }" class="absolute left-0 top-0 scale-[9] cursor-pointer opacity-0" />
        </Field>
      </div>
    </div>
    <ErrorMessage name="imageProfile" class="my-3" />
    <!-- Map -->
    <div class="col-span-2 gap-4 sm:grid grid-cols-2 mt-4 md:mt-0">
      <div class="col-span-2">
        <label for="map" class="text-sm">Ubicación</label>
        <ClientOnly>
          <PopulationPostBussinesMap v-if="!mapNotSupported" @send-location="getAddress" @mapNotSupported="mapNotSupported = true" />
        </ClientOnly>
        <div v-if="!mapNotSupported && use_posts.lat === 0 && use_posts.log === 0" class="bg-[yellow] bg-opacity-35 border-[yellow] border rounded-sm p-4 text-sm mt-3 text-center mb-5">
          Por favor mueva el indicador en el mapa a la ubicación de la propiedad, esto nos ayudará a mostrarla en el mapa.
        </div>
        <div v-if="mapNotSupported" class="bg-[red] bg-opacity-35 border-[red] border rounded-sm p-4 text-sm mt-3 font-medium text-black text-center mb-5">
          Por favor active la geolocalización en su navegador para poder ubicar la propiedad en el mapa.
        </div>
      </div>
      <!-- ubicacion -->
      <label class="w-full sm:mb-2 mb-5 col-span-2 title-label">
        Dirección
        <Field class="form-control" v-model="address" name="address" type="text" placeholder="Direccion" />
        <ErrorMessage name="address" />
      </label>
    </div>   
    <!-- Pais -->
    <label class="w-full sm:mb-2 mb-5 title-label">
      País
      <Field name="country" as="select" v-model="country" class="form-control">
        <option v-for="country in countries" :key="country" :value="country.id" class="option-label">
          {{ country.name }}
        </option>
      </Field>
      <ErrorMessage name="country" />
    </label>
    <!-- Ciudad -->
    <label class="w-full sm:mb-2 mb-5 title-label" >
      Ciudad
      <Field name="sector" as="select" v-model="sector" class="form-control">
        <option v-for="sector in sectors[0]" :value="sector.id" :key="sector.id" class="option-label">
          {{ sector.name }}
        </option>
      </Field>
      <ErrorMessage name="sector" />
    </label>
    <!-- Sector -->
    <label class="w-full sm:mb-2 mb-5 title-label">
      Sector
      <Field name="city" as="select" class="form-control">
        <option v-for="item in cities[0]" :value="item.id" :key="item.id" class="option-label">
          {{ item.name }}
        </option>
      </Field>
      <ErrorMessage name="city" />
    </label>
    <div class="col-span-3 flex justify-center w-full gap-4">
      <AtomsButtons @click="$emit('back')" btn-style="outline-primary">
        Atras
      </AtomsButtons>
      <AtomsButtons @click="onSubmit">
        Continuar
      </AtomsButtons>
    </div>
  </form>
</template>

<style lang="postcss" scoped>
h4 { @apply font-semibold text-[28px] leading-[42px]; }

.title-label {
  @apply flex flex-col font-normal text-sm text-opacity-[0.85] gap-3;
}
.hour-select-container{
  @apply flex items-center px-2 py-1 bg-neutral-white border border-neutral-10 rounded-lg;

  & select{
    @apply text-[#a8a8a8] appearance-none border-none focus:outline-none scrollbar cursor-pointer;
    & option{
      @apply text-neutral-black
    }
  }
}
.form-control {
  @apply h-8 w-full border border-[#D9D9D9] text-sm rounded-md px-3 placeholder:text-opacity-25 placeholder:font-normal focus:outline-primary-100 disabled:cursor-not-allowed disabled:bg-neutral-10;
}
.select-multiple { @apply h-40; }
.value-toggle_btn {
  @apply border-y border-gray-300 text-primary-100 w-[37px] h-8 text-[12px] mb-0 mt-auto ;
  &.active { @apply bg-primary-100 text-neutral-white border-none; }
}

textarea {
  @apply border border-[#D9D9D9] text-sm rounded-md px-3 py-2 placeholder:text-opacity-25 placeholder:font-normal focus:outline-primary-100 h-[130px];
}
.amenities-wrapper {
  @apply bg-neutral-white border border-gray-100 rounded-lg px-2.5 pt-3 overflow-y-scroll hover:overscroll-contain h-56  ;
}

.checkbox-labels {
  @apply cursor-pointer select-none flex items-center;
  & .checkbox {
    @apply relative appearance-none flex-none w-4 h-4 border border-gray-300 rounded-sm mr-2 cursor-pointer hover:bg-secondary-100 hover:border-none checked:bg-primary-100 checked:hover:bg-gray-300 checked:border-none
    after:w-full
    after:h-full
    after:absolute
    after:bg-no-repeat
    after:bg-center
    after:bg-[length:10px]
    after:bg-[url('~/assets/icons/general/check.svg')];
  }
}

.scrollbar {
  &::-webkit-scrollbar {
    @apply w-5;
  }

  &::-webkit-scrollbar-track {
    @apply bg-neutral-white rounded-full;
  }

  &::-webkit-scrollbar-thumb {
    @apply border-[6px] border-solid border-neutral-white rounded-full bg-[#C1C1C1];
  }
}

span[role=alert] {
  @apply text-[red] font-medium text-sm;
}

</style>