import { z } from 'zod'

export const ISO639CodeSchema = z.string().min(2)
  .describe('ISO639Code')

export type ISO639Code = z.infer<typeof ISO639CodeSchema>

export function parseISO639Code(code: ISO639Code): ISO639Code {
  return ISO639CodeSchema.parse(code)
}
