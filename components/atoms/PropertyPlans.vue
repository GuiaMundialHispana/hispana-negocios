<template>
  <span :class="[planType, planPosition]">{{renderPlanText}}</span>
</template>

<script>
export default {
  props: {
    planType: {
      type: String,
      default: ''
    },
    planPosition: {
      type: String,
      default: 'bottom'
    }
  },
  computed: {
    renderPlanText() {
      if(this.planType === 'vip') {
        return this.planText = 'vip';
      } else if (this.planType === 'silver') {
        return this.planText = 'Silver';
      } else if ( this.planType === 'exclusive') {
        return this.planText = 'exclusive';
      } else if(this.planType === 'featured') {
        return this.planText = 'destacado';
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
span {
  @apply min-w-[117px] text-neutral-white font-semibold text-base px-5 py-1 h-10 flex items-center justify-center uppercase;
  /* Positions */
  &.top { @apply rounded-br-2xl top-0; }
  &.bottom { @apply rounded-tr-2xl bottom-0; }

  /* Status */
  &.silver { background: linear-gradient(104.59deg, #D9D9D9 8.17%, #ADADAD 51.17%, #FFFFFF 120.16%); }
  &.exclusive { background: linear-gradient(100.63deg, #000000 -6.24%, #2F1C1B 45.46%, #A89494 95.05%); }
  &.vip { background: linear-gradient(99.8deg, #FFAE10 -9.48%, #FFB800 45.36%, #FFD058 96.88%); }
  &.featured { @apply bg-primary-100; }
}
</style>