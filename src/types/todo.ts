export enum Priority {
  low,
  medium,
  high
}

export interface Todo {
  id: number
  title: string
  subtitle: string
  notes: string
  createdAt: string
  updatedAt: string
  priority: string
}
