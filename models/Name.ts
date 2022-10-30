import { z } from 'zod'

export const NameSchema = z.string().min(1)

export type Name = z.infer<typeof NameSchema>
