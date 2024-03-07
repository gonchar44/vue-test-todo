export enum Priority {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export interface Task {
  id: number
  title: string
  subtitle: string
  notes: string
  createdAt: string
  updatedAt: string
  priority: string
  is_done: boolean
  subtasks?: Subtask[]
}

export interface Subtask extends Omit<Task, 'subtasks'> {
  parent_id: number
}
