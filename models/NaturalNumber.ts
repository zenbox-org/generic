import { z } from 'zod'

export const NaturalNumberSchema = z.number().int().nonnegative()

export type NaturalNumber = z.infer<typeof NaturalNumberSchema>
