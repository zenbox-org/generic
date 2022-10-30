import { z } from 'zod'
import { Id } from './Id'

export const ProbabilitySchema = z.number().min(0).max(1)

export type Probability = z.infer<typeof ProbabilitySchema>

export function validateProbability(probability: Probability) {
  return ProbabilitySchema.parse(probability)
}

export function getProbabilityUid(probability: Probability): Id {
  return probability.toString()
}
