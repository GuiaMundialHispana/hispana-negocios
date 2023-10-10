<template>
  <article class="flex border-b-2 rounded-2xl p-6 gap-12 border-b-gray-300">
    <figure class="bg-neutral-white min-w-[170px] flex items-center justify-center">
      <img src="/img/business.png" alt="Negocio">
    </figure>
    <div class="flex flex-col gap-[18px]">
      <div class="flex justify-between">
        <h2 class="text-primary-100 font-semibold text-xl h-fit">
          Famacias Carol
        </h2>
        <div class="flex gap-3.5 text-sm">
          <p class="hour" :class="{closed: !open}">
            <AtomsIcon name="general/clock" :size=32 class="absolute left-0 "/>
            8:00 a.m. -  5:00 p.m.
          </p>
          <p class="bussines-category">
            Farmacias
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-[18px] text-sm leading-6"> 
        <p class="flex items-center gap-2 text-primary-100">
          <AtomsIcon name="general/business_location" :size=24 class="text-primary-100"/> Calle patroclo medina #47
        </p>
        <p class="text-gray-20">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto iste eum alias dolores tenetur! Mollitia dolore inventore facilis assumenda. Distinctio nemo totam, eaque quia suscipit impedit facilis velit vero non? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus minus officia nostrum expedita. A laboriosam quod illo! Reiciendis ipsa, iure rerum perspiciatis cum modi fuga laborum ipsam dolores. Molestias, natus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro odio autem assumenda, nisi iure consequuntur odit nulla, officia cum, dolorem iste accusantium cupiditate? Placeat, distinctio. Sit eligendi illo nostrum repellendus? 
        </p>
      </div>
      <MoleculesCharacteristics />
    </div>
  </article>
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
    @apply text-primary-100 bg-[#F1F1F1] flex items-center justify-center text-center px-2 rounded-lg;
  }
</style>