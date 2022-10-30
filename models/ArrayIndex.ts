import { z } from 'zod'

export const ArrayIndexSchema = z.number().int().nonnegative()
