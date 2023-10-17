<template>
  <div class="modal-content">
    <ul>
      <li v-for="err in errors" :key="err" class="text-primary-100 mb-2">
        {{ err }}
      </li>
    </ul>
    <AtomsButtons @click="$emit('close')" class="w-full mt-4">Cerrar</AtomsButtons>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array
    }
  }
}
</script>


<style lang="postcss" scoped>
.modal-content {
  @apply fixed z-[71] w-full overflow-y-scroll h-96 sm:w-[428px] bg-neutral-white top-1/4 left-1/2 -translate-x-2/4 flex flex-col items-center p-8 shadow-md rounded-lg;
}

</style>