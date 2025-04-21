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

<script setup lang="ts">
import { onMounted } from 'vue'
import useRefresh from '~/composables/RefreshToken';
import { useUserStore } from '~/stores/User';
import { useAuthStore  } from '~/stores/Auth';

const user_store = useUserStore();
const auth_store = useAuthStore();
const route = useRoute();
const refer = useState<string>('refer', () => '');

const miFuncionGlobal = () => {
  if(auth_store.isLoggedIn) {
    user_store.refresh_token();
  }
}

if(import.meta.client) {
  let tokenReferClient = localStorage.getItem('ref');

  if(route.query.ref) {
    localStorage.setItem('ref', route.query.ref);
    refer.value = route.query.ref;
  }

  if(tokenReferClient) {
    refer.value = tokenReferClient;
  }
}


onMounted(() => {
  useRefresh(miFuncionGlobal)

  const handleBeforeUnload = () => {
    localStorage.removeItem('ref');
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  });
})
</script>