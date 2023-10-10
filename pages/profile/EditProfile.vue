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
              v-model="editUser.editUserData.name"
              class="lg:mr-4 mr-0"
            >
            <!-- :placeholder="user.userData.name" -->
          </label>
          <label>
            Apellido:
            <input
              type="text"
              v-model="editUser.editUserData.lastname"
            >
          </label>
        </div>
        <div class="flex md:flex-row flex-col gap-2">
          <label class="relative">
            Fecha de nacimiento:
            <input
              type="date"
              v-model="editUser.editUserData.birthdate"
              class="datePicker uppercase text-[#727272] lg:mr-4 mr-0"
            >
          </label>
          <label>
            País:
            <select class="form-control" v-model="editUser.editUserData.country_id">
              <option v-for="country in countries[0]" :value="country.id" :key="country.id" class="option-label">
              {{ country.name }}
              </option>
            </select>
          </label>
        </div>
      </div>
      <h4>Contactos</h4>
      <div class="flex md:flex-row flex-col gap-2">
        <label>
          Teléfono móvil:
          <input
            type="tel"
            class="lg:mr-4 mr-0"
            v-model="editUser.editUserData.phone"
          >
          <!-- :placeholder="user.userData.cellphone" -->
        </label>
        <label>
          Teléfono residencial:
          <input
            type="tel"
            v-model="editUser.editUserData.cellphone"
          >
          <!-- v-model="editUser.editUserData.cellphone" -->
        </label>
      </div>
      <div>
        <label>
          Correo electrónico:
          <input
            type="email"
            v-model="editUser.editUserData.email"
          >
          <!-- :placeholder="user.userData.email" -->
        </label>
      </div>
      <div class="flex flex-col mt-8">
        <h4>Contraseña</h4>
        <p class="mt-3 mb-6">Una contraseña segura que te ayuda a proteger tu cuenta de Hispana Home</p>
        <p>*************************</p>
        <button class="flex items-center gap-2 text-primary-100 mb-4 mt-4" @click="showChangePasswd = !showChangePasswd">
          Cambiar contraseña 
          <AtomsIcon name="arrows/arrow-right" :size=15 v-if="!showChangePasswd"/>
          <AtomsIcon name="arrows/arrow-down" :size=15 v-if="showChangePasswd"/>
        </button>
        <div class="flex-col md:w-[500px]" v-if="showChangePasswd">
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
            <figure class="w-[107px] h-[107px] rounded-full border-[5px] border-secondary-100 mt-5">
              <img v-if="!isNewImage"
                :src="`https://seal-app-4mhut.ondigitalocean.app/${editUser.editUserData.profile_pic}`"
                :alt="editUser.editUserData.name"
                class="rounded-full w-full h-full object-cover"
              >
              <img
                v-if="isNewImage && editUser.editUserData != null"
                :src="`${editUser.editUserData.profile_pic}`"
                :alt="editUser.editUserData.name"
                class="rounded-full w-full h-full object-cover"
              >
              <span v-if="isNewImage && editUser.editUserData === null" class="w-full h-full flex items-center justify-center font-bold text-primary-100 text-6xl rounded-full border-2 border-primary-100 bg-secondary-100">
                {{user.userData.name.charAt(0)}}{{ user.userData.lastname.charAt(0) }}
              </span>
            </figure>
          </div>
        </div>
        <div class="flex flex-col relative items-center justify-center border border-gray-300 rounded-md w-full h-40 overflow-hidden text-center">
          <div class="flex items-center justify-center rounded-full bg-secondary-100 w-14 h-14">
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
        <AtomsButton
          class="cancel-btn"
          btn-size="xsmall"
          btn-style="outline-gray"
          @click="isNewImage = false, editUser.$reset(), useRouter().back()"
          >Cancelar
        </AtomsButton>
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

<script>
import { useUserEditStore } from '~/stores/EditUser';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      editUser:useUserEditStore (),
      config: useRuntimeConfig(),
      showChangePasswd: false,
      profilePic: '',
      images: null,
      countries: [],
      country: [],
      form: new FormData(),
      password: '',
      password_confirmation: '',
      current_password: '',
      isNewImage: false
    }
  },
  watch:{
    profilePic() {
      this.editUser.editUserData.profile_pic = this.profilePic;
      this.isNewImage = true;
    },
    images() {
      this.form.append('profile_pic', this.editUser.images);
    }
  },
  methods: {
    previewFiles(event) {
      this.images = event.target.files[0]
      this.profilePic = URL.createObjectURL(this.images);
      this.editUser.images = this.images;
    },
    async getCountries() {
      const { data } = await useFetch('generals/countries', {
        baseURL: this.config.public.API
      })
      const res = data._value.results.data;
      this.countries.push(res);
    },
    async changesPassword(){
      Swal.showLoading();
      this.form.append('email', this.editUser.editUserData.email);
      this.form.append('current_password', this.current_password);
      this.form.append('password', this.password);
      this.form.append('password_confirmation', this.password_confirmation);
      await useFetch('users/update?_method=PUT',{
        method: 'POST',
        body: this.form,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json'
        },
        baseURL: this.config.public.API,
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
            // useRouter().go()
            useRouter().push("/profile?tab=anuncio");
          }
        }
      });
    },
    async updateUser() {
      Swal.showLoading();
      this.form.append('user_id', this.editUser.editUserData.user_id);
      this.form.append('email', this.editUser.editUserData.email)
      this.form.append('name', this.editUser.editUserData.name);
      this.form.append('lastname', this.editUser.editUserData.lastname);
      if(this.editUser.editUserData.phone === '' || this.editUser.editUserData.phone === null ) {
        this.form.append('phone', 123456789);
      } else {
        this.form.append('phone', this.editUser.editUserData.phone);
      }

      if(this.editUser.editUserData.birthdate === '' ||this.editUser.editUserData.birthdate === null ) {
        this.form.append('birthdate', '');
      } else {
        this.form.append('birthdate', this.editUser.editUserData.birthdate);
      }

      if(this.editUser.editUserData.cellphone === '' || this.editUser.editUserData.cellphone === null ) {
        this.form.append('cellphone', 12345678);
      } else {
        this.form.append('cellphone', this.editUser.editUserData.cellphone);
      }

      if(this.editUser.editUserData.country_id === '' || this.editUser.editUserData.country_id === null || this.editUser.editUserData.country_id === 0) {
        this.form.append('country_id', 12345678);
      } else {
        this.form.append('country_id', this.editUser.editUserData.country_id);
      }

      await useFetch('users/update?_method=PUT',{
        method: 'POST',
        body: this.form,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json'
        },
        baseURL: this.config.public.API,
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
            // useRouter().go()
            useRouter().push("/profile?tab=anuncio");
            editUserData.$reset();
          }
        }
      });
    }
  },
  created() {
    this.getCountries();
  }
}
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