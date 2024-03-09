<template>
  <BlackMessageLayout>
    <template #content>
      <MessageBlock>
        <DocumentMagnifyingGlassIcon class="w-10 h-10 mb-2" />

        <p class="max-w-max font-bold text-primary-dark text-center text-lg">404. Page not found</p>

        <router-link class="flex items-center gap-x-2 font-semibold text-lg mt-5" to="/">
          <ArrowLeftIcon class="w-5 h-5" /> Go back
        </router-link>
      </MessageBlock>
    </template>
  </BlackMessageLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BlackMessageLayout from '@/layouts/BlackMessageLayout.vue'
import MessageBlock from '@/components/common/MessageBlock.vue'
import { DocumentMagnifyingGlassIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'

export default defineComponent({
  components: { MessageBlock, BlackMessageLayout, DocumentMagnifyingGlassIcon, ArrowLeftIcon }
})
</script>
