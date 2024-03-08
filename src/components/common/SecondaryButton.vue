<template>
  <button
    type="button"
    :disabled="isDisabled"
    class="font-semibold disabled:opacity-40 hover:opacity-90 active:opacity-40"
    @click="$emit('on-click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SecondaryButton',
  props: {
    isDisabled: Boolean
  }
})
</script>
