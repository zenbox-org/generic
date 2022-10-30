import { z } from 'zod'

export const ProcessSchema = z.object({
  name: z.string().min(1),
  delay: z.number().int().min(1), // in milliseconds
})

export type Process = z.infer<typeof ProcessSchema>
