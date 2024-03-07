<template>
  <button
    class="h-6 mt-2 active:opacity-40"
    :title="isDone ? 'Uncheck' : 'Check'"
    @click="toggleIsDone"
  >
    <CheckCircleIcon v-if="!isDone" class="w-6 h-full text-primary-dark" />
    <MinusCircleIcon v-else class="w-6 h-full text-primary-dark" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CheckCircleIcon, MinusCircleIcon } from '@heroicons/vue/24/outline'
import { useTasksStore } from '@/stores/tasks'

export default defineComponent({
  name: 'DoneToggle',
  components: { CheckCircleIcon, MinusCircleIcon },
  props: {
    id: {
      type: Number,
      required: true
    },
    isDone: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const tasksStore = useTasksStore()
    const { updateIsDone } = tasksStore

    const toggleIsDone = () => {
      updateIsDone(props.id, !props.isDone)
    }

    return { toggleIsDone }
  }
})
</script>
