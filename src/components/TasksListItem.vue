<template>
  <li class="w-full" :class="[task.is_done && 'opacity-30 hover:opacity-100']">
    <div class="w-full flex justify-center gap-x-1 ease-in-out transition-all">
      <DoneToggle :task="task" />

      <!--    Task -->
      <div
        class="w-11/12 min-h-20 bg-primary-main rounded-md p-3 flex justify-between items-center relative"
      >
        <!--      Main task block-->
        <div class="w-11/12 h-full flex flex-col justify-between">
          <h3 class="text-xl font-bold truncate">{{ task.title }}</h3>
          <TaskInfoMarks :task="task" />
          <span
            v-if="task.subtitle"
            class="block text-sm text-secondary-dark font-semibold truncate"
            >{{ task.subtitle }}</span
          >
          <p v-if="isOpenedDetails">{{ task.notes }}</p>
        </div>
        <ChevronRightIcon class="w-5 h-5" />
      </div>

      <!--    Control buttons-->
      <div class="h-20 flex flex-col gap-y-1">
        <!--      Toggle details button-->
        <ListButton
          v-if="isDetails"
          :title="isOpenedDetails ? 'Hide details' : 'Show details'"
          class="bg-primary-light"
          @click="isUnwrapped = !isUnwrapped"
        >
          <RectangleStackIcon
            class="w-5 h-5 text-primary-dark mx-auto"
            :class="[isOpenedDetails && 'rotate-180']"
          />
        </ListButton>

        <!--      Deletion button-->
        <ListButton class="bg-secondary-main" @click="isDeleteModalOpened = true">
          <TrashIcon class="w-5 h-5 text-white mx-auto" />
        </ListButton>
      </div>
    </div>

    <div v-if="isOpenedDetails && subtasks?.length" class="w-11/12 min-h-[20px] mx-auto">
      <TasksList :tasks="subtasks" :is-sub-tasks="true" />
    </div>

    <ModalTemplate
      v-if="isDeleteModalOpened"
      title="Are you sure?"
      submit-text="Delete"
      :is-loading="isLoading"
      @on-submit="submitDeletion"
      @on-close="closeModal"
    >
      <DeletionTaskModal :task-id="task.id" :task-title="task.title" :close-modal="closeModal" />
    </ModalTemplate>
  </li>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, PropType, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { TrashIcon, RectangleStackIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { Priority, Subtask, Task } from '@/types'
import DoneToggle from '@/components/common/DoneToggle.vue'
import TaskInfoMarks from '@/components/common/TaskInfoMarks.vue'
import ListButton from '@/components/common/ListButton.vue'
import { useTasksStore } from '@/stores/tasks'
import { checkIsSubtask } from '@/helpers'

export default defineComponent({
  name: 'TasksListItem',
  components: {
    TasksList: defineAsyncComponent(() => import('./TasksList.vue')),
    ModalTemplate: defineAsyncComponent(() => import('@/components/common/ModalTemplate.vue')),
    DeletionTaskModal: defineAsyncComponent(() => import('@/components/DeletionTaskModal.vue')),
    DoneToggle,
    TrashIcon,
    TaskInfoMarks,
    ListButton,
    RectangleStackIcon,
    ChevronRightIcon
  },
  props: {
    task: {
      type: Object as PropType<Task | Subtask>,
      required: true
    }
  },
  setup(props) {
    // Store
    const tasksStore = useTasksStore()
    const { deleteSubtask, deleteTask } = tasksStore
    const { isLoading } = storeToRefs(tasksStore)

    // Local values
    const isUnwrapped = ref(false)
    const isDeleteModalOpened = ref(false)
    const isSubtask = computed(() => checkIsSubtask(props.task))
    const subtasks = computed(() => (!isSubtask.value ? (props.task as Task).subtasks : []))
    const isDetails = computed(() =>
      isSubtask.value ? !!props.task.notes : !!props.task.notes || (subtasks.value?.length ?? 0) > 0
    )
    const isOpenedDetails = computed(() => isUnwrapped.value && isDetails)
    const taskLink = computed(() =>
      isSubtask.value
        ? `/task/${(props.task as Subtask).parent_id}/subtask/${props.task.id}`
        : `/task/${props.task.id}`
    )

    // Methods
    const closeModal = () => {
      isDeleteModalOpened.value = false
    }

    const submitDeletion = async () => {
      isSubtask.value
        ? await deleteSubtask((props.task as Subtask).parent_id, props.task.id)
        : await deleteTask(props.task.id)
      closeModal()
    }

    return {
      Priority,
      isLoading,
      isUnwrapped,
      isDeleteModalOpened,
      isDetails,
      isOpenedDetails,
      taskLink,
      subtasks,
      submitDeletion,
      closeModal
    }
  }
})
</script>
