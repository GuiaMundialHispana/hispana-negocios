export default defineNuxtRouteMiddleware(async (to, from) => {
  const isLogged = useState('isLogged');
  const token = useState('token');
  const {getUser} = useUser();
  if (import.meta.client) {
    let tokenClient = window.localStorage.getItem('token');
    if (tokenClient) {
      token.value = tokenClient;
      await getUser();
      isLogged.value = true;
    } else {
      isLogged.value = false;
    }
  }
});
