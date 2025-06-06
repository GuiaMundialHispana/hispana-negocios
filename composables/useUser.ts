import Swal from 'sweetalert2';
export default function useUser() {
  const config = useRuntimeConfig();
  const token = useState('token');
  const user = useState('user', () => {});
  const pendingUserData = ref(false);

  async function getUser() {
    pendingUserData.value = true;
    await $fetch('auth/profile',{
      method: 'GET',
      baseURL: config.public.API,
      headers: {
        'Authorization': `Bearer ${token.value}`
      },
      onResponse({ response }) {
        let response_data = response._data;

        if(response_data.status || response_data.code === 200) {
          user.value = response_data.results.user;
          pendingUserData.value = false
        }

        if(!response_data.status || response_data.message === "Token invalid or not provided.") {
          console.log('error')
          useErrorResponseLogOut();
        }

        if(response._data.status === false) {
          console.log('error')
          useErrorResponseLogOut();
        }
      },
      onResponseError({response}) {
        console.log('error')
        useErrorResponseLogOut();
      },
      onRequestError({response}) {
        console.log('error')
        useErrorResponseLogOut();
      }
    });
  }

  async function changePassword(email:string, newPassword:string, repeatPassword:string) {
    await $fetch(config.public.API+'auth/change-password',{
      method: 'POST',
      body: {
        email,
        password: newPassword,
        password_confirmation: repeatPassword,
        token: token.value
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
  }

  async function sendPassWordEmail(email:string) {
    await $fetch('auth/forgot-password',{
      method: 'POST',
      baseURL: config.public.API,
      body: {
        email
      },
      onResponse({response}) {
        if(response._data.code === 200) {
          Swal.hideLoading();
          Swal.fire({
            icon: 'success',
            text: 'Hemos enviado un correo a tu cuenta',
            showConfirmButton: false,
            timer: 3000
          });
        }
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
  }

  return {
    getUser,
    pendingUserData,
    changePassword,
    sendPassWordEmail
  }
}