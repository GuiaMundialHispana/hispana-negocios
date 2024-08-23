<template>
  <section class="max-w-[972px] mx-auto mt-[72px] px-4 mb-24">
    <div class="flex items-center gap-x-2 mb-3.5">
      <AtomsButtons
        btn-type="btn-icon"
        iconName="arrows/arrow-left"
        @click="useRouter().back()"
      />
      <h3 class="text-[28px] leading-[42px] font-semibold">Editar perfil</h3>
    </div>
    <p class="text-sm leading-[22px]">Actualiza tu información personal y detalles aquí.</p>
    <hr class="bg-gray-300 h-[1px] w-full border-none mt-8 mb-[22px]">
    <div class="form">
      <div class="flex flex-col">
        <h4>Información personal</h4>
        <div class="flex md:flex-row flex-col gap-2">
          <label>
            Nombre:
            <input
              type="text"
              v-model="name"
              class="lg:mr-4 mr-0"
            >
          </label>
          <label>
            Apellido:
            <input
              type="text"
              v-model="lastName"
            >
          </label>
        </div>
        <div class="flex md:flex-row flex-col gap-2">
          <label class="relative">
            Fecha de nacimiento:
            <input
              type="date"
              v-model="birthdate"
              class="datePicker uppercase text-[#727272] lg:mr-4 mr-0"
            >
          </label>
          <label>
            País:
            <select class="form-control" v-model="country">
              <option v-for="item in countries" :value="item.id" :key="item.id" class="option-label">
              {{ item.name }}
              </option>
            </select>
          </label>
        </div>
      </div>
      <h4>Contactos</h4>
      <div class="flex md:flex-row flex-col gap-2 mb-4">
        <label>
          Teléfono móvil:
          <vue-tel-input v-model="cellphone" mode="international" class="lg:mr-4 mr-0"></vue-tel-input>
        </label>
        <label>
          Teléfono residencial:
          <vue-tel-input v-model="phone" mode="international"></vue-tel-input>
        </label>
      </div>
      <div>
        <label>
          Correo electrónico:
          <input
            type="email"
            v-model="email"
          >
        </label>
      </div>
      <div class="flex flex-col mt-8">
        <h4>Contraseña</h4>
        <p class="mt-3 mb-6">Una contraseña segura que te ayuda a proteger tu cuenta de Hispana Home</p>
        <p>*************************</p>
        <button class="flex items-center gap-2 text-primary-100 mb-4 mt-4" @click="togglePassword = !togglePassword">
          Cambiar contraseña 
          <AtomsIcon name="arrows/arrow-right" :size=15 v-if="!togglePassword"/>
          <AtomsIcon name="arrows/arrow-down" :size=15 v-if="togglePassword"/>
        </button>
        <div class="flex-col md:w-[500px]" v-if="togglePassword">
          <label>
            Contraseña actual:
            <input
              type="password"
              placeholder="******"
              v-model="current_password"
            >
          </label>
          <label>
            Contraseña nueva:
            <input
              type="password"
              v-model="password"
            >
          </label>
          <label>
            Confirma la nueva contraseña:
            <input
              type="password"
              v-model="password_confirmation"
            >
          </label>
          <div class="flex gap-2.5 mr-auto mt-2">
            <AtomsButtons @click="changesPassword()" btn-size="xsmall" btn-style="solid-primary">
              Guardar
            </AtomsButtons>
          </div>
        </div>
      </div>
      <div class="mt-8 md:h-40 flex-col md:flex-row">
        <div class="flex flex-col md:mr-14 mb-6 md:mb-0">
          <div class="flex flex-col items-center">
            <p class="whitespace-nowrap">Actualiza tu foto de perfil</p>
            <figure class="w-[107px] h-[107px] rounded-full border-[5px] border-primary-50 mt-5">
              <img v-if="!isNewImage && userStore.userData.profile_pic != null"
                :src="`${userStore.userData.profile_pic}`"
                :alt="userStore.userData.name"
                class="rounded-full w-full h-full object-cover"
              >
              <span v-if="!isNewImage && userStore.userData.profile_pic === null" class="w-full h-full flex items-center justify-center font-bold text-primary-100 uppercase text-6xl rounded-full">
                {{userStore.userData.name.charAt(0)}}{{ userStore.userData.lastname.charAt(0) }}
              </span>
              <img
                v-if="isNewImage"
                :src="`${profilePic}`"
                :alt="userStore.userData.name"
                class="rounded-full w-full h-full object-cover"
              >
            </figure>
          </div>
        </div>
        <div class="flex flex-col relative items-center justify-center border border-gray-300 rounded-md w-full h-40 overflow-hidden text-center">
          <div class="flex items-center justify-center rounded-full bg-primary-50 w-14 h-14">
            <AtomsIcon name="general/upload" :size=28 class="text-primary-100" />
          </div>
          <p class="text-[#707070]">
            <span class="text-primary-100">Click para subir</span>
            o arrastra y suelta SVG, PNG, <br> JPG or GIF (max. 800px400px)
          </p>
          <input type="file" @change="previewFiles" class="absolute left-0 top-0 scale-[9] cursor-pointer opacity-0">
        </div>
      </div>
      <div class="flex gap-2.5 ml-auto mt-12">
        <AtomsButtons
          class="cancel-btn"
          btn-size="xsmall"
          btn-style="outline-gray"
          @click="isNewImage = false, useRouter().back()"
          >Cancelar
        </AtomsButtons>
        <AtomsButtons
          btn-size="xsmall"
          btn-style="solid-primary"
          @click="updateUser()"
          >Guardar
        </AtomsButtons>
      </div>
    </div>
  </section>
