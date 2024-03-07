<template>
  <div class="absolute -top-2 left-2 flex gap-x-2">
    <template v-for="(mark, markIndex) in marksData" :key="markIndex">
      <span v-if="mark.isVisible" :class="mark.class">{{ mark.text }}</span>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { Priority } from '@/types/task'

export default defineComponent({
  name: 'TaskInfoMarks',
  props: {
    priority: {
      type: String as PropType<Priority>,
      required: true
    },
    isDone: {
      type: Boolean,
      required: true
    },
    subtasksAmount: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const priorityColor = computed(() => {
      let color = 'bg-secondary-dark' // default color
      if (props.priority === Priority.high) color = 'bg-secondary-main'
      if (props.priority === Priority.medium) color = 'bg-secondary-light'

      return color
    })

    const marksData = computed(() => [
      {
        text: `Priority: ${Priority[props.priority]}`,
        isVisible: true,
        class: `text-xs font-semibold uppercase text-white rounded-md pt-0.5 px-1 ${priorityColor.value}`
      },
      {
        text: `Subtasks: ${props.subtasksAmount}`,
        isVisible: props.subtasksAmount > 0,
        class: 'bg-primary-dark text-xs rounded-md font-semibold uppercase text-white pt-0.5 px-1'
      },
      {
        text: 'Completed',
        isVisible: props.isDone,
        class:
          'bg-primary-success text-xs rounded-md font-semibold uppercase text-white pt-0.5 px-1'
      }
    ])

    return { marksData }
  }
})
</script>
