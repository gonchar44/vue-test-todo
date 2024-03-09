<template>
  <li class="w-full" :class="[task.is_done && 'opacity-30 hover:opacity-100']">
    <div class="w-full flex justify-center gap-x-1 ease-in-out transition-all relative">
      <DoneToggle :task="task" />

      <!--    Task -->
      <div
        class="w-full min-w-0 min-h-20 bg-primary-main rounded-md p-3 flex justify-between items-center cursor-pointer"
        @click="isEditingModalOpened = true"
      >
        <!--      Main task block-->
        <div class="w-10/12 h-full flex flex-col justify-between">
          <TaskInfoLabels :task="task" />
          <h3 class="text-xl font-bold truncate">{{ task.title }}</h3>
          <span
            v-if="task.subtitle"
            class="inline-block text-sm text-secondary-dark font-semibold truncate"
            >{{ task.subtitle }}</span
          >
          <p v-if="isOpenedDetails" class="break-words">{{ task.notes }}</p>
        </div>
        <ChevronRightIcon class="w-5 h-5" />
      </div>

      <!--    Control buttons-->
      <div class="h-20 flex flex-col gap-y-1">
        <!--      Toggle details button-->
        <ListButton
          :title="isOpenedDetails ? 'Hide details' : 'Show details'"
          class="bg-primary-light"
          @on-click="isUnwrapped = !isUnwrapped"
        >
          <RectangleStackIcon
            class="w-5 h-5 text-primary-dark mx-auto"
            :class="[isOpenedDetails && 'rotate-180']"
          />
        </ListButton>

        <!--      Deletion button-->
        <ListButton class="bg-secondary-main" @click="isDeletionModalOpened = true">
          <TrashIcon class="w-5 h-5 text-white mx-auto" />
        </ListButton>
      </div>
    </div>

    <div v-if="isOpenedDetails && isNestedList" class="w-11/12 mx-auto">
      <TasksList v-if="isOpenedDetails" :tasks="subtasks" :is-nested="isNestedList" />
    </div>

    <!--    Editing modal-->
    <ModalTemplate
      v-if="isEditingModalOpened"
      :title="task.title"
      :is-loading="isLoading"
      :is-hidden-buttons="true"
      submit-text="Update"
      @on-close="closeEditingModal"
    >
      <template #content>
        <TaskForm :task="task" @on-close="closeEditingModal" />
      </template>
    </ModalTemplate>

    <!--    Deletion modal-->
    <ModalTemplate
      v-if="isDeletionModalOpened"
      title="Are you sure?"
      submit-text="Delete"
      :is-loading="isLoading"
      @on-submit="submitDeletion"
      @on-close="closeDeletionModal"
    >
      <template #content>
        <DeletionTaskModal
          :task-id="task.id"
          :task-title="task.title"
          :close-modal="closeDeletionModal"
        />
      </template>
    </ModalTemplate>
  </li>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, PropType, provide, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { TrashIcon, RectangleStackIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { Priority, Subtask, Task } from '@/types'
import DoneToggle from '@/components/common/DoneToggle.vue'
import TaskInfoLabels from '@/components/common/TaskInfoLabels.vue'
import ListButton from '@/components/common/ListButton.vue'
import { useTasksStore } from '@/stores/tasks'

export default defineComponent({
  name: 'TasksListItem',
  components: {
    TaskForm: defineAsyncComponent(() => import('@/components/TaskForm.vue')),
    TasksList: defineAsyncComponent(() => import('@/components/TasksList.vue')),
    ModalTemplate: defineAsyncComponent(() => import('@/components/common/ModalTemplate.vue')),
    DeletionTaskModal: defineAsyncComponent(() => import('@/components/DeletionTaskModal.vue')),
    DoneToggle,
    TrashIcon,
    TaskInfoLabels,
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
    const isEditingModalOpened = ref(false)
    const isDeletionModalOpened = ref(false)
    const isNestedList = computed(() => !(props.task as Subtask).parent_id)
    const subtasks = computed(() => (isNestedList.value ? (props.task as Task).subtasks : []))
    const isDetails = computed(() =>
      !isNestedList.value
        ? !!props.task.notes
        : !!props.task.notes || (subtasks.value?.length ?? 0) > 0
    )
    const isOpenedDetails = computed(() => isUnwrapped.value && isDetails)

    if (isNestedList.value) {
      provide('parent-task-id', props.task.id)
    }

    // Methods
    const closeEditingModal = () => {
      isEditingModalOpened.value = false
    }

    const closeDeletionModal = () => {
      isDeletionModalOpened.value = false
    }

    const submitDeletion = async () => {
      !isNestedList.value
        ? await deleteSubtask((props.task as Subtask).parent_id, props.task.id)
        : await deleteTask(props.task.id)
      closeDeletionModal()
    }

    return {
      Priority,
      isLoading,
      isUnwrapped,
      isEditingModalOpened,
      isDeletionModalOpened,
      isDetails,
      isOpenedDetails,
      subtasks,
      isNestedList,
      closeEditingModal,
      submitDeletion,
      closeDeletionModal
    }
  }
})
</script>
