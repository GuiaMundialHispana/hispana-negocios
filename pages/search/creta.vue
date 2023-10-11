<template>
  <main class=" lg:px-20 md:px-8 px-5">
    <div class="flex w-full items-center justify-center">
      <!-- Fotos/ carrusel -->
      <figure>
        <img src="/img/carol1.png" alt="">
      </figure>
      <figure>
        <img src="/img/carol2.png" alt="">
      </figure>
      <figure>
        <img src="/img/carol3.png" alt="">
      </figure>

    </div>
    <section class="max-w-[1250px] mx-auto flex flex-col lg:px-5">
      <div class="relative flex lg:mb-[60px] mb-8 lg:flex-row flex-col pt-10 justify-between items-center">
        <figure class="bg-neutral-white p-6 w-[170px] h-[170px] border-2 rounded-lg flex items-center justify-center border-[#F5F5F5] absolute lg:-top-2/3 -top-1/4 ">
          <img src="/img/business.png" alt="">
        </figure>
        <h2 class="lg:ml-[200px] mt-[90px] lg:mt-0 xl:text-5xl text-4xl font-semibold text-primary-100 mr-4 whitespace-nowrap">Farmacia Carol</h2>
        <div class="flex gap-3.5 text-sm mt-4 lg:mt-0 flex-wrap md:justify-end justify-center">
            <p class="hour" :class="{closed: !open}">
              <AtomsIcon name="general/clock" :size=32 class="absolute left-0 "/>
              8:00 a.m. -  5:00 p.m.
            </p>
            <p class="bussines-category">
              Farmacias
            </p>
          </div>
      </div>
      <div class="flex flex-col gap-[18px] text-sm leading-6 text-justify"> 
        <p class="text-gray-20">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto iste eum alias dolores tenetur! Mollitia dolore inventore facilis assumenda. Distinctio nemo totam, eaque quia suscipit impedit facilis velit vero non? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus minus officia nostrum expedita. A laboriosam quod illo! Reiciendis ipsa, iure rerum perspiciatis cum modi fuga laborum ipsam dolores. Molestias, natus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro odio autem assumenda, nisi iure consequuntur odit nulla, officia cum, dolorem iste accusantium cupiditate? Placeat, distinctio. Sit eligendi illo nostrum repellendus? 
        </p>
      </div>
      <MoleculesCharacteristics class="contact-info" />
    </section>
    <section class="max-w-[1250px] mx-auto lg:px-5">
      <h3 class="w-full border-b border-b-[#F5F5F5] text-[28px] font-medium py-2.5 mb-5">
        Ubicación
      </h3>
      <div class=" w-full pb-20">
        <iframe class="rounded-2xl w-full h-[240px]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.565950258251!2d-69.94201623463833!3d18.45800652590105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea56202c17cd707%3A0x9abe65a34f683f5c!2sOficina%20Gubernamental%20de%20Tecnolog%C3%ADas%20de%20la%20Informaci%C3%B3n%20y%20Comunicaci%C3%B3n%20(OGTIC)!5e0!3m2!1ses-419!2sdo!4v1676248377093!5m2!1ses-419!2sdo"></iframe>
      </div>
    </section>
  </main>
</template>
<script setup>
const open = ref(true);
</script>
<style lang="postcss" scoped>
  .hour{
    @apply flex bg-[#D3FFD5] text-[#4CAF50] relative items-center justify-center rounded-lg h-8 pl-8 pr-2 before:content-['Abierto:'] before:mr-1 whitespace-nowrap;
    &.closed {
      @apply bg-[#FFE4E3] text-[#FF2625] before:content-['Cerrado:'];
    }
  }
  .bussines-category{
    @apply text-primary-100 bg-[#F1F1F1] flex items-center justify-center text-center px-2 rounded-lg h-8;
  }
  .contact-info{
    @apply lg:gap-x-16 gap-x-8 bg-[#FCFCFC] py-6 px-10 rounded-2xl w-full items-center justify-center my-16 !important
  }
</style>
