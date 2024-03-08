<template>
  <div class="mt-2">
    <p class="text-sm text-gray-500">
      Are you sure you want to delete
      <span class="text-primary-dark font-bold"> {{ taskTitle }}</span> task? This action cannot be
      undone and will permanently remove the task and all its associated data.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DeletionTaskModal',
  props: {
    taskTitle: {
      type: String,
      required: true
    }
  }
})
</script>
