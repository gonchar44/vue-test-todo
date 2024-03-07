import { defineStore } from 'pinia'
import axiosService from '@/services/axios'
import { Subtask, Task, TasksStoreState, UpdateSubtaskIsDone } from '@/types'

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
    deleteTask(taskId: number) {
      this.isLoading = true
      return axiosService
        .delete(`/tasks/${taskId}`)
        .then(() => {
          this.tasks = this.tasks.filter((task) => task.id !== taskId)
        })
        .catch((err) => {
          // TODO: handle error here
          console.error('delete task error', err)
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
            return task.id === parentId
              ? {
                  ...task,
                  subtasks: task.subtasks?.filter((subtask: Subtask) => subtask.id !== subtaskId)
                }
              : task
          })
        })
        .catch((err) => {
          // TODO: handle error here
          console.error('delete task error', err)
        })
    },
    updateSubtaskIsDone({ parentId, subtaskId, newValue }: UpdateSubtaskIsDone) {
      this.tasks = this.tasks.map((task) => {
        return task.id === parentId
          ? {
              ...task,
              subtasks: task.subtasks?.map((subtask: Subtask) =>
                subtask.id === subtaskId ? { ...subtask, is_done: newValue } : subtask
              )
            }
          : task
      })
    },
    updateTaskIsDone(taskId: number, newValue: boolean) {
      return axiosService
        .put(`/tasks/${taskId}?populate=subtasks`, { data: { is_done: newValue } })
        .then(() => {
          this.tasks = this.tasks.map((task): Task => {
            return task.id === taskId ? { ...task, is_done: newValue } : task
          })
        })
        .catch((err) => {
          // TODO: handle error here
          console.error('delete task error', err)
        })
    }
  }
})
