<template>
  <TasksList />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TasksList from '@/components/TasksList.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    TasksList
  }
})
</script>
