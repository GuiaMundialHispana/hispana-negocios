<template>
  <div class="flex items-center overflow-hidden rounded-lg border-2 border-gray-100 bg-neutral-white text-[#232323] shadow-sm w-fit flex-none">
    <NuxtLink @click="$emit('change', 'Used')" class="btn" :class="{active: $route.query.condition === 'Used'}" to="/search?condition=Used">Usados</NuxtLink>
    <NuxtLink @click="$emit('change', 'New')" class="btn" :class="{active: $route.query.condition === 'New'}" to="/search?condition=New">Nuevo</NuxtLink>
  </div>
</template>

<style lang="postcss" scoped>
.btn { @apply flex justify-center items-center text-neutral-black border-none bg-neutral-white relative hover:bg-secondary-100 hover:text-neutral-white hover:border-secondary-100 rounded-none;
  &.active {
    @apply bg-primary-100 text-neutral-white font-semibold !important;
  }
}
</style>