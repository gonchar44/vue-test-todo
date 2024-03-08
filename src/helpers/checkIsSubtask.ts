import { Subtask, Task } from '@/types'

export const checkIsSubtask = (task: Task | Subtask): boolean => {
  return !!(task as Subtask).parent_id
}
