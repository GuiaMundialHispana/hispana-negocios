import { defineStore, acceptHMRUpdate } from 'pinia';
import Swal from 'sweetalert2';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      config: useRuntimeConfig(),
      userData: {
        id: Number,
        name: '',
        lastname: '',
        birthdate: '',
        country_id: Number,
        cellphone: Number,
        phone: Number,
        email: '',
        profile_pic: null
      },
      getEmail: '',
      nextStep: false,
      emailPassword: '',
      passwordToken: '',
      newPassword: '',
      repeatPassword: '',
      token: ''
    }
  },
  actions: {
    async sendPassWordEmail() {
      const { data, pending } = await useFetch('auth/forgot-password',{
        method: 'POST',
        baseURL: this.config.public.API,
        body: {
          email: this.getEmail
        },
        onResponseError({ request, response, options }) {
          const res = response._data;
          Swal.fire({
            icon: 'error',
            text: res.message,
            showConfirmButton: false,
            timer: 3000
          });
        },
      });
      if(data.value.status === true ) {
        this.nextStep = true;
        Swal.hideLoading();
      }
    },
    async changePassword() {
      await useFetch(useRuntimeConfig().public.API+'auth/change-password',{
        method: 'POST',
        body: {
          email: this.emailPassword,
          password: this.newPassword,
          password_confirmation: this.repeatPassword,
          token: localStorage.getItem('token')
        },
        onResponseError({ response }) {
          if(response.status !== 200) {
            Swal.fire({
              icon: 'error',
              text: response._data.message,
              showConfirmButton: false,
              timer: 3000
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Hemos validado tus datos correctamente, intenta acceder otra vez',
              showConfirmButton: false,
              timer: 3000
            });
            useRouter().push("/");
          }
        }
      });
    },
  }
});