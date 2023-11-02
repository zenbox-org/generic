import { IdSchema } from 'libs/generic/models/Id'
import { isEqualByD } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'

/**
 * @deprecated Use libs/tree/models/Node.ts instead
 *
 * Diff(Node, Tag):
 * + name: NameSchema
 * - id: IdSchema
 */
export interface Tag {
  id: string
  parent?: Tag | undefined
}

export const TagSchema: z.ZodSchema<Tag> = z.lazy(() => z.object({
  id: IdSchema,
  parent: TagSchema.optional(),
})).describe('Tag')

export const TagsSchema = getArraySchema(TagSchema, parseTagUid)

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

export const isEqualTag = (a: Tag) => (b: Tag) => isEqualByD(a, b, parseTagUid)
