import { Pagination, SubtaskFormFields, Task } from '@/types'

export interface TasksStoreState {
  isLoading: boolean
  isError: boolean
  pagination: Pagination
  tasks: Task[]
}

export interface UpdateSubtask {
  parentId: number
  subtaskId: number
  data: SubtaskFormFields | UpdateSubtaskIsDone
}

export interface UpdateSubtaskIsDone extends Omit<UpdateSubtask, 'data'> {
  is_done: boolean
}
