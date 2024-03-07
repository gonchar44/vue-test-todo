import { Subtask, Task } from '@/types'

export const sortTasks = (tasks: Task[] | Subtask[]): Task[] | Subtask[] => {
  return [...tasks].sort((a: Task | Subtask, b: Task | Subtask) => {
    return a.is_done === b.is_done ? 0 : a.is_done ? 1 : -1
  })
}
