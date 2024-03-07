<template>
  <div class="p-3">
    <ul v-if="sortedTasks.length > 0" class="w-12/12 max-w-[600px] flex flex-col gap-y-4 mx-auto">
      <TasksListItem
        v-for="task in sortedTasks"
        :task="task"
        :key="`${task.subtasks?.length > 0 ? 'subtask-' : ''}${task.id}`"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import TasksListItem from '@/components/TasksListItem.vue'
import { Task, Subtask } from '@/types'
import { sortTasks } from '@/helpers'

export default defineComponent({
  name: 'TasksList',
  components: {
    TasksListItem
  },
  props: {
    isSubTasks: Boolean,
    tasks: {
      type: Array as PropType<Task[] | Subtask[]>
    }
  },
  setup(props) {
    const sortedTasks = computed<Task[] | Subtask[]>(() => sortTasks(props.tasks || []))

    return { sortedTasks }
  }
})
</script>
