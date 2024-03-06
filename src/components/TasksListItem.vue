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

    <ConfirmDeletionModal v-if="isDeleteModal" :task-title="task.title" />
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { TrashIcon, RectangleStackIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { Priority, Task } from '@/types/task'
import PriorityMark from '@/components/PriorityMark.vue'
import ListButton from '@/components/common/ListButton.vue'
import ConfirmDeletionModal from '@/components/ConfirmDeletionModal.vue'

export default defineComponent({
  name: 'TasksListItem',
  components: {
    ConfirmDeletionModal,
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
    const isUnwrapped = ref(false)
    const isDeleteModal = ref(false)
    const isDetails = computed(
      () => isUnwrapped.value && (props.task.notes || props.task.subtasks?.length)
    )

    return { Priority, isUnwrapped, isDeleteModal, isDetails }
  }
})
</script>
