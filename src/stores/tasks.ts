import { defineStore } from 'pinia'
import axiosService from '@/services/axios'
import { Pagination } from '@/types/pagination'
import { Task } from '@/types/task'

interface State {
  isLoading: boolean
  pagination: Pagination | object
  tasks: Task[]
}

export const useTasksStore = defineStore('tasks', {
  state: (): State => ({
    isLoading: false,
    pagination: {},
    tasks: []
  }),
  actions: {
    fetchTasks() {
      this.isLoading = true
      axiosService
        .get('/tasks?populate=subtasks')
        .then((res) => {
          const { data, meta } = res.data

          this.tasks = data
          this.pagination = meta.pagination
        })
        .catch((err) => {
          // TODO: handle error here
          console.error('fetch tasks error', err)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    deleteTask(id: number) {
      this.isLoading = true
      return axiosService
        .delete(`/tasks/${id}`)
        .then(() => {
          this.tasks = this.tasks.filter((task) => task.id !== id)
        })
        .catch((err) => {
          // TODO: handle error here
          console.error('delete task error', err)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
})
