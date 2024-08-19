import { useUserStore } from '~/stores/User';
import { useAuthStore } from '~/stores/Auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const user_store = useUserStore();
  const use_auth = useAuthStore();
  if(process.client) {
    let get_token = window.localStorage.getItem('token');
    if(get_token !== null) {
      user_store.token = get_token;
      use_auth.isLoggedIn = true;
      user_store.get_user().catch(() => {
        use_auth.isLoggedIn = false;
      });
    } else {
      use_auth.isLoggedIn = false;
    }
  }
});
