import { z } from 'zod'
import { getDuplicatesRefinement } from 'zenbox-util/zod'
import { identity } from 'lodash-es'

/**
 * More sexes must be represented with another model
 */
export const SexSchema = z.enum(['Male', 'Female']).describe('Sex')

export const SexsSchema = z.array(SexSchema)
  .superRefine(getDuplicatesRefinement('Sex', identity))

export type Sex = z.infer<typeof SexSchema>

export function parseSex(sex: Sex): Sex {
  return SexSchema.parse(sex)
}

export function parseSexs(sexs: Sex[]): Sex[] {
  return SexsSchema.parse(sexs)
}

export const isEqualSex = (a: Sex) => (b: Sex) => a === b
