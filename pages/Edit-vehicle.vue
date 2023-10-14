<script setup>
import Swal from 'sweetalert2';
import { useUserStore } from '~/stores/User';
import { usePostsStore } from '~/stores/Post';

const use_posts = usePostsStore();
const user_store = useUserStore();
const config = useRuntimeConfig();
let step = ref(1);

//Obtener anuncio
// Swal.showLoading();
Swal.showLoading()
const { data: property, pending, error} = await useLazyFetch(`advertisements/${useRoute().query.property_id}`, {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_property) => _property.results,
  onResponse({response}){
    Swal.close()
    if(response.status === 400) {
      return navigateTo('/notFound')
    }
    if(response.status === 200 ) {
      const auto_response = response._data.results;
      
      use_posts.plan_id = auto_response.plan_id;
      use_posts.auto_category_id = auto_response.auto.auto_category_id;
      use_posts.title = auto_response.auto.title;
      use_posts.price = auto_response.auto.price;
      use_posts.price_us = auto_response.auto.price_us;
      use_posts.country_id = auto_response.auto.country_id;
      use_posts.town_id = auto_response.auto.town_id;
      use_posts.city_id = auto_response.auto.city_id;
      use_posts.condition = auto_response.auto.condition;
      use_posts.description = auto_response.auto.description;
      use_posts.saved_images = auto_response.auto.images;
      use_posts.interior_color = auto_response.auto.interior_color;
      use_posts.exterior_color = auto_response.auto.exterior_color;
      use_posts.air_conditioned = auto_response.auto.air_conditioned;
      use_posts.traction = auto_response.auto.traction;
      use_posts.transmission = auto_response.auto.transmission;
      use_posts.engine = auto_response.auto.engine;
      use_posts.mileage = auto_response.auto.mileage,
      use_posts.kilometer = auto_response.auto.kilometer,
      use_posts.condition = auto_response.auto.condition,
      use_posts.make_id = auto_response.auto.make_id,
      use_posts.model_id = auto_response.auto.model_id,
      use_posts.air_bag = auto_response.auto.air_bag,
      use_posts.fuel_type = auto_response.auto.fuel_type,
      use_posts.year = auto_response.auto.year;
    }
  }
});

async function createAdvertisement() {
  Swal.showLoading();
  const form = new FormData();
  form.append('plan_id', use_posts.plan_id);
  form.append('advertisement_id', useRoute().query.property_id);
  form.append('auto_category_id', parseInt(use_posts.auto_category_id));
  form.append('title', use_posts.title);
  form.append('price', use_posts.price);
  form.append('price_us', use_posts.price_us);
  form.append('description', use_posts.description);
  form.append('town_id', use_posts.town_id);
  form.append('city_id', use_posts.city_id);
  form.append('country_id', use_posts.country_id);
  form.append('latitude', use_posts.lat);
  form.append('longitude', use_posts.log);
  form.append('exterior_color', use_posts.exterior_color);
  form.append('interior_color', use_posts.interior_color);
  form.append('air_conditioned', use_posts.air_conditioned);
  form.append('traction', use_posts.traction);
  form.append('transmission', use_posts.transmission);
  form.append('engine', use_posts.engine);
  form.append('mileage', use_posts.mileage);
  form.append('kilometer', use_posts.kilometer);
  form.append('condition', use_posts.condition);
  form.append('make_id', use_posts.make_id);
  form.append('model_id', use_posts.model_id);
  form.append('air_bag', use_posts.air_bag);
  form.append('fuel_type', use_posts.fuel_type);
  form.append('year', use_posts.year);
  form.append('image', use_posts.saved_images[0]);
  use_posts.saved_images.forEach((element, index)=>{
    form.append('images[' + index + ']',element);
  });

  use_posts.saved_images.forEach((element, index)=>{
    form.append('images[' + index + ']',element.image);
  });

  // images = arreglode string de las imagenes que recibo
  // image = campo donde mando la imagen como portada
  // new_images = array de FILES de las nuevas imagenes
  // new_image = la imagen de portada que debe ser un FILE cuando cambian la imagen de portada

  if(use_posts.new_images.length > 0) {
    // arreglo de las nuevas imagenes
    use_posts.new_images.forEach((element, index)=>{
      form.append('new_images[' + index + ']',element);
    });
    //portada
    if(use_posts.testPortada){
      form.append('new_image', use_posts.new_images[0]);
    } else {
      form.append('image', use_posts.saved_images[0].image);
    }
  } else {
    form.append('image', use_posts.saved_images[0].image);
  }

  await useFetch('advertisements?_method=PUT',{
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
        use_posts.$reset();
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
        <div  :class="[{active: step >= 2}]">
          <span>2</span>
          <p>Paquete</p>
        </div>
        <hr class="progress-bar" :class="[{progress: step >= 3}]">
        <div :class="[{active: step >= 3}]">
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
          <img v-if="step < 5" class="hidden lg:block w-[177px]" :src="`/img/PostBussines/step-${step}.png`" alt="Vehicle">
        </div>
      </div>
    </nav>
    <!-- 1 -->
    <KeepAlive>
      <PopulationEditVehiclesStep1 v-if="step === 1" @nexts="step = 2" @back="step--" />
    </KeepAlive>
    <!-- 2 -->
    <KeepAlive>
      <PopulationEditVehiclesStep2 v-if="step === 2" @nexts="step = 3" @back="step--" />
    </KeepAlive>
    <!-- 3 -->
    <KeepAlive v-if="property">
      <PopulationEditVehiclesStep3 v-if="step === 3"
        @nexts="step = 4"
        @back="step--"
        :countryId="property.auto.country_id"
        :sectorId="property.auto.town_id"
        :cityId="property.auto.city_id"
      />
    </KeepAlive>
    <!-- 4 -->
    <KeepAlive>
      <PopulationEditVehiclesStep4 v-if="step === 4" @back="step--" />
    </KeepAlive>
    <!-- 5 -->
    <PopulationEditVehiclesStep5 v-if="step === 5" />
    <nav class="control-steps-PostBussines">
      <AtomsButtons v-if="step === 4" @click="createAdvertisement()">
        Actualizar Anuncio
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