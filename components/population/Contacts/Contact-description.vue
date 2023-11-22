<template>
  <div class="w-full my-11 sm:px-16 px-4">
    <h2 class="text-[28px] mb-2 sm:mb-9">Información de contacto</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div class="flex items-center lg:justify-start mt-4 md:mt-0">
        <div class="flex items-center justify-center flex-none rounded-full bg-[#D9D9D9] w-12 h-12 mr-6">
          <AtomsIcon class="text-primary-100" name="general/location-solid" :size=15 />
        </div>
        <p class="text-sm mr-4"><b>Dirección:</b> Ave. Rómulo Betancourt #311, Edificio<br class="hidden 2xl:block"> Corporativo Vista 311, Santo Domingo, Rep. Dom.</p>
      </div>
      <div class="flex items-center lg:justify-center mt-4 md:mt-0">
        <div class="flex items-center justify-center flex-none rounded-full bg-[#D9D9D9] w-12 h-12 mr-6">
          <AtomsIcon class="text-primary-100" name="general/phone-solid" :size=15 />
        </div>
        <p class="text-sm"><b>Teléfono:</b> (809) 286-1009 exts 2296/ 4447.</p>
      </div>
      <div class="flex items-center lg:justify-end lg:mr-2 mt-4 lg:mt-0">
        <div class="flex items-center justify-center flex-none rounded-full bg-[#D9D9D9] w-12 h-12 mr-6">
          <AtomsIcon class="text-primary-100" name="general/mail-solid" :size=15 />
        </div>
        <p class="text-sm"><b>Email: </b><a href="mailto:correo@hispana.com">correo@hispana.com</a></p>
      </div>
    </div>
  </div>
</template>