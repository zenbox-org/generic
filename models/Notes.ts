import { z } from 'zod'
import { nail } from 'libs/utils/string'

export const NotesSchema = z.string().optional().transform(transformNotes)

export type Notes = z.infer<typeof NotesSchema>

export function validateNotes(notes: Notes) {
  return NotesSchema.parse(notes)
}

export function transformNotes(notes?: string) {
  return notes ? nail(notes) : notes
}
