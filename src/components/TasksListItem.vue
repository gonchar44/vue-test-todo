<template>
  <li class="w-full flex justify-center gap-x-1">
    <!--    Task link-->
    <router-link
      :to="`/task/${task.id}`"
      class="w-11/12 h-20 bg-primary-main rounded-md p-3 flex justify-between items-center relative"
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
      </div>
      <ChevronRightIcon class="w-5 h-5" />
    </router-link>

    <!--    Control buttons-->
    <div class="h-20 flex flex-col gap-y-1">
      <!--      Todo: implement the logic-->
      <ListButton bg-color="bg-primary-light">
        <RectangleStackIcon class="w-5 h-5 text-primary-dark mx-auto" />
      </ListButton>

      <ListButton bg-color="bg-secondary-main">
        <TrashIcon class="w-5 h-5 text-white mx-auto" />
      </ListButton>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TrashIcon, RectangleStackIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { Priority, Task } from '@/types/task'
import PriorityMark from '@/components/PriorityMark.vue'
import ListButton from '@/components/common/ListButton.vue'

export default defineComponent({
  name: 'TasksListItem',
  components: {
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
  setup() {
    return { Priority }
  }
})
</script>
