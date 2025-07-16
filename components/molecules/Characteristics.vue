<template>
  <div class="flex items-center flex-wrap gap-6">
    <div class="items" v-if="phone">
      <AtomsIcon name="general/phone" :size=20 />
      <a :href="`tel:${phone}`"  target="_blank" @click="addViewSocialMedia('phone')">{{ phone }}</a>
    </div>
    <div class="items" v-if="whatsapp && whatsapp !== 'undefined'" @click="addViewSocialMedia('whatsapp')">
      <AtomsIcon name="general/whatsapp" :size=20 />
      <a :href="`https://wa.me/${whatsapp}`" target="_blank">{{ whatsapp }}</a>
    </div>
    <div class="items" v-if="facebook && facebook !== 'undefined'" @click="addViewSocialMedia('facebook')">
      <AtomsIcon name="general/facebook" :size=20 />
      <a :href="facebook" target="_blank">{{facebook}}</a>
    </div>
    <div class="items" v-if="instagram && instagram !== 'undefined'" @click="addViewSocialMedia('instagram')">
      <AtomsIcon name="general/instagram" :size=20 />
      <a :href="instagram" target="_blank">{{ instagram }}</a>
    </div>
    <div class="items" v-if="website && website !== 'undefined'" @click="addViewSocialMedia('web')">
      <AtomsIcon name="general/web" :size=20 />
      <a :href="website" target="_blank">{{website}}</a>
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
    id: {
      type: String || Number,
    }
  },
  methods: {
    showParsedMlieage(mileage) {
      return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    addViewSocialMedia(media) {
      useFetch(`statistics/lead/${this.id}/${media}`, {
        method: 'POST',
        baseURL: useRuntimeConfig().public.API,
      });
    }
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