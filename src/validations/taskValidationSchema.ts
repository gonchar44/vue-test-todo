import { object, string } from 'yup'
import { Priority, TaskFormLimit } from '@/types'

export const taskValidationSchema = object({
  title: string()
    .min(TaskFormLimit.title_min, `Title must be at least ${TaskFormLimit.title_min} characters`)
    .max(TaskFormLimit.title_max, `Title can be up to ${TaskFormLimit.title_max} characters`),
  subtitle: string().max(
    TaskFormLimit.subtitle_max,
    `Subtitle can be up to ${TaskFormLimit.subtitle_max} characters`
  ),
  notes: string().max(
    TaskFormLimit.notes_max,
    `Notes can be up to ${TaskFormLimit.notes_max} characters`
  ),
  priority: string().oneOf(
    [Priority.low, Priority.medium, Priority.high],
    'Priority must be low, medium, or high'
  )
})
