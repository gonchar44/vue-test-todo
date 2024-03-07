<template>
  <button
    class="h-6 mt-2 active:opacity-40"
    :title="task.is_done ? 'Uncheck' : 'Check'"
    @click="toggleIsDone"
  >
    <CheckCircleIcon v-if="!task.is_done" class="w-6 h-full text-primary-dark" />
    <MinusCircleIcon v-else class="w-6 h-full text-primary-dark" />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CheckCircleIcon, MinusCircleIcon } from '@heroicons/vue/24/outline'
import { useTasksStore } from '@/stores/tasks'
import { Subtask, Task } from '@/types'
import { checkIsSubtask } from '@/helpers'

export default defineComponent({
  name: 'DoneToggle',
  components: { CheckCircleIcon, MinusCircleIcon },
  props: {
    task: {
      type: Object as PropType<Task | Subtask>,
      required: true
    }
  },
  setup(props) {
    const tasksStore = useTasksStore()
    const { updateSubtaskIsDone, updateTaskIsDone } = tasksStore

    const toggleIsDone = async () => {
      if (checkIsSubtask(props.task)) {
        return updateSubtaskIsDone({
          parentId: (props.task as Subtask).parent_id,
          subtaskId: props.task.id,
          newValue: !props.task.is_done
        })
      }

      await updateTaskIsDone(props.task.id, !props.task.is_done)
    }

    return { toggleIsDone }
  }
})
</script>
