import { z } from 'zod'

export const AccessTypeSchema = z.enum([
  'read',
  'write',
  'execute',
])

export type AccessType = z.infer<typeof AccessTypeSchema>
