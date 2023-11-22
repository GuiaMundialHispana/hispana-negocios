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
    async getGoogle(){
      const { data,error }  = await useFetch(this.$config.public.API+'auth/social/google',{
        method: 'GET',
        headers: {
          'access-control-allow-origin': "*",
          'Content-Type':"application/json",
          'Accept': "application/json",
        }

      });
      const res = error;
      const res2 = data;
    },
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
      const { data }  = await useFetch(useRuntimeConfig().API+'auth/change-password',{
        method: 'POST',
        body: {
          email: this.emailPassword,
          password: this.newPassword,
          password_confirmation: this.repeatPassword,
          token: localStorage.getItem('token')
        }
      });

      if(data) {
        Swal.fire({
          icon: 'success',
          title: 'Hemos validado tus datos correctamente, intenta acceder otra vez',
          timer: 3000
        })
        useRouter().push("/");
      }
    },
    async get_user() {
      const { data, error } = await useFetch('auth/profile',{
        method: 'GET',
        baseURL: useRuntimeConfig().public.API,
        headers: {
          'Authorization': `Bearer ${this.token}`
        },
        onResponse({ response }) {
          let responseApi = response._data.message;

          if(response.status === 404 || responseApi === "Token invalid or not provided." || response.status === 500 || response.status === 302) {
            localStorage.removeItem('token');
            Swal.showLoading();
            useRouter().push("/").then(() => {
              Swal.fire({
                icon: 'error',
                text: 'Por favor inicia sesion nuevamente',
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 5000
              });
              navigateTo('/')
              location.reload();
            });
          }

          if(response._data.status === false) {
            localStorage.removeItem('token');
            Swal.fire({
              icon: 'error',
              text: 'Confirma que tus datos esten correctos',
              timer: 2000
            });
          }
        },
        onResponseError() {
          localStorage.removeItem('token');
          Swal.showLoading();
          useRouter().push("/").then(() => {
            Swal.fire({
              icon: 'error',
              text: 'Por favor inicia sesion nuevamente',
              showConfirmButton: false,
              allowOutsideClick: false,
              timer: 5000
            });
            navigateTo('/')
            location.reload();
          });
        }
      });
      
      if(data.value != null) {
        let response = data.value;
        let user_response = data.value.results.user;

        if(response.code === 200) {
          this.userData = user_response;
        }
      }
    },
    async refresh_token() {
      const {data, error} = await useFetch('auth/refresh',{
        method: 'POST',
        baseURL: useRuntimeConfig().public.API,
        headers: {
          'Authorization': `Bearer ${this.token}`
        },
        onResponseError({response}) {
          let responseApi = response._data.message;
          if(response.status === 404 || responseApi === "Token invalid or not provided.") {
            localStorage.removeItem('token');
            Swal.showLoading();
            useRouter().push("/").then(() => {
              Swal.fire({
                icon: 'error',
                text: 'Por favor inicia sesion nuevamente',
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 5000
              });
            });
          }
        }
      });

      if(data) {
        let response = data.value;
        let user_response = data.value.results.user;
      }

      if(data.value != null) {
        this.token = data.value.results.access_token;
        localStorage.setItem('token', this.token);
      }
    }
  }
});