<template>
  <TasksList :tasks="tasks" />

  <ModalTemplate v-if="isTasksError" title="Error!" @on-close="cleanError">
    <p class="my-7" v-html="ErrorsMessages.SOMETHING_WENT_WRONG"></p>
  </ModalTemplate>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import TasksList from '@/components/TasksList.vue'
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'
import { ErrorsMessages } from '@/types'

export default defineComponent({
  name: 'MainView',
  computed: {
    ErrorsMessages() {
      return ErrorsMessages
    }
  },
  components: {
    TasksList,
    ModalTemplate: defineAsyncComponent(() => import('@/components/common/ModalTemplate.vue'))
  },
  setup() {
    const tasksStore = useTasksStore()
    const { fetchTasks, cleanError } = tasksStore
    const { isError: isTasksError, tasks } = storeToRefs(tasksStore)

    fetchTasks()

    return { isTasksError, tasks, cleanError }
  }
})
</script>
