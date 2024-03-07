<template>
  <button :class="`w-10 h-10 rounded-md leading-5 active:opacity-40`">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ListButton'
})
</script>
