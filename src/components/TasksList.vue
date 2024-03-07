<template>
  <div class="p-3">
    <ul v-if="tasks.length > 0" class="w-12/12 max-w-[600px] flex flex-col gap-y-4 mx-auto">
      <TasksListItem v-for="task in tasks" :task="task" :key="task.id" />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'
import TasksListItem from '@/components/TasksListItem.vue'

export default defineComponent({
  name: 'TasksList',
  components: {
    TasksListItem
  },
  setup() {
    const tasksStore = useTasksStore()
    const { fetchTasks } = tasksStore
    const { isLoading, tasks } = storeToRefs(tasksStore)

    fetchTasks()

    return { isLoading, tasks }
  }
})
</script>
