import { Task } from '@/types/task'

export const sortTasks = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a: Task, b: Task) => {
    return a.is_done === b.is_done ? 0 : a.is_done ? 1 : -1
  })
}
