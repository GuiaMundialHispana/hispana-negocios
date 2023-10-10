<template>
  <div class="flex items-center flex-wrap gap-6">
    <div class="items">
      <AtomsIcon name="general/phone" :size=20 />
      <p>(829) 280-2643</p>
    </div>
    <div class="items">
      <AtomsIcon name="general/whatsapp" :size=20 />
      <p>(829) 280-2643</p>
    </div>
    <div class="items">
      <AtomsIcon name="general/facebook" :size=20 />
      <p>Farmacias Carol</p>
    </div>
    <div class="items">
      <AtomsIcon name="general/instagram" :size=20 />
      <p>@farmaciascarol</p>
    </div>
    <div class="items">
      <AtomsIcon name="general/web" :size=20 />
      <p>farmaciascarol.com</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'characteristics',
  props: {
    year: {
      type: String,
      default: 2023
    },
    mileage: {
      type: String,
      default: 5248
    },
    location: {
      type: String,
      default: 'Santo Domingo'
    },
  },
  methods: {
    showParsedMlieage(mileage) {
      return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  }
}
</script>
<style lang="postcss" scoped>
.items{
  @apply flex items-center text-secondary-100 gap-2;
  & p{
    @apply text-sm leading-[22px] whitespace-nowrap
  }
}
</style>