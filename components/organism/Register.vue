<template>
  <div class="flex flex-col w-full items-center justify-center">
    <div class="relative w-full">
      <input placeholder="Nombre" type="text" v-model="name">
      <AtomsIcon name="general/user" :size=14 class="absolute text-primary-100 z-50 top-1/4 left-2" />
    </div>
    <div class="relative w-full">
      <input placeholder="Apellido" type="text" v-model="lastname">
      <AtomsIcon name="general/user" :size=14 class="absolute text-primary-100 z-50 top-1/4 left-2" />
    </div>
    <div class="relative w-full">
      <input placeholder="Correo electrónico" type="email" v-model="email">
      <AtomsIcon name="general/email-slim" :size=14 class="absolute text-primary-100 z-50 top-1/4 left-2" />
    </div>
    <div class="relative w-full">
      <input placeholder="Contraseña" type="password" v-model="password">
      <AtomsIcon name="general/lock" :size=14 class="absolute text-primary-100 z-50 top-1/4 left-2" />
    </div>
    <div class="relative w-full">
      <input placeholder="Repite contraseña" type="password" v-model="password_confirmation">
      <AtomsIcon name="general/lock" :size=14 class="absolute text-primary-100 z-50 top-1/4 left-2" />
    </div>
    <AtomsButtons btn-size="medium"  @click="register(),$emit('close')">
      Registrar
    </AtomsButtons>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import { useAuthStore } from '~/stores/Auth';
import { useUserStore  } from '~/stores/User';
const config = useRuntimeConfig();
const auth = useAuthStore();
const user = useUserStore();
let name = ref('');
let lastname = ref('');
let email = ref('');
let password = ref('');
let password_confirmation = ref('');

async function register() {
  const {pending, data} = await useFetch('auth/register',{
    method: 'POST',
    body: {
      name: name,
      lastname: lastname,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    },
    baseURL: config.public.API,
    onResponse({response}) {
      // console.log(response._data)
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
          text: `${response._data.message}`
        });
        localStorage.setItem('token', response._data.results.access_token.original.access_token);
        auth.isLoggedIn = true;
        // let isAuthenticated = window.localStorage.getItem('token');
        // async function getProfile() {
        //   const data = await $fetch('auth/profile', {
        //     method: 'GET',
        //     headers: {
        //       'Authorization': 'Bearer ' + isAuthenticated
        //     },
        //     baseURL: config.public.API
        //   });
        //   const res = data.results.user;
        //   user.userData = res;
        // }
        // getProfile();
        useRouter().push('/profile?tab=plan');
      }
    }
  });
};
</script>

<style lang="postcss" scoped>
.btn {
  @apply rounded-sm my-6 !important;
}
input {
  @apply w-full mb-2 border border-gray-100 rounded-sm placeholder:text-center focus:outline-primary-100 h-10 px-8 py-2;
}
</style>