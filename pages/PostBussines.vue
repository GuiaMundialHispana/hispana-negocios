<script setup>
import Swal from 'sweetalert2';
import { useUserStore } from '~/stores/User';
import { usePostsStore } from '~/stores/Post';

const use_posts = usePostsStore();
const user_store = useUserStore();
const config = useRuntimeConfig();
let step = ref(3);

async function createAdvertisement() {
  Swal.showLoading();
  const form = new FormData();
  form.append('plan_id', use_posts.plan_id);
  form.append('title', use_posts.title);
  form.append('address', use_posts.address);
  form.append('description', use_posts.description);
  form.append('town_id', use_posts.town_id);
  form.append('city_id', use_posts.city_id);
  form.append('country_id', use_posts.country_id);
  form.append('latitude', use_posts.lat);
  form.append('longitude', use_posts.log);
  form.append('image', use_posts.saved_images[0]);
  use_posts.saved_images.forEach((element, index)=>{
    form.append('images[' + index + ']',element);
  });

  await useFetch('advertisements',{
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user_store.token}`,
      'Accept': 'application/json'
    },
    body: form,
    baseURL: config.public.API,
    onResponse({ response }) {
      Swal.hideLoading();
      const res = response._data;
      console.log(res)
      if(res.code === 200 ) {
        Swal.fire({
          icon: 'success',
          text:  `${res.message}`,
          showConfirmButton: false,
          timer: 4000
        });
        step.value = 5;
        setTimeout(() => {
          useRouter().push("/profile?tab=anuncio");
        }, 3000);
      }

      if(res.code === 400) {
        let errors = response._data.message;
        if(typeof errors === 'string') {
          Swal.fire({
            icon: 'error',
            text:  `${errors}`,
            timer: 4000
          });
        } else {
          Swal.fire({
            icon: 'error',
            html: '<ul></ul>',
            didOpen: () => {
              const b = Swal.getHtmlContainer().querySelector('ul');
              Object.keys(errors).forEach(clave => {
                const li = document.createElement('li');
                li.classList.add('text-primary-100', 'text-left', 'text-sm', 'mb-2')
                li.textContent = errors[clave];
                b.appendChild(li);
              });
            },
          });
        }
      }
    }    
  });
};

</script>

<template>
  <section>
    <nav class="bg-[#F0F0F073] shadow-inner">
      <div class="steps-wrapper">
        <div class="active">
          <span>1</span>
          <p>Categoría</p>
        </div>
        <hr class="progress-bar" :class="[{progress: step >= 2}]">
        <div :class="[{active: step >= 3}]">
          <span>2</span>
          <p>Paquete</p>
        </div>
        <hr class="progress-bar" :class="[{progress: step >= 3}]">
        <div :class="[{active: step >= 4}]">
          <span>3</span>
          <p>Detalles</p>
        </div>
        <hr class="progress-bar" :class="[{progress: step >= 4}]">
        <div :class="[{active: step >= 4}]">
          <span>4</span>
          <p>Fotos</p>
        </div>
        <hr class="progress-bar" :class="[{progress: step === 5}]">
        <div class="last-step">
          <AtomsIcon name="general/slim-check" />
          <p>Finalizado</p>
          <hr class="hidden lg:block border-secondary-100 border w-12 ml-2" :class="[{'w-20': step === 5}]">
          <img v-if="step < 5" class="hidden lg:block w-[177px]" :src="`/img/PostBussines/step-${step}.png`" alt="Property">
        </div>
      </div>
    </nav>
    <!-- 1 -->
    <KeepAlive>
      <PopulationPostBussinesStep1 v-if="step === 1" @nexts="step = 2" />
    </KeepAlive>
    <!-- 2 -->
    <KeepAlive>
      <PopulationPostBussinesStep2 v-if="step === 2" @nexts="step = 3" @back="step--" />
    </KeepAlive>
    <!-- 3 -->
    <KeepAlive>
      <PopulationPostBussinesStep3 v-if="step === 3" @nexts="step = 4" @back="step--" />
    </KeepAlive>
    <!-- 4 -->
    <KeepAlive>
      <PopulationPostBussinesStep4 v-if="step === 4" @back="step--" />
    </KeepAlive>
    <!-- 5 -->
    <PopulationPostBussinesStep5 v-if="step === 5" />
    <nav class="control-steps-PostBussines">
      <AtomsButtons v-if="step === 4" @click="createAdvertisement()">
        Crear Anuncio
      </AtomsButtons>
    </nav>
  </section>
</template>

<style lang="postcss" scoped>
.steps-wrapper {
  @apply flex justify-center items-center lg:h-48 h-20 w-full max-w-[1440px] mx-auto md:px-8;
  & div{
    @apply flex items-center flex-none whitespace-nowrap gap-2 lg:pl-5 md:pl-3 first:pl-0;
    & p {
      @apply hidden md:block text-[#888888];
    }
    & span {
      @apply border border-[#bababa] text-[#bababa] rounded-full w-8 h-8 flex flex-none justify-center items-center; 
    }
  }
}
.progress-bar{
  @apply border-[#bababa] border w-3 md:w-full md:ml-5
}
.progress{
  @apply border-secondary-100
}

.active {
  & p{ @apply text-neutral-black !important; }
  & span{ @apply text-neutral-white bg-secondary-100 border-none !important; }
}

.last-step {
  & p{ @apply hidden lg:block text-neutral-black !important; }
  & span{ @apply text-primary-100 border-primary-100 !important; }
}
</style>