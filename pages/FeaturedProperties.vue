<template>
  <section class="w-full md:h-[450px] lg:h-[500px] relative py-6 sm:py-16 md:py-20 mx-auto  border-b border-gray-300 flex items-center justify-start">
    <div class="md:pl-14 relative z-10 md:text-left text-center px-4 max-w-[97rem] w-full mx-auto text-neutral-white">
      <h1 class="lg:whitespace-nowrap text-neutral-white">Estás más cerca del <br class="hidden sm:block"/><span class="font-bold">carro de tus sueños</span>
      </h1>
      <p class="pt-6 md:pt-8 text-sm lg:whitespace-nowrap">Cada vehículo tiene una historia<strong>descubre la tuya con nosotros</strong></p>
      <AtomsLink
        linkTo="/search?condition=New&priceType=RD" 
        btn-size="large" 
        class="my-5 font-semibold">
        Buscar más propiedades
      </AtomsLink>
    </div>
    <img src="/img/hero.png" alt="Building" class="absolute z-0 top-0 w-full h-full object-cover transform -scale-x-100 ">
    <p class="hidden">
      Foto de <a href="https://unsplash.com/es/@chatelp?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Pierre Châtel-Innocenti</a> en <a href="https://unsplash.com/es/fotos/N5RN0JE5kaY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
    </p>
  </section>
  <OrganismExclusiveVehicles />
  <OrganismVipVehicles class="mb-20"  />
  <OrganismSilverVehicles class="mb-20" />
</template>