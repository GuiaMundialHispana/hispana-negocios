<template>
  <div class="mx-4 sm:w-[568px] mb-6 sm:grid sm:grid-cols-2 sm:mx-auto gap-4">
    <div class="flex flex-col">
      <label for="name">Nombre</label>
      <input class="form-control mt-2" v-model="name" placeholder="Nombre" type="text" id="name">
    </div>
    <div class="flex flex-col">
      <label for="email">Correo</label>
      <input class="form-control mt-2" v-model="email" placeholder="Correo" required type="email" id="email">
    </div>
    <div class="flex flex-col col-span-2">
      <label for="message">Mensaje</label>
      <textarea v-model="message" class="mt-2 border border-[#D9D9D9] text-sm rounded-sm px-3 py-2 placeholder:text-opacity-25 placeholder:font-normal h-14 focus:outline-primary-100" type="text" id="message" maxlength="100"></textarea>
      <p :class="[{limit: message.length === 100}]" class="ml-auto text-neutral-black text-base opacity-25">{{ message.length }}/100</p>
    </div>
    <div class="mr-auto mt-4 sm:mt-1 col-start-2 sm:mr-0 ml-auto flex justify-end">
      <AtomsButtons class="font-semibold" @click="sendMessage()">Enviar</AtomsButtons>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default{
  data() {
    return {
      name: '',
      email: '',
      message: '',
      config: useRuntimeConfig(),
    }
  },
  methods: {
    async sendMessage() {
      this.isDisabled = false;
      const form = new FormData();
      form.append('name', this.name);
      form.append('email', this.email)
      form.append('description', this.message)
      const data = await $fetch('generals/contact',{
        method: 'POST',
        body: form,
        baseURL: this.config.public.API,
        onResponse({response}) {
          if(response.status === 500 ) {
            Swal.fire({
              icon: 'error',
              text: 'En estos momentos estamos presentando un error, intente mas tarde'
            })
          }

          if(response.status === 400 ) {
            Swal.fire({
              icon: 'error',
              text: 'Verifica que toda la informacion este correctamente'
            })
          }

          if(response.status === 200 ) {
            Swal.fire({
              icon: 'success',
              text: 'Su mensaje se ha enviado con exito, estaremos respondiendo lo mas pronto posible'
            })
          }
        }
      });
    }
  },
}
</script>
<style lang="postcss" scoped>
  label {
    @apply font-normal text-sm mr-2 text-opacity-[0.85];
  }
  .form-control {
    @apply h-8 border border-[#D9D9D9] text-sm rounded-sm px-3 placeholder:text-opacity-25 placeholder:font-normal focus:outline-primary-100;
  }
  .btn { @apply rounded-sm !important; }
  .limit { @apply font-semibold text-primary-100 opacity-100}
</style>
