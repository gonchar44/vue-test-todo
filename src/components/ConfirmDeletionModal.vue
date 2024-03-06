<template>
  <TransitionRoot appear :show="true" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                Are you sure?
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Are you sure you want to delete
                  <span class="text-primary-dark font-bold"> {{ taskTitle }}</span> task? This
                  action cannot be undone and will permanently remove the task and all its
                  associated data.
                </p>
              </div>

              <div class="mt-4 flex gap-x-5">
                <button
                  type="button"
                  :disabled="isLoading"
                  class="font-semibold inline-flex justify-center rounded-md border border-transparent bg-secondary-main px-4 py-2 text-sm font-medium text-white disabled:opacity-40 hover:opacity-90 active:opacity-40"
                  @click="submitDeletion"
                >
                  Delete
                </button>

                <button
                  type="button"
                  :disabled="isLoading"
                  class="font-semibold disabled:opacity-40 hover:opacity-90 active:opacity-40"
                  @click="closeModal"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'ConfirmDeletionModal',
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle
  },
  props: {
    taskId: {
      type: Number,
      required: true
    },
    taskTitle: {
      type: String,
      required: true
    },
    closeModal: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const tasksStore = useTasksStore()
    const { deleteTask } = tasksStore
    const { isLoading } = storeToRefs(tasksStore)

    const submitDeletion = async () => {
      await deleteTask(props.taskId)
      props.closeModal()
    }

    return { isLoading, submitDeletion }
  }
})
</script>
