<template>
  <form class="flex flex-col gap-y-2 py-3" @submit.prevent="onSubmit">
    <FieldEl
      name="title"
      label="Title"
      :value="title"
      :error-message="errors.title"
      :max-length="TaskFormLimit.title_max"
      @on-input="title = $event"
    />

    <FieldEl
      name="subtitle"
      label="Subtitle"
      :value="subtitle"
      :error-message="errors.subtitle"
      :max-length="TaskFormLimit.subtitle_max"
      @on-input="subtitle = $event"
    />

    <TextareaEl
      name="notes"
      label="Notes"
      :value="notes"
      :error-message="errors.notes"
      :max-length="TaskFormLimit.notes_max"
      @on-input="notes = $event"
    />

    <RadioGroupEl :value="priority" :options="prioritiesList" @on-select="priority = $event" />

    <div class="flex gap-x-5 mt-5">
      <PrimaryButton type="submit" :is-disabled="isLoading || !isFormValid">Create</PrimaryButton>

      <SecondaryButton @on-click="closeModal">Cancel</SecondaryButton>
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, inject, SetupContext } from 'vue'
import { useField, useForm } from 'vee-validate'
import FieldEl from '@/components/common/FieldEl.vue'
import TextareaEl from '@/components/common/TextareaEl.vue'
import RadioGroupEl from '@/components/common/RadioGroupEl.vue'
import { taskValidationSchema } from '@/validations'
import { Option, Priority, SubtaskFormFields, TaskFormFields, TaskFormLimit } from '@/types'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'CreateTaskForm',
  components: {
    SecondaryButton,
    PrimaryButton,
    FieldEl,
    TextareaEl,
    RadioGroupEl
  },
  setup(_, { emit }: SetupContext) {
    const parentTaskId = inject('parent-task-id', null)

    const tasksStore = useTasksStore()
    const { createTask, createSubtask } = tasksStore
    const { isLoading } = storeToRefs(tasksStore)
    const { errors, handleSubmit, meta } = useForm({
      validationSchema: taskValidationSchema
    })
    const isFormValid = computed(() => meta.value.valid)
    const { value: title } = useField('title', undefined, {
      initialValue: ''
    })
    const { value: subtitle } = useField('subtitle', undefined, {
      initialValue: ''
    })
    const { value: notes } = useField('notes', undefined, {
      initialValue: ''
    })

    const prioritiesList: Option[] = [
      { value: Priority.low },
      { value: Priority.medium },
      { value: Priority.high }
    ]
    const { value: priority } = useField('priority', undefined, {
      initialValue: Priority.low
    })

    const closeModal = () => {
      emit('on-close')
    }

    const onSubmit = handleSubmit(async (values) => {
      if (!isFormValid.value) return

      if (parentTaskId) {
        await createSubtask({
          ...values,
          task: parentTaskId as number
        } as SubtaskFormFields)
      } else {
        await createTask(values as TaskFormFields)
      }

      closeModal()
    })

    return {
      TaskFormLimit,
      isLoading,
      title,
      subtitle,
      notes,
      prioritiesList,
      priority,
      errors,
      isFormValid,
      closeModal,
      onSubmit
    }
  }
})
</script>
