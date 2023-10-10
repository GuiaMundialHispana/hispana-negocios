<template>
  <div>
    <NuxtLoadingIndicator />
    <OrganismHeader />
    <main class="lg:pt-[102px] pt-16">
      <slot />
    </main>
    <OrganismFooter />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import useRefresh from '~/composables/RefreshToken';
import { useUserStore } from '~/stores/User';
import { useAuthStore  } from '~/stores/Auth';

export default {
  setup() {
    const user_store = useUserStore();
    const auth_store = useAuthStore();
    const miFuncionGlobal = () => {
      // Tu lógica aquí
      if(auth_store.isLoggedIn) {
        user_store.refresh_token();
      }
    }
    onMounted(() => {
      useRefresh(miFuncionGlobal)
    })
  },
}
</script>