<template>
  <TasksList :tasks="tasks" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TasksList from '@/components/TasksList.vue'
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'HomeView',
  components: {
    TasksList
  },
  setup() {
    const tasksStore = useTasksStore()
    const { fetchTasks } = tasksStore
    const { tasks } = storeToRefs(tasksStore)

    fetchTasks()

    return { tasks }
  }
})
</script>
