<template>
  <div class="flex flex-col w-full  items-center justify-center">
    <div class="relative w-full">
      <!-- @keyup.enter="auth.login();$emit('close')" -->
      <input placeholder="Correo electrónico" type="email" v-model="auth.email">
      <AtomsIcon
        name="general/user"
        :size=14
        class="absolute text-primary-100 z-50 top-1/4 left-2"
      />
    </div>
    <div class="relative w-full">
      <!-- @keyup.enter="auth.login();$emit('close') -->
      <input placeholder="Contraseña" type="password" v-model="auth.password">
      <AtomsIcon
        name="general/lock"
        :size=14
        class="absolute text-primary-100 z-50 top-1/4 left-2"
      />
    </div>
    <NuxtLink to="/forgotPassword" @click="$emit('close')" class="text-primary-100 ml-auto w-max block">Olvidé la contraseña</NuxtLink>
    <AtomsButtons btn-size="medium" @click="auth.login(); $emit('close')">
      Entrar
    </AtomsButtons>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '~/stores/Auth';
export default {
  data() {
    return {
      auth: useAuthStore(),
    }
  },
}
</script>

<style lang="postcss" scoped>
.btn {
  @apply rounded-sm mt-6 !important;
}
input {
  @apply w-full mb-2 border border-gray-100 rounded-sm placeholder:text-center focus:outline-primary-100 h-10 px-8 py-2;
}
</style>