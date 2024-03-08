<template>
  <form class="flex flex-col gap-y-2 py-3" @submit.prevent="onSubmit">
    <FieldEl
      name="title"
      label="Title"
      :value="title"
      :is-disabled="isFieldsDisabled"
      :error-message="errors.title"
      :max-length="TaskFormLimit.title_max"
      @on-input="title = $event"
    />

    <FieldEl
      name="subtitle"
      label="Subtitle"
      :value="subtitle"
      :is-disabled="isFieldsDisabled"
      :error-message="errors.subtitle"
      :max-length="TaskFormLimit.subtitle_max"
      @on-input="subtitle = $event"
    />

    <TextareaEl
      name="notes"
      label="Notes"
      :value="notes"
      :is-disabled="isFieldsDisabled"
      :error-message="errors.notes"
      :max-length="TaskFormLimit.notes_max"
      @on-input="notes = $event"
    />

    <RadioGroupEl
      :value="priority"
      :options="prioritiesList"
      :is-disabled="isFieldsDisabled"
      @on-select="priority = $event"
    />

    <div class="flex gap-x-5 mt-5">
      <PrimaryButton v-if="isFieldsDisabled" @on-click="isEditing = !isEditing">
        Edit
      </PrimaryButton>
      <template v-else>
        <PrimaryButton type="submit" :is-disabled="isLoading || !isFormValid">
          {{ !!task ? 'Update' : 'Create' }}
        </PrimaryButton>

        <SecondaryButton @on-click="task ? (isEditing = false) : closeModal"
          >Cancel</SecondaryButton
        >
      </template>
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, ref, SetupContext } from 'vue'
import { useField, useForm } from 'vee-validate'
import FieldEl from '@/components/common/FieldEl.vue'
import TextareaEl from '@/components/common/TextareaEl.vue'
import RadioGroupEl from '@/components/common/RadioGroupEl.vue'
import { taskValidationSchema } from '@/validations'
import {
  Option,
  Priority,
  Subtask,
  SubtaskFormFields,
  Task,
  TaskFormFields,
  TaskFormLimit
} from '@/types'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'TaskForm',
  components: {
    SecondaryButton,
    PrimaryButton,
    FieldEl,
    TextareaEl,
    RadioGroupEl
  },
  props: {
    task: Object as PropType<Task | Subtask>
  },
  setup(props, { emit }: SetupContext) {
    // Local values
    const parentTaskId = inject('parent-task-id', null)
    const isEditing = ref(false)
    const isFieldsDisabled = computed(() => !!props.task && !isEditing.value)

    const tasksStore = useTasksStore()
    const { createTask, updateTask, createSubtask, updateSubtask } = tasksStore
    const { isLoading } = storeToRefs(tasksStore)
    const { errors, handleSubmit, meta } = useForm({
      validationSchema: taskValidationSchema
    })
    const isFormValid = computed(() => meta.value.valid)
    const { value: title } = useField('title', undefined, {
      initialValue: props.task?.title || ''
    })
    const { value: subtitle } = useField('subtitle', undefined, {
      initialValue: props.task?.subtitle || ''
    })
    const { value: notes } = useField('notes', undefined, {
      initialValue: props.task?.notes || ''
    })
    const prioritiesList: Option[] = [
      { value: Priority.low },
      { value: Priority.medium },
      { value: Priority.high }
    ]
    const { value: priority } = useField('priority', undefined, {
      initialValue: props.task?.priority || Priority.low
    })

    // Methods
    const closeModal = () => {
      emit('on-close')
    }

    const updateHandle = (values: TaskFormFields | SubtaskFormFields) => {
      if (parentTaskId && !(props.task as Task).subtasks) {
        return updateSubtask({
          parentId: parentTaskId,
          subtaskId: props.task?.id as number,
          data: values as SubtaskFormFields
        })
      }

      return props.task && updateTask(props.task.id, values)
    }

    const createHandle = (values: TaskFormFields | SubtaskFormFields) => {
      if (parentTaskId) {
        return createSubtask({
          ...values,
          task: parentTaskId
        })
      } else {
        return createTask(values)
      }
    }

    const onSubmit = handleSubmit(async (values) => {
      if (!isFormValid.value) return

      if (props.task) {
        await updateHandle(values as SubtaskFormFields)
      } else {
        await createHandle(values as TaskFormFields)
      }

      closeModal()
    })

    return {
      TaskFormLimit,
      parentTaskId,
      isLoading,
      isEditing,
      isFieldsDisabled,
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
