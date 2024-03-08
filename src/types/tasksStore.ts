import { Pagination, SubtaskFormFields, Task } from '@/types'

export interface TasksStoreState {
  isLoading: boolean
  pagination: Pagination | object
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
