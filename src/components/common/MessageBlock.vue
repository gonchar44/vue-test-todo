<template>
  <section
    class="w-full h-56 leading-8 bg-primary-main rounded-md flex flex-col justify-center items-center"
  >
    <slot />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MessageBlock'
})
</script>
