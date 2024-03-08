import { Priority, Subtask, Task } from '@/types'

export const sortTasks = (tasks: Task[] | Subtask[]): Task[] | Subtask[] => {
  return [...tasks].sort((a: Task | Subtask, b: Task | Subtask) => {
    if (a.is_done !== b.is_done) {
      return a.is_done ? 1 : -1
    } else {
      const priorityValues = { [Priority.high]: 3, [Priority.medium]: 2, [Priority.low]: 1 }
      const priorityA = priorityValues[a.priority]
      const priorityB = priorityValues[b.priority]

      if (priorityA !== priorityB) {
        return priorityB - priorityA
      } else {
        return 0
      }
    }
  })
}
