import { defineStore } from 'pinia'
import axiosService from '@/services/axios'
import { Pagination } from '@/types/pagination'
import { Todo } from '@/types/todo'

interface State {
  isLoading: boolean
  pagination: Pagination | object
  todos: Todo[]
}

export const useTodosStore = defineStore('todos', {
  state: (): State => ({
    isLoading: false,
    pagination: {},
    todos: []
  }),
  actions: {
    fetchTodos() {
      this.isLoading = true
      axiosService
        .get('/todos')
        .then((res) => {
          const { data, meta } = res.data

          this.todos = data
          this.pagination = meta.pagination
        })
        .finally(() => {
          this.isLoading = false
        })
        .catch((err) => {
          // TODO: handle error here
          console.error('fetch todos error', err)
        })
    }
  }
})