</template>

<script setup>
import Swal from 'sweetalert2';
import { useUserStore } from '~/stores/User';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

definePageMeta({
  middleware: 'check-auth'
});

const name = ref('');
const lastName = ref('');
const birthdate = ref(null);
const country = ref(null);
const phone = ref('');
const cellphone = ref('');
const email = ref('');
const password = ref('');
const current_password = ref('');
const password_confirmation = ref('');
const userStore = useUserStore();
const form = new FormData();
const togglePassword = ref(false);
const images = ref(null);
const profilePic = ref('');
const isNewImage = ref(false);

const { data: countries } = await useFetch('generals/countries', {
  baseURL: useRuntimeConfig().public.API,
  transform(data) {
    return data.results.data;
  }
});

async function changesPassword(){
  Swal.showLoading();
  email.value === '' ? form.append('email', userStore.userData.email) : form.append('email', email.value);
  form.append('current_password', current_password.value);
  form.append('password', password.value);
  form.append('password_confirmation', password_confirmation.value);
  await useFetch('users/update?_method=PUT',{
    method: 'POST',
    body: form,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/json'
    },
    baseURL: useRuntimeConfig().public.API,
    onResponse({response}) {
      Swal.hideLoading();
      if(response.status === 400) {
        let errors = response._data.message;
        Swal.fire({
          icon: 'error',
          html: '<ul></ul>',
          didOpen: () => {
            const b = Swal.getHtmlContainer().querySelector('ul');
            Object.keys(errors).forEach(clave => {
              const li = document.createElement('li');
              li.classList.add('text-primary-100', 'text-left', 'text-sm', 'mb-2')
              li.textContent = errors[clave];
              b.appendChild(li);
            });
          },
        });
      }

      if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          text: 'Sus datos han sido actualizados',
          showConfirmButton: false,
          timer: 2000
        });
        useRouter().push("/profile?tab=anuncio");
      }
    }
  });
};

async function updateUser() {
  Swal.showLoading();
  form.append('user_id', userStore.userData.id);
  form.append('email', email.value);

  name.value === '' ? form.append('name', userStore.userData.name) : form.append('name', name.value);
  lastName.value === '' ? form.append('lastname', userStore.userData.lastname) : form.append('lastname', lastName.value);
  email.value === '' ? form.append('email', userStore.userData.email) : form.append('email', email.value);
  phone.value === '' ? form.append('phone', 123456789) : form.append('phone', phone.value);
  birthdate.value === null ? form.append('birthdate', '') : form.append('birthdate', birthdate.value);
  cellphone.value === '' ? form.append('cellphone', 12345678) : form.append('cellphone', cellphone.value);
  country.value === null ? form.append('country_id', 12345678) :  form.append('country_id', country.value);

  await useFetch('users/update?_method=PUT',{
    method: 'POST',
    body: form,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/json'
    },
    baseURL: useRuntimeConfig().public.API,
    onResponse({response}) {
      Swal.hideLoading();
      if(response.status === 400) {
        let errors = response._data.message;
        Swal.fire({
          icon: 'error',
          html: '<ul></ul>',
          didOpen: () => {
            const b = Swal.getHtmlContainer().querySelector('ul');
            Object.keys(errors).forEach(clave => {
              const li = document.createElement('li');
              li.classList.add('text-primary-100', 'text-left', 'text-sm', 'mb-2')
              li.textContent = errors[clave];
              b.appendChild(li);
            });
          },
        });
      }

      if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          text: 'Sus datos han sido actualizados',
          showConfirmButton: false,
          timer: 2000
        });
        useRouter().push("/profile?tab=anuncio");
      }
    }
  });
}

function previewFiles(event) {
  images.value = event.target.files[0]
  profilePic.value = URL.createObjectURL(images.value);
};

watch(profilePic,() => {
  form.append('profile_pic', images.value);
  isNewImage.value = true;
})

watch(images,() => {
  form.append('profile_pic', images.value);
});

</script>

<style lang="postcss" scoped>
.form {
  @apply flex flex-col w-full;
  & div { @apply flex; }
  & label { @apply flex flex-col w-full text-sm leading-[22px]; }
  & input, 
  & select {
    @apply border border-gray-300 rounded-md h-8 focus:outline-primary-100 px-2 mb-3.5 cursor-pointer;
  }
}
h4 {
  @apply text-xl leading-[30px] font-semibold mb-3.5;
}
.datePicker {
  &::-webkit-calendar-picker-indicator {
    @apply opacity-25 cursor-pointer; 
  }
}
.cancel-btn {
  @apply hover:bg-gray-300 text-neutral-black !important;
}
</style>