<template>
  <section class="w-full py-16">
    <div class="mx-auto max-w-[365px]">
      <figure class="mb-5">
        <img src="/img/logo.png" class="w-40 mx-auto" />
      </figure>
      <h3 class="text-neutral-black font-semibold text-center text-xl mb-5">Actualizar contraseña</h3>
      <div class="relative w-full mb-4">
        <input placeholder="Contraseña nueva" type="password" v-model="user.newPassword">
        <AtomsIcon
          name="general/lock"
          :size=14
          class="absolute text-primary-100 z-50 top-3 left-4"
        />
      </div>
      <div class="relative w-full">
        <input placeholder="Repite contraseña" type="password" v-model="user.repeatPassword">
        <AtomsIcon
          name="general/lock"
          :size=14
          class="absolute text-primary-100 z-50 top-3 left-4"
        />
      </div>
      <div class="flex justify-center">
        <AtomsButtons
          @click="user.changePassword()"
          btn-size="small"
        >
        Enviar nueva contraseña
        </AtomsButtons>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { useUserStore } from '~/stores/User';
export default {
  data() {
    return {
      user: useUserStore(),
      auth: {},
      email: '',
      password: '',
    }
  },
  beforeCreate() {
    this.auth = useRuntimeConfig();
  },
  created() {
    const route = useRoute();
    this.user.token = route.query.token;
    this.user.emailPassword = route.query.email;
  }
}
</script>

<style lang="postcss" scoped>
.btn {
  @apply rounded-sm mt-6 !important;
}
input {
  @apply w-full border border-gray-300 rounded-sm placeholder:text-left focus:outline-primary-100 h-10 px-10 py-2;
}
</style>