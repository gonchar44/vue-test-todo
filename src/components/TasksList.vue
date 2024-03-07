<template>
  <div class="p-3">
    <ul v-if="sortedTasks.length > 0" class="w-12/12 max-w-[600px] flex flex-col gap-y-4 mx-auto">
      <TasksListItem v-for="task in sortedTasks" :task="task" :key="task.id" />
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'
import TasksListItem from '@/components/TasksListItem.vue'
import { Task } from '@/types/task'
import { sortTasks } from '@/helpers'

export default defineComponent({
  name: 'TasksList',
  components: {
    TasksListItem
  },
  setup() {
    const tasksStore = useTasksStore()
    const { fetchTasks } = tasksStore
    const { isLoading, tasks } = storeToRefs(tasksStore)

    const sortedTasks = computed<Task[]>(() => sortTasks(tasks.value))

    fetchTasks()

    return { isLoading, sortedTasks }
  }
})
</script>
