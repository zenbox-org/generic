import { IdSchema } from 'libs/generic/models/Id'
import { isEqualBy } from 'zenbox-util/lodash'
import { getDuplicatesRefinement } from 'zenbox-util/zod'
import { z } from 'zod'

export interface Tag {
  id: string
  parent?: Tag
}

export const TagSchema: z.ZodSchema<Tag> = z.lazy(() => z.object({
  id: IdSchema,
  parent: TagSchema.optional(),
})).describe('InfluencerTag')

export const TagsSchema = z.array(TagSchema)
  .superRefine(getDuplicatesRefinement('InfluencerTag', parseTagUid))

export const TagUidSchema = z.object({
  id: IdSchema,
})

export type TagUid = z.infer<typeof TagUidSchema>

export function parseTag(tag: Tag): Tag {
  return TagSchema.parse(tag)
}

export function parseTags(tags: Tag[]): Tag[] {
  return TagsSchema.parse(tags)
}

export function parseTagUid(tagUid: TagUid): TagUid {
  return TagUidSchema.parse(tagUid)
}

export const isEqualTag = (a: Tag) => (b: Tag) => isEqualBy(a, b, parseTagUid)
