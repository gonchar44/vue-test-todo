<template>
  <div class="absolute -top-2 left-9 flex gap-x-2">
    <template v-for="(label, labelIndex) in labelsData" :key="labelIndex">
      <span v-if="label.isVisible" :class="label.class">{{ label.text }}</span>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { Priority, Subtask, Task } from '@/types'
import { checkIsSubtask } from '@/helpers'

export default defineComponent({
  name: 'TaskInfoLabels',
  props: {
    task: {
      type: Object as PropType<Task | Subtask>,
      required: true
    }
  },
  setup(props) {
    // Local values
    const priorityColor = computed(() => {
      let color = 'bg-secondary-dark' // default color
      if (props.task.priority === Priority.high) color = 'bg-secondary-main'
      if (props.task.priority === Priority.medium) color = 'bg-secondary-light'

      return color
    })
    const subtasksAmount = computed(
      () => !checkIsSubtask(props.task) && (props.task as Task).subtasks?.length
    )
    const labelsData = computed(() => [
      {
        text: `${Priority[props.task.priority]}`,
        isVisible: true,
        class: `text-xs font-semibold uppercase text-white rounded-md pt-0.5 px-1 ${priorityColor.value}`
      },
      {
        text: `Subtasks: ${subtasksAmount.value}`,
        isVisible: subtasksAmount.value && subtasksAmount.value > 0,
        class: 'bg-primary-dark text-xs rounded-md font-semibold uppercase text-white pt-0.5 px-1'
      },
      {
        text: 'Done',
        isVisible: props.task.is_done,
        class:
          'bg-primary-success text-xs rounded-md font-semibold uppercase text-white pt-0.5 px-1'
      }
    ])

    return { labelsData }
  }
})
</script>
