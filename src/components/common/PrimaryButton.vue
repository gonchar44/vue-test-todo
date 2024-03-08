<template>
  <button
    class="w-max bg-primary-main flex items-center font-semibold gap-x-2 px-4 py-2.5 rounded-md active:opacity-40 disabled:opacity-40"
    :type="type || 'button'"
    :disabled="isDisabled"
    @click="$emit('on-click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PrimaryButton',
  props: {
    isDisabled: Boolean,
    type: String
  }
})
</script>
