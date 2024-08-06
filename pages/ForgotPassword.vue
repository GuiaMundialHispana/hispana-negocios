<template>
  <section class="w-full py-16">
    <div class="container mx-auto">
      <!-- Send email -->
      <div v-if="!user.nextStep" class="mx-auto max-w-[365px]">
        <figure class="mb-5">
          <img src="/img/logo.svg" class="w-40 mx-auto" />
        </figure>
        <h3 class="text-neutral-black font-semibold text-center text-xl mb-5">Restablece tu contraseña</h3>
        <p class="text-neutral-black text-sm text-center mb-5">Introduce el <b>correo electrónico</b> que utilizaste al registrarte para recuperar tu contraseña. Recibirá un enlace para restablecer la contraseña .</p>
        <div class="relative w-full">
          <input placeholder="Correo electrónico" type="email" v-model="user.getEmail">
          <AtomsIcon
            name="general/email-slim"
            :size=14
            class="absolute text-primary-100 z-50 top-3 left-4"
          />
        </div>
        <div class="flex justify-center">
          <AtomsButtons
            @click="user.sendPassWordEmail();"
            btn-size="small"
            :disabled="user.getEmail === ''"
          >
            Enviar enlace
          </AtomsButtons>
        </div>
      </div>
      <!--  -->
      <div v-if="user.nextStep" class="mx-auto max-w-[365px]">
        <figure class="mb-5">
          <img src="/img/password-step-1.png" class="object-contain mx-auto" />
        </figure>
        <h3 class="text-neutral-black font-semibold text-center text-xl mb-5">Te hemos enviado un email con un enlace para que restablezcas tu contraseña</h3>
        <p class="text-neutral-black text-sm text-center mb-5">Si no encuentras el mensaje en tu bandeja principal revisa las bandejas de spam y promociones</p>
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
      access: false
    }
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