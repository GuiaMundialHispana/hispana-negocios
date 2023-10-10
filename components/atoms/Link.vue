<template>
  <NuxtLink
    v-if="linkTo"
    :to="linkTo"
    :class="[ setButtonSize, setButtonStyle, setButtonType ]"
  >
    <AtomsIcon
      v-if="hasIcon"
      :name="iconName"
      :size="iconSize"
      :class="setIconPosition"
    />
    <slot />
  </NuxtLink>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: ""
    },
    iconSize: {
      type: Number,
      default: 16
    },
    iconPosition: {
      type: String,
      default: "center"
    },
    btnSize: {
      type: String,
      default: "xsmall"
    },
    btnStyle: {
      type: String,
      default: "solid-primary"
    },
    btnType: {
      type: String,
      default: "btn"
    },
    linkTo: {
      type: String || Object,
      default: ""
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    renderTag() {
      return this.linkTo ? "a" : "button";
    },
    setButtonSize() {
      const sizes = [
        "large",
        "small",
        "medium",
        "xsmall",
        "xxsmall"
      ];
      return sizes.includes(this.btnSize) ? this.btnSize : "";
    },
    setIconPosition() {
      const positions = {
        center: "",
        left: "order-0 left mr-2",
        right: "order-2 right ml-2"
      };
      return positions?.[this.iconPosition] || "";
    },
    setButtonStyle() {
      const types = [
        "solid-primary",
        "solid-secondary",
        "outline-primary",
        "outline-gray"
      ];
      return types.includes(this.btnStyle) ? this.btnStyle : "";
    },
    setButtonType() {
      const types = [
        "btn",
        "btn-icon"
      ];
      return types.includes(this.btnType) ? this.btnType : "";
    },
    hasIcon() {
      return this.iconName !== "";
    }
  }
}
</script>

<style lang="postcss" scoped>
.btn,.btn-icon {
  @apply inline-flex justify-center items-center no-underline cursor-pointer duration-300 focus:outline-none;

  /* Global status custom */
  &.active { @apply bg-secondary-100; }
  &:disabled { @apply bg-gray-10 text-secondary-100 cursor-not-allowed border-gray-10; }
}

.btn { @apply rounded-lg; }

/* Buttons sizes */
.large { @apply h-12; }
.medium { @apply h-11; }
.small { @apply h-10; }
.xsmall { @apply h-8; }
.xxsmall { @apply h-6; }

/* Button fontSize */
.large, .medium { @apply text-base px-6; }
.small { @apply text-sm px-4; }
.xsmall { @apply text-sm px-4; }

/* Button icons */
.btn-icon {
  @apply rounded-full p-0;
  &.large { @apply w-12; }
  &.small { @apply w-10; }
  &.xsmall { @apply w-8; }
  &.xxsmall { @apply w-6; }
}

/* Buttons styles */
.solid-primary {
  @apply bg-primary-100 border hover:border-secondary-100 hover:bg-secondary-100 text-neutral-white;
}

.outline-primary {
  @apply border border-solid border-primary-100 hover:bg-primary-100 text-primary-100 hover:text-neutral-white;
  &.active { @apply bg-primary-100 text-neutral-white; }
}

.outline-gray {
  @apply border border-solid border-gray-100 hover:bg-primary-100 hover:border-primary-100 text-gray-20 hover:text-neutral-white;
}
</style>