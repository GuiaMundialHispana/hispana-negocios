export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/search/null' || to.path === '/search/undefined') {
    return navigateTo('/notFound')
  }
})