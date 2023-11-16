import { defineStore, acceptHMRUpdate } from 'pinia';
import Swal from 'sweetalert2';

export const useAuthStore = defineStore('auth', {
  state:() => {
    return {
      isLoggedIn: false,
      email: '',
      password: '',
      config: useRuntimeConfig(),
      token: '',
      route: useRouter(),
    }
  },
  actions: {
    async login() {
      Swal.showLoading()
      const { data}  = await useFetch('auth/login',{
        method: 'POST',
        baseURL: this.config.public.API,
        body: {
          email: this.email,
          password: this.password
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
        //Save data in localStorage
        navigateTo('/profile?tab=anuncio')
        localStorage.setItem('token', res.access_token.original.access_token);
      } 
      catch (error) {
        Swal.hideLoading();
        $emit('close')
        Swal.fire({
          icon: 'error',
          text: 'Confirma que tus datos esten correctos'
        });
      }
    },
    async logOut() {
      Swal.showLoading()
      await useFetch('auth/logout',{
        method: 'POST',
        baseURL: this.config.public.API,
        body: {
          token: localStorage.getItem('token')
        }
      });
      this.isLoggedIn = false;
      localStorage.removeItem('token');

      try {
        Swal.hideLoading();
        Swal.close();
        useRouter().push("/")
      } 
      catch (error) {
       console.log(error);
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}