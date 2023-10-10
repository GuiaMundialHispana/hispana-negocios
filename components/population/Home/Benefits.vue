<template>
  <section class="flex flex-col items-center w-full px-4 md:px-4 mt-11 lg:mt-16 pb-4 md:pb-[50px]">
    <p class="leading-10 bg-secondary-100 text-primary-100 text-sm font-semibold px-2.5 w-fit rounded-lg">Beneficios</p>
    <h2 class="mt-[34px] text-[28px] font-medium leading-7 text-center">¿Conoces los beneficios de<br hidden class="md:block"> <span class="text-primary-100">utilizar Hispana Auto?</span></h2>
    <div class="flex flex-wrap pt-12 md:gap-8 lg:gap-[52px] justify-center">
      <div class="benefit-container">
        <div class="icon-container">
          <AtomsIcon class="text-primary-100" name="general/car" :size=45 />
        </div>
        <h4>Comprar un vehículo</h4>
        <p>Hispana Auto puede ayudarte a encontrarlo. Con nuestro buscador de autos en línea, podrás buscar entre una amplia selección de vehículos en todo momento. Desde coches familiares hasta deportivos, tenemos lo que necesitas.</p>
      </div>
      <div class="benefit-container">
        <div class="icon-container">
          <AtomsIcon class="text-primary-100" name="general/sell-tag" :size=45 />
        </div>
        <h4>Vender un vehículo</h4>
        <p>Hispana Auto puede ayudarte. Ofrecemos una variedad de herramientas y recursos para ayudarte a listar tu Vehículo y atraer a los compradores adecuados.</p>
      </div>
    </div> 
  </section>
</template>
<style lang="postcss" scoped>
.benefit-container{
  @apply flex flex-col items-center text-center w-[495px] pb-4 lg:pb-0 px-4;
  & h4{
    @apply text-xl font-semibold pt-3;
  } & p{
    @apply leading-[22px] pt-3 text-sm font-normal;
  }
}
.icon-container{
  @apply bg-secondary-100 rounded-full flex items-center justify-center w-[90px] h-[90px] md:w-[118px] md:h-[118px];
}
</style>