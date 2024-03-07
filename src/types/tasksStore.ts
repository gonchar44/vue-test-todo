import { Pagination, Task } from '@/types'

export interface TasksStoreState {
  isLoading: boolean
  pagination: Pagination | object
  tasks: Task[]
}

export interface UpdateSubtaskIsDone {
  parentId: number
  subtaskId: number
  newValue: boolean
}
