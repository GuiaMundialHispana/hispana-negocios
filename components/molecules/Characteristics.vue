<template>
  <div class="flex items-center flex-wrap gap-6">
    <div class="items" v-if="phone">
      <AtomsIcon name="general/phone" :size=20 />
      <a :href="`tel:${phone}`">{{ phone }}</a>
    </div>
    <div class="items" v-if="whatsapp">
      <AtomsIcon name="general/whatsapp" :size=20 />
      <a :href="`https://wa.me/${whatsapp}`">{{ whatsapp }}</a>
    </div>
    <div class="items" v-if="facebook">
      <AtomsIcon name="general/facebook" :size=20 />
      <a :href="facebook" target="blank">{{facebook}}</a>
    </div>
    <div class="items" v-if="instagram">
      <AtomsIcon name="general/instagram" :size=20 />
      <a :href="instagram" target="blank">{{ instagram }}</a>
    </div>
    <div class="items" v-if="website">
      <AtomsIcon name="general/web" :size=20 />
      <a :href="website" target="blank">{{website}}</a>
    </div>
    <div class="items" v-if="email">
      <AtomsIcon name="general/mail" :size=20 />
      <a :href="`mailto:${email}`">{{ email }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'characteristics',
  props: {
    phone: {
      type: String,
      default: 2023
    },
    whatsapp: {
      type: String,
      default: 5248
    },
    facebook: {
      type: String,
      default: 'Santo Domingo'
    },
    instagram: {
      type: String,
      default: 'Santo Domingo'
    },
    website: {
      type: String,
      default: 'Santo Domingo'
    },
    email: {
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