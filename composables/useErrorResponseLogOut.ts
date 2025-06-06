import Swal from 'sweetalert2';
import { useUserStore } from '~/stores/User';
import {usePostsStore} from "~/stores/Post";
import {useAuthStore} from "~/stores/Auth";

export default async function useLogOut() {
  const isLogged = useState('isLogged');
  const config = useRuntimeConfig();
  const token = useState('token');
  const refer = useState('refer');
  
  await $fetch('auth/logout',{
    method: 'POST',
    baseURL: config.public.API,
    body: {
      token: localStorage.getItem('token')
    },
    onResponse({response}) {
      let response_data = response._data;
      if(response_data.status || response_data.code === 200) {
        Swal.showLoading();
        refer.value = '';
        localStorage.removeItem('token');
        localStorage.removeItem('ref')
        isLogged.value = false;
        token.value = '';
        useUserStore().$reset();
        usePostsStore().$reset();
        useAuthStore().$reset();
        useRouter().push("/").then(() => {
          Swal.fire({
            icon: 'success',
            text: 'Sesión cerrada correctamente',
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 5000
          });
        });
      }
    },
    onRequestError() {
      Swal.showLoading();
      localStorage.removeItem('token');
      refer.value = '';
      localStorage.removeItem('ref')
      isLogged.value = false;
      token.value = '';
      useUserStore().$reset();
      usePostsStore().$reset();
      useAuthStore().$reset();
      useRouter().push("/").then(() => {
        Swal.fire({
          icon: 'error',
          text: 'Por favor iniciar sesión nuevamente',
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 5000
        });
      });
    },
    onResponseError() {
      Swal.showLoading();
      refer.value = '';
      localStorage.removeItem('ref')
      localStorage.removeItem('token');
      useUserStore().$reset();
      usePostsStore().$reset();
      useAuthStore().$reset();
      isLogged.value = false;
      token.value = '';
      useRouter().push("/").then(() => {
        Swal.fire({
          icon: 'error',
          text: 'Por favor inicia sesión nuevamente',
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 5000
        });
      });
    }
  });
}