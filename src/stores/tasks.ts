import { defineStore } from 'pinia'
import axiosService from '@/services/axios'
import { Subtask, SubtaskFormFields, TaskFormFields, TasksStoreState, UpdateSubtask } from '@/types'

export const useTasksStore = defineStore('tasks', {
  state: (): TasksStoreState => ({
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
    createTask(data: TaskFormFields) {
      this.isLoading = true
      return axiosService
        .post('/tasks', { data })
        .then((res) => {
          this.tasks.push(res.data)
        })
        .catch((err) => {
          // TODO: handle error here
          console.error('error log', err)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    createSubtask(data: SubtaskFormFields) {
      this.isLoading = true
      return axiosService
        .post('/subtasks?populate=*', { data })
        .then((res) => {
          this.tasks = this.tasks.map((task) => {
            if (task.id === data.task) {
              return {
                ...task,
                subtasks: [...(task.subtasks as Subtask[]), res.data]
              }
            }

            return task
          })
        })
        .catch((err) => {
          // TODO: handle error here
          console.error('error log', err)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    deleteTask(taskId: number) {
      this.isLoading = true
      return axiosService
        .delete(`/tasks/${taskId}`)
        .then(() => {
          this.tasks = this.tasks.filter((task) => task.id !== taskId)
        })
        .catch((err) => {
          // TODO: handle error here
          console.error('error log', err)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    deleteSubtask(parentId: number, subtaskId: number) {
      this.isLoading = true
      return axiosService
        .delete(`/subtasks/${subtaskId}`)
        .then(() => {
          this.tasks = this.tasks.map((task) => {
            if (task.id === parentId) {
              return {
                ...task,
                subtasks: task.subtasks?.filter((subtask: Subtask) => subtask.id !== subtaskId)
              }
            }

            return task
          })
        })
        .catch((err) => {
          // TODO: handle error here
          console.error('error log', err)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    updateTask(taskId: number, data: TaskFormFields | { is_done: boolean }) {
      this.isLoading = true
      return axiosService
        .put(`tasks/${taskId}?populate=subtasks`, { data })
        .then((res) => {
          this.tasks = this.tasks.map((task) => {
            return task.id === taskId ? res.data : task
          })
        })
        .catch((err) => {
          // TODO: handle error here
          console.error('error log', err)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    updateSubtask({ parentId, subtaskId, data }: UpdateSubtask) {
      this.isLoading = true
      return axiosService
        .put(`/subtasks/${subtaskId}?populate=*`, { data })
        .then((res) => {
          this.tasks = this.tasks.map((task) => {
            if (task.id === parentId) {
              return {
                ...task,
                subtasks: task.subtasks?.map((subtask: Subtask) =>
                  subtask.id === subtaskId ? res.data : subtask
                )
              }
            }

            return task
          })
        })
        .catch((err) => {
          // TODO: handle error here
          console.error('error log', err)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
})
