<script setup>
import { usePostsStore } from '~/stores/Post';
const emit = defineEmits(['back', 'nexts'])
const use_posts = usePostsStore();
const allowedFileTypes = ref(['image/jpeg', 'image/png', 'image/gif', 'image/svg', 'image/svg+xml']);
let totalImgs = ref(0);
let savedImages= ref([]);
let previewImages = use_posts.saved_images;
let newPreview = ref([]);
let fileFormat = ref(true);
let testPortada = use_posts.testPortada;
let planSelected = {
  id: use_posts.plan_id,
  quantity: use_posts.plan_pictures
};

// previewImages.forEach((element, index)=>{
//   newPreview.value.push(element.image);
// });
function previewFiles(event) {
  let images = null;
  images = event.target.files;
  totalImgs.value = newPreview.value.length + images.length;
  if (totalImgs.value <= planSelected.quantity) {
    for (let i = 0; i < images.length; i++) {
      if (allowedFileTypes.value.indexOf(images[i].type) !== -1) {
        let file = images[i];
        savedImages.value.push(images[i]);
        newPreview.value.push(URL.createObjectURL(file));
        fileFormat.value = true;
        // use_posts.new_images.push(savedImages.value);

        use_posts.new_images = savedImages.value;
        //
        // const unifiedArray = newPreview.value.concat(previewImages);
        // previewImages.forEach((element, index)=>{
        //   newPreview.value.push(element.image);
        // });
        // console.log(unifiedArray);
      } else { fileFormat.value = false; }
    }
  } else {
    console.log('error');
  };
};

function setFirtsImg(array, index) {
  if (index > 0 && index < array.length) {
    const imgToMove = array[index];
    array.splice(index, 1);
    array.unshift(imgToMove);
  }
};

let previewPortada = ref(false);
let newPortada = ref(false);
watch(newPreview.value, (newx) => {
  if(newPreview.value.length > 0 ) {
    newPortada.value = true;
  }
});
</script>

<template>
  <div class="w-fit mx-auto lg:px-8 px-4">
    <h4 class="mt-11 mb-7 text-center">
      Sube buenas fotos de tu 
      <span class="text-secondary-100">negocio</span>
    </h4>
    <div class="flex mx-auto w-fit gap-4 mb-5">
      <p v-if="totalImgs > planSelected.quantity" class="warning-message">
        <AtomsIcon name="general/warning" :size=24 /> Solo puede cargar {{ planSelected.quantity }} fotos 
      </p>
      <p v-if="!fileFormat" class="warning-message">
        <AtomsIcon name="general/warning" :size=24 /> Formato incorrecto
      </p>
    </div>
    <div class="upload-photos-container">
      <div class="upload-button" v-if="previewImages.length <= planSelected.quantity">
        <div>
          <AtomsIcon name="general/upload" :size=28 class="text-primary-100" />
        </div>
        <p class="text-[#707070]"><span class="text-primary-100">Click para subir</span> o arrastra y suelta SVG, PNG, <br> JPG (max. 800px400px)</p>
        <input type="file" @change="previewFiles" ref="file" multiple="multiple" class="absolute left-0 top-0 scale-[9] cursor-pointer opacity-0">
      </div>
      <!-- Estas son las que subo -->
      <figure v-for="(img, index) in newPreview" :key="index">
        <img :src="img" class="w-full h-full object-cover">
        <AtomsButtons
          class="absolute top-2 right-2"
          icon-name="general/trash-can"
          btn-type="btn-icon"
          @click="newPreview.splice(index, 1), savedImages.splice(index, 1)"
        />
        <AtomsButtons
          :class="[{newPortada: index === 0 && use_posts.testPortada}]"
          class="top-2 left-2 absolute bg-neutral-white"
          btn-style="outline-primary"
          icon-name="general/star"
          btn-type="btn-icon"
          :iconSize=20
          @click="setFirtsImg(newPreview, index), setFirtsImg(savedImages, index), use_posts.testPortada = true" 
        />
        <p :class="[{cover: index === 0 && use_posts.testPortada}]">Portada</p>
      </figure>
      <!-- estas son las que traigo del api -->
      <figure v-for="(img, index) in previewImages" :key="index">
        <img :src="img.image" class="w-full h-full object-cover">
        <AtomsButtons
          class="absolute top-2 right-2"
          icon-name="general/trash-can"
          btn-type="btn-icon"
          @click="previewImages.splice(index, 1), savedImages.splice(index, 1)"
        />
        <AtomsButtons
          :class="[{previewPortada: index === 0 && !use_posts.testPortada}]"
          class="top-2 left-2 absolute bg-neutral-white"
          btn-style="outline-primary"
          icon-name="general/star"
          btn-type="btn-icon"
          :iconSize=20
          @click="setFirtsImg(previewImages, index), setFirtsImg(savedImages, index), use_posts.testPortada = false" 
        />
        <p :class="[{cover: index === 0 && !use_posts.testPortada}]">Portada</p>
      </figure>
    </div>
    <p class="text-center mt-16 mb-8">{{ newPreview.length + previewImages.length }}/{{planSelected.quantity}} Fotos</p>
  </div>
  <nav class="control-steps-PostBussines">
    <AtomsButtons @click="emit('back')" btn-style="outline-primary">
      Atras
    </AtomsButtons>
  </nav>
</template>

<style lang="postcss" scoped>
h4 { @apply font-semibold text-[28px] leading-[42px]; }
.upload-button {
  @apply sm:col-span-2 flex flex-col relative items-center justify-center border border-gray-300 rounded-md w-full h-[165px] overflow-hidden text-center px-2;
  & > div { @apply flex items-center justify-center rounded-full bg-secondary-100 w-14 h-14;}
}

figure {
  @apply relative rounded-md bg-secondary-100 sm:w-[230px] h-40 overflow-hidden;
}
.cover{
  @apply absolute bottom-0 bg-primary-100 w-full h-[35px] z-20 flex items-center justify-center text-neutral-white text-base
}

.upload-photos-container { @apply grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3; }

.warning-message { @apply flex gap-2 items-center justify-center w-fit py-1 px-2 bg-primary-100 text-neutral-white font-semibold rounded-lg; }
</style>