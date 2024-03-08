<template>
  <TransitionRoot appear :show="true" as="template">
    <Dialog as="div" @close="onClose" class="relative z-10">
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
                {{ title }}
              </DialogTitle>

              <slot />

              <div v-if="!isHiddenButtons" class="flex gap-x-5 mt-4">
                <PrimaryButton
                  v-if="submitText"
                  :is-disabled="isLoading"
                  @on-click="$emit('on-submit')"
                >
                  {{ submitText }}
                </PrimaryButton>

                <SecondaryButton :disabled="isLoading" @on-click="onClose">
                  Cancel
                </SecondaryButton>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'

export default defineComponent({
  name: 'ModalTemplate',
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    PrimaryButton,
    SecondaryButton
  },
  props: {
    isLoading: Boolean,
    isForm: Boolean,
    title: {
      type: String,
      required: true
    },
    submitText: String,
    isHiddenButtons: Boolean
  },
  setup(_, { emit }: SetupContext) {
    const onClose = () => {
      emit('on-close')
    }

    return { onClose }
  }
})
</script>
