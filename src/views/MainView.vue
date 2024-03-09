<template>
  <TasksList :tasks="tasks">
    <template #content>
      <div v-if="isThereNextPage" ref="target">Load More...</div>
    </template>
  </TasksList>

  <ModalTemplate v-if="isTasksError" title="Error!" @on-close="cleanError">
    <template #content>
      <p class="my-7" v-html="ErrorsMessages.SOMETHING_WENT_WRONG"></p>
    </template>
  </ModalTemplate>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, onMounted, ref } from 'vue'
import TasksList from '@/components/TasksList.vue'
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'
import { ErrorsMessages } from '@/types'
import { useIntersectionObserver } from '@vueuse/core'

export default defineComponent({
  name: 'MainView',
  components: {
    TasksList,
    ModalTemplate: defineAsyncComponent(() => import('@/components/common/ModalTemplate.vue'))
  },
  setup() {
    const target = ref(null)
    const tasksStore = useTasksStore()
    const { fetchTasks, goNextPage, cleanError } = tasksStore
    const { pagination, isError: isTasksError, tasks } = storeToRefs(tasksStore)
    const isThereNextPage = computed(() => pagination.value.page < pagination.value.pageCount)

    onMounted(() => {
      if (!tasks.value.length) {
        fetchTasks(1)
      }
    })

    // Infinit scroll loading handling
    useIntersectionObserver(target, ([{ isIntersecting }]) => {
      if (isIntersecting && isThereNextPage) {
        goNextPage()
        fetchTasks(pagination.value.page)
      }
    })

    return { ErrorsMessages, isThereNextPage, isTasksError, tasks, cleanError, target }
  }
})
</script>
