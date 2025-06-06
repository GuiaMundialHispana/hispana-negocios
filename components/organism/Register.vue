<template>
  <form @submit.prevent="onSubmit" class="flex flex-col w-full items-center justify-center">
    <div class="relative w-full">
      <Field class="form-control" name="name" type="text" placeholder="Nombre" />
      <AtomsIcon name="general/user" :size=14 class="absolute text-primary-100 z-50 top-1/4 left-2" />
    </div>
    <ErrorMessage name="name" class="error" />
    <div class="relative w-full">
      <Field class="form-control" name="lastname" type="text" placeholder="Apellido" />
      <AtomsIcon name="general/user" :size=14 class="absolute text-primary-100 z-50 top-1/4 left-2" />
    </div>
    <ErrorMessage name="lastname" class="error" />
    <div class="relative w-full">
      <Field class="form-control" name="email" type="email" placeholder="Correo electrónico" />
      <AtomsIcon name="general/email-slim" :size=14 class="absolute text-primary-100 z-50 top-1/4 left-2" />
    </div>
    <ErrorMessage name="email" class="error" />
    <div class="relative w-full">
      <Field class="form-control" name="password" type="password" placeholder="Contraseña" />
      <AtomsIcon name="general/email-slim" :size=14 class="absolute text-primary-100 z-50 top-1/4 left-2" />
    </div>
    <ErrorMessage name="password" class="error" />
    <div class="relative w-full">
      <Field class="form-control" name="password_confirmation" type="password" placeholder="Repite contraseña" />
      <AtomsIcon name="general/email-slim" :size=14 class="absolute text-primary-100 z-50 top-1/4 left-2" />
    </div>
    <ErrorMessage name="password_confirmation" class="error" />
    <AtomsButtons btn-size="medium" type="submit" :is-disabled="!meta.dirty || !meta.valid">Registrar</AtomsButtons>
  </form>
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2';
import { useAuthStore } from '~/stores/Auth';
import { useForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const auth = useAuthStore();
const refer = useState('refer')

const config = useRuntimeConfig();
const emit = defineEmits(['close']);
const schema = yup.object({
  email: yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
  name: yup.string().required('El nombre es obligatorio'),
  lastname: yup.string().required('El apellido es obligatorio'),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir').required('La confirmación de contraseña es obligatoria')
});

const { handleSubmit, meta} = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
  await register(values);
});

async function register(values: any) {
  Swal.showLoading()
  await $fetch('auth/register',{
    method: 'POST',
    baseURL: config.public.API,
    body: {
      name: values.name,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
      refered_token: refer.value
    },
  })
    .then((response) => {
      console.log(response);
      Swal.fire({
        icon: 'success',
        text: `${response.message}`
      });
      localStorage.setItem('token', response.results.access_token.original.access_token);
      auth.isLoggedIn = true;
      useRouter().push('/profile?tab=plan');
      emit('close');
    })
    .catch((error) => {
      Swal.hideLoading()
      if (error.response) {
        console.log(error.response._data); // Aquí tienes el cuerpo de la respuesta de error
        let errors = error.response._data.message;
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
      } else {
        console.log(error);
      }
    })
}
</script>

<style lang="postcss" scoped>
.btn {
  @apply rounded-sm my-6 !important;
}
input {
  @apply w-full mb-2 border border-gray-100 rounded-sm placeholder:text-center focus:outline-primary-100 h-10 px-8 py-2;
}
</style>