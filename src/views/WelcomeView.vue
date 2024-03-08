<template>
  <div class="min-h-screen bg-primary-dark relative">
    <div class="w-full lg:w-1/2 pt-40 mx-auto">
      <MessageBlock>
        <WindowIcon class="w-12 h-12 mb-2" />

        <p class="max-w-max font-semibold text-primary-dark text-center">
          Welcome to my Test ToDo app!)
        </p>

        <p class="max-w-max font-semibold text-primary-dark text-center">
          Try to create your tasks right now!
        </p>

        <router-link class="flex items-center gap-x-2 font-semibold text-lg mt-5" to="/main">
          Start <ArrowRightIcon class="w-5 h-5" />
        </router-link>
      </MessageBlock>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { WindowIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import MessageBlock from '@/components/common/MessageBlock.vue'

export default defineComponent({
  name: 'WelcomeView',
  components: { MessageBlock, WindowIcon, ArrowRightIcon }
})
</script>
