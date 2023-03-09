import { BigNumber } from 'libs/utils/BigNumber/utils'
import { z } from 'zod'

export const GuesstimateSchema = z.instanceof(BigNumber).describe('Guesstimate')

/**
 * No duplicates refinement - it's an atomic type
 */
export const GuesstimatesSchema = z.array(GuesstimateSchema)

export const GuesstimateUidSchema = GuesstimateSchema

export type Guesstimate = z.infer<typeof GuesstimateSchema>

export type GuesstimateUid = z.infer<typeof GuesstimateUidSchema>

export function parseGuesstimate(guesstimate: Guesstimate): Guesstimate {
  return GuesstimateSchema.parse(guesstimate)
}

export function parseGuesstimates(guesstimates: Guesstimate[]): Guesstimate[] {
  return GuesstimatesSchema.parse(guesstimates)
}

export function parseGuesstimateUid(guesstimateUid: GuesstimateUid): GuesstimateUid {
  return GuesstimateUidSchema.parse(guesstimateUid)
}
