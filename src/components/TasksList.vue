<template>
  <div
    class="w-full max-w-[600px] flex flex-col p-3 gap-y-8 mx-auto"
    :class="[isNested && 'bg-gray-100 rounded-md my-3']"
  >
    <PrimaryButton class="ml-7" @on-click="isCreateModalOpened = true">
      <PlusIcon class="w-5 h-5 text-primary-dark" />
      <span>{{ isNested ? 'Subtask' : 'Task' }}</span>
    </PrimaryButton>

    <template v-if="sortedTasks.length > 0">
      <ul class="w-full flex flex-col gap-y-4">
        <TasksListItem
          v-for="task in sortedTasks"
          :task="task"
          :key="`${isNested ? 'subtask-' : ''}${task.id}`"
        />
      </ul>
      <slot name="content" />
    </template>
    <MessageBlock v-else> The {{ !isNested ? 'tasks' : 'subtasks' }} list is empty. </MessageBlock>
    <CircleLoader v-if="isLoading" />

    <ModalTemplate
      v-if="isCreateModalOpened"
      :is-hidden-buttons="true"
      :title="`Create ${isNested ? 'subtask' : 'task'}`"
      @on-close="closeModal"
    >
      <template #content>
        <TaskForm @on-close="closeModal" />
      </template>
    </ModalTemplate>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { storeToRefs } from 'pinia'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import TasksListItem from '@/components/TasksListItem.vue'
import { Task, Subtask } from '@/types'
import { sortTasks } from '@/helpers'
import ModalTemplate from '@/components/common/ModalTemplate.vue'
import TaskForm from '@/components/TaskForm.vue'
import MessageBlock from '@/components/common/MessageBlock.vue'
import CircleLoader from '@/components/common/CircleLoader.vue'
import { useTasksStore } from '@/stores/tasks'

export default defineComponent({
  name: 'TasksList',
  components: {
    CircleLoader,
    PrimaryButton,
    TasksListItem,
    PlusIcon,
    ModalTemplate,
    TaskForm,
    MessageBlock
  },
  props: {
    isNested: Boolean,
    tasks: {
      type: Array as PropType<Task[] | Subtask[]>
    }
  },
  setup(props) {
    // Local values
    const tasksStore = useTasksStore()
    const { isLoading } = storeToRefs(tasksStore)
    const isCreateModalOpened = ref(false)
    const sortedTasks = computed<Task[] | Subtask[]>(() => sortTasks(props.tasks || []))

    // Methods
    const closeModal = () => {
      isCreateModalOpened.value = false
    }

    return { isLoading, isCreateModalOpened, sortedTasks, closeModal }
  }
})
</script>
