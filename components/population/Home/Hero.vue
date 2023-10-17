<template>
  <section class="w-full md:h-[450px] lg:h-[780px] relative pt-6 sm:pt-16 md:pt-20 mx-auto lg:pt-60 mb-[50px] border-b border-gray-300">
    <div class="md:pl-14 relative z-10 md:text-left text-center px-4 max-w-[97rem] mx-auto">
      <h1 class="lg:whitespace-nowrap">Cada vehículo<br> tiene una historia, <br class="hidden sm:block"/><span class="text-secondary-100 font-bold">descubre la tuya<br> con nosotros</span>
      </h1>
      <p class="pt-6 md:pt-8 text-sm lg:whitespace-nowrap">Busca, encuentra y conduce el vehículo perfecto con  <strong>Hispana Auto</strong>, el buscador de vehículos<br class="md:block hidden"> que te ofrece la mejor selección de opciones.</p>
    </div>
    <img src="/img/hero.jpg" alt="Building" class="absolute z-0 top-0 w-full h-full object-cover object-top md:block hidden">
    <PopulationHomeFilterProperties class="hidden lg:block left-1/2 -translate-x-2/4"/>
    <div class="flex justify-center relative z-10 lg:hidden">
      <AtomsLink
        linkTo="/search?type=All" 
        btn-size="large" 
        class="my-5 font-semibold">
        Buscar vehículos
      </AtomsLink>
    </div>
  </section>
</template>
