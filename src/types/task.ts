export enum Priority {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export interface TaskFormFields {
  title: string
  subtitle: string
  notes: string
  priority: Priority
}

export interface Task extends TaskFormFields {
  id: number
  createdAt: string
  updatedAt: string
  is_done: boolean
  subtasks?: Subtask[]
}

export interface Subtask extends Omit<Task, 'subtasks'> {
  parent_id: number
}

export enum TaskFormLimit {
  title_min = 3,
  title_max = 40,
  subtitle_max = 70,
  notes_max = 300
}
