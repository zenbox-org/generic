import { z } from 'zod'
import { Id } from './Id'
import { getProbabilityUid, ProbabilitySchema } from './Probability'

// Rating is probability of success
export const RatingSchema = ProbabilitySchema

export type Rating = z.infer<typeof RatingSchema>

export function validateRating(rating: Rating) {
  return RatingSchema.parse(rating)
}

export function getRatingUid(rating: Rating): Id {
  return getProbabilityUid(rating)
}

export function getRatingFromStars(count: number, max = 5) {
  return validateRating(count / max)
}
