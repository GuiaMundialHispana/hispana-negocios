import { useAuthStore } from '~/stores/Auth';

export default defineNuxtRouteMiddleware(()=> {
  const auth_store = useAuthStore();
 
  setTimeout(() => {
    if(!auth_store.isLoggedIn) {
      return navigateTo('/');
    }    
  },100);
})