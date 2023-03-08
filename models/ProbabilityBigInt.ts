import { z } from 'zod'

export const ProbabilityBigIntSchema = z.object({
  numerator: z.bigint().nonnegative(),
  denominator: z.bigint().nonnegative(),
})
  .refine(p => p.numerator <= p.denominator, 'assert.lte(probability.numerator, probability.denominator)')
  .describe('ProbabilityBigInt')

export type ProbabilityBigInt = z.infer<typeof ProbabilityBigIntSchema>
