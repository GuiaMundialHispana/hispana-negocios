<template>
  <form @submit.prevent="onSubmit" class="flex flex-col w-full items-center justify-center">
    <div class="relative w-full">
      <Field class="form-control" name="email" type="email" placeholder="Correo electrónico" />
      <AtomsIcon
        name="general/user"
        :size=14
        class="absolute text-primary-100 z-50 top-1/4 left-2"
      />
    </div>
    <ErrorMessage name="email" class="error" />
    <div class="relative w-full">
      <Field class="form-control" name="password" type="password" placeholder="Contraseña" />
      <AtomsIcon
        name="general/lock"
        :size=14
        class="absolute text-primary-100 z-50 top-1/4 left-2"
      />
    </div>
    <ErrorMessage name="password" class="error" />
    <NuxtLink to="/forgotPassword" @click="$emit('close')" class="text-primary-100 ml-auto w-max block">Olvidé la contraseña</NuxtLink>
    <AtomsButtons btn-size="medium" type="submit" :is-disabled="!meta.dirty || !meta.valid">Entrar</AtomsButtons>
  </form>
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2';
import { useForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const config = useRuntimeConfig();
const emit = defineEmits(['close']);
const schema = yup.object({
  email: yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria')
});

const { handleSubmit, meta} = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
  await login(values.email, values.password);
});

async function login(email: string, password: string) {
  Swal.showLoading()
  await $fetch('auth/login',{
    method: 'POST',
    baseURL: config.public.API,
    body: { email, password},
  }).then((response) => {
    Swal.hideLoading();
    const response_data = response.results;
    Swal.fire({
      icon: 'success',
      text: 'Bienvenido',
      showConfirmButton: false,
      timer: 2000
    });
    const token = response_data.access_token.original.access_token;
    useState('token', token);
    localStorage.setItem('token', token);
    navigateTo('/profile?tab=anuncio')
    emit('close');
  }).catch((error) => {
    console.log(error);
    Swal.hideLoading();
    Swal.fire({
      icon: 'error',
      text: 'Confirma que tus datos estén correctos'
    });
  });
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