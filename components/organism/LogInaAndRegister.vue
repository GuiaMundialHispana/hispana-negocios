<template>
  <div class="modal-content">
    <AtomsButtons @click="closeModalOnHeader()" btn-type="btn-icon" icon-name="general/close" class="absolute right-4 top-4" />
    <figure class="mb-8">
      <img src="/img/logo.svg" alt="Logo Hispana Home" class=" w-60">
    </figure>
    <nav class="border-b border-b-gray-100 flex gap-8 w-full justify-center py-2 mb-6">
      <button
        class="tab-btn"
        @click="tab = true"
        :class="[{active: tab === true}]"
      >
        Inicia sesión
      </button>
      <button
        class="tab-btn" 
        @click="tab = false"
        :class="[{active: tab === !true}]"
      >
        Registro
      </button>
    </nav>
    <OrganismLogin v-if="tab" @close="closeModalOnHeader()" />
    <OrganismRegister v-if="!tab" @close="closeModalOnHeader()"/>
  </div>
</template>

<script>
export default{
  data() {
    return {
      tab: true
    }
  },
  methods: {
    closeModalOnHeader() {
      this.$emit('closeModal');
    }
  }
}
</script>

<style lang="postcss" scoped>
.modal-content {
  @apply fixed z-[71] w-full sm:w-[428px] h-fit bg-neutral-white top-12 left-1/2 -translate-x-2/4 flex flex-col items-center
  justify-center p-8 shadow-md rounded-lg;
}

.tab-btn {
  @apply text-sm leading-[22px] py-[5px];
  &.active {
    @apply text-primary-100 border-b-2 border-b-primary-100;
  }
}
</style>