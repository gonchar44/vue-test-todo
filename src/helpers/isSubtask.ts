import { Subtask, Task } from '@/types'

export const isSubtask = (task: Task | Subtask): boolean => {
  return !!(task as Subtask).parent_id
}
