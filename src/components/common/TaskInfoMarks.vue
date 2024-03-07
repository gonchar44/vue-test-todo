<template>
  <div class="absolute -top-2 left-2 flex gap-x-2">
    <span
      :class="`text-xs font-semibold uppercase text-white rounded-md pt-0.5 px-1 ${priorityColor}`"
      >{{ Priority[priority] }}</span
    >

    <span
      v-if="isDone"
      class="bg-primary-success text-xs rounded-md font-semibold uppercase text-white pt-0.5 px-1"
      >Done</span
    >
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
    }
  },
  setup(props) {
    const priorityColor = computed(() => {
      let color = 'bg-secondary-dark' // default color
      if (props.priority === Priority.high) color = 'bg-secondary-main'
      if (props.priority === Priority.medium) color = 'bg-secondary-light'

      return color
    })

    return { Priority, priorityColor }
  }
})
</script>
