import { z } from 'zod'

export const NaturalNumberSchema = z.number().int().min(0)

export type NaturalNumber = z.infer<typeof NaturalNumberSchema>
