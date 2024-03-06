<template>
  <span
    :class="`text-xs rounded-md font-semibold ${textColor} uppercase text-white pt-0.5 px-1 absolute -top-2 left-2`"
    >{{ Priority[priority] }}</span
  >
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { Priority } from '@/types/task'

export default defineComponent({
  name: 'PriorityMark',
  props: {
    priority: {
      type: String as PropType<Priority>,
      required: true
    }
  },
  setup(props) {
    const textColor = computed(() => {
      switch (props.priority) {
        case Priority.high:
          return 'bg-secondary-main'
        case Priority.medium:
          return 'bg-secondary-light'
        default:
          return 'bg-secondary-dark'
      }
    })

    return { Priority, textColor }
  }
})
</script>
