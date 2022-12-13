import { isEqualByD } from 'libs/utils/lodash'
import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'

export const DescriptionSchema = z.string().describe('Description')

export const DescriptionsSchema = z.array(DescriptionSchema)
  .superRefine(getDuplicatesRefinement('Description', parseDescriptionUid))

export const DescriptionUidSchema = DescriptionSchema

export type Description = z.infer<typeof DescriptionSchema>

export type DescriptionUid = z.infer<typeof DescriptionUidSchema>

export function parseDescription(description: Description): Description {
  return DescriptionSchema.parse(description)
}

export function parseDescriptions(descriptions: Description[]): Description[] {
  return DescriptionsSchema.parse(descriptions)
}

export function parseDescriptionUid(descriptionUid: DescriptionUid): DescriptionUid {
  return DescriptionUidSchema.parse(descriptionUid)
}

export const isEqualDescription = (a: Description) => (b: Description) => isEqualByD(a, b, parseDescriptionUid)
