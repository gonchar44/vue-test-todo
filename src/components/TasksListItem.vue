<template>
  <li class="w-full flex justify-center gap-x-1">
    <!--    Task link-->
    <router-link
      :to="`/task/${task.id}`"
      class="w-11/12 min-h-20 bg-primary-main rounded-md p-3 flex justify-between items-center relative"
    >
      <!--      Main task block-->
      <div class="w-11/12 h-full flex flex-col justify-between">
        <h3 class="text-xl font-bold truncate">{{ task.title }}</h3>
        <PriorityMark :priority="task.priority" />
        <span
          v-if="task.subtitle"
          class="block text-sm text-secondary-dark font-semibold truncate"
          >{{ task.subtitle }}</span
        >
        <p v-if="isDetails">{{ task.notes }}</p>
      </div>
      <ChevronRightIcon class="w-5 h-5" />
    </router-link>

    <!--    Control buttons-->
    <div class="h-20 flex flex-col gap-y-1">
      <!--      Toggle details button-->
      <ListButton bg-color="bg-primary-light" @click="isUnwrapped = !isUnwrapped">
        <RectangleStackIcon
          :class="`w-5 h-5 text-primary-dark mx-auto ${isDetails && 'rotate-180'}`"
        />
      </ListButton>

      <!--      Deletion button-->
      <ListButton bg-color="bg-secondary-main" @click="isDeleteModal = true">
        <TrashIcon class="w-5 h-5 text-white mx-auto" />
      </ListButton>
    </div>

    <SubmitModal
      v-if="isDeleteModal"
      :is-loading="isLoading"
      :on-submit="submitDeletion"
      :on-close="closeModal"
    >
      <DeletionTaskModal :task-id="task.id" :task-title="task.title" :close-modal="closeModal" />
    </SubmitModal>
  </li>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, PropType, ref } from 'vue'
import { TrashIcon, RectangleStackIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { Priority, Task } from '@/types/task'
import PriorityMark from '@/components/PriorityMark.vue'
import ListButton from '@/components/common/ListButton.vue'
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'TasksListItem',
  components: {
    SubmitModal: defineAsyncComponent(() => import('@/components/common/SubmitModal.vue')),
    DeletionTaskModal: defineAsyncComponent(() => import('@/components/DeletionTaskModal.vue')),
    TrashIcon,
    PriorityMark,
    ListButton,
    RectangleStackIcon,
    ChevronRightIcon
  },
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true
    }
  },
  setup(props) {
    // Store
    const tasksStore = useTasksStore()
    const { deleteTask } = tasksStore
    const { isLoading } = storeToRefs(tasksStore)

    // Local values
    const isUnwrapped = ref(false)
    const isDeleteModal = ref(false)
    const isDetails = computed(
      () => isUnwrapped.value && (props.task.notes || props.task.subtasks?.length)
    )

    // Methods
    const closeModal = () => {
      isDeleteModal.value = false
    }

    const submitDeletion = async () => {
      await deleteTask(props.task.id)
      closeModal()
    }

    return {
      Priority,
      isLoading,
      isUnwrapped,
      isDeleteModal,
      isDetails,
      submitDeletion,
      closeModal
    }
  }
})
</script>
