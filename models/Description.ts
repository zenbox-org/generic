import { z } from 'zod'
import { getDuplicatesRefinement } from 'zenbox-util/zod'
import { isEqualBy } from 'zenbox-util/lodash'

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

export const isEqualDescription = (a: Description) => (b: Description) => isEqualBy(a, b, parseDescriptionUid)
