<template>
  <BlackMessageLayout>
    <MessageBlock>
      <WindowIcon class="w-12 h-12 mb-2" />

      <p class="max-w-max font-semibold text-primary-dark text-center">
        Welcome to my Test ToDo app!)
      </p>

      <p class="max-w-max font-semibold text-primary-dark text-center">
        Try to create your tasks right now!
      </p>

      <CircleLoader v-if="isLoading" />
      <router-link v-else class="flex items-center gap-x-2 font-semibold text-lg mt-5" to="/main">
        Start <ArrowRightIcon class="w-5 h-5" />
      </router-link>
    </MessageBlock>
  </BlackMessageLayout>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import BlackMessageLayout from '@/layouts/BlackMessageLayout.vue'
import { WindowIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import MessageBlock from '@/components/common/MessageBlock.vue'
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'
import router from '@/router'
import CircleLoader from '@/components/common/CircleLoader.vue'

export default defineComponent({
  name: 'WelcomeView',
  components: { CircleLoader, BlackMessageLayout, MessageBlock, WindowIcon, ArrowRightIcon },
  setup() {
    const tasksStore = useTasksStore()
    const { fetchTasks } = tasksStore
    const { isLoading, tasks } = storeToRefs(tasksStore)

    fetchTasks(1)

    watch(tasks, () => {
      if (tasks.value.length) {
        router.push('/main')
      }
    })

    return { isLoading }
  }
})
</script>
