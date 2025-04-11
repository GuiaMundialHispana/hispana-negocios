import Swal from 'sweetalert2';
import { useUserStore } from '~/stores/User';

export default async function useLogOut() {
  const isLogged = useState('isLogged');
  const config = useRuntimeConfig();
  const token = useState('token');
  const user = useUserStore();

  await $fetch('auth/logout',{
    method: 'POST',
    baseURL: config.public.API,
    body: {
      token: localStorage.getItem('token')
    },
    onRequestError() {
      Swal.showLoading();
      localStorage.removeItem('token');
      useUserStore().$reset();
      isLogged.value = false;
      useRouter().push("/").then(() => {
        Swal.fire({
          icon: 'error',
          text: 'Por favor inicia sesion nuevamente',
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 5000
        });
      });
    },
    onResponseError() {
      Swal.showLoading();
      localStorage.removeItem('token');
      useUserStore().$reset();
      isLogged.value = false;
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
  });
}