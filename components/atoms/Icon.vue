<template>
  <nuxt-icon
    :name="name"
    :style="{ 'font-size': size + 'px' }"
    class="fill-current leading-none" 
  />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "general/area"
    },
    size: {
      type: Number,
      default: 16
    }
  }
}
</script>