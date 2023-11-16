<template>
  <div class="flex flex-col w-full  items-center justify-center">
    <div class="relative w-full">
      <input placeholder="Correo electrónico" type="email" v-model="authStore.email">
      <AtomsIcon
        name="general/user"
        :size=14
        class="absolute text-primary-100 z-50 top-1/4 left-2"
      />
    </div>
    <div class="relative w-full">
      <input placeholder="Contraseña" type="password" v-model="authStore.password">
      <AtomsIcon
        name="general/lock"
        :size=14
        class="absolute text-primary-100 z-50 top-1/4 left-2"
      />
    </div>
    <NuxtLink to="/forgotPassword" @click="$emit('close')" class="text-primary-100 ml-auto w-max block">Olvidé la contraseña</NuxtLink>
    <AtomsButtons btn-size="medium" @click="auth.login();">
      Entrar
    </AtomsButtons>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/Auth';
import Swal from 'sweetalert2';

const authStore = useAuthStore();
const config = useRuntimeConfig();
const emit = defineEmits(['close'])

async function login() {
  Swal.showLoading()
  const { data}  = await useFetch('auth/login',{
    method: 'POST',
    baseURL: config.public.API,
    body: {
      email: authStore.email,
      password: authStore.password
    },
  });

  try {
    Swal.hideLoading();
    const res = data.value.results;
    Swal.fire({
      icon: 'success',
      text: 'Bienvenido',
      showConfirmButton: false,
      timer: 2000
    });
    navigateTo('/profile?tab=anuncio')
    localStorage.setItem('token', res.access_token.original.access_token);
    emit('close');
  } 
  catch (error) {
    Swal.hideLoading();
    Swal.fire({
      icon: 'error',
      text: 'Confirma que tus datos esten correctos'
    });
  }
};
</script>

<style lang="postcss" scoped>
.btn {
  @apply rounded-sm mt-6 !important;
}
input {
  @apply w-full mb-2 border border-gray-100 rounded-sm placeholder:text-center focus:outline-primary-100 h-10 px-8 py-2;
}
</style>