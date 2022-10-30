import { z } from 'zod'
import { getDuplicatesRefinement } from 'zenbox-util/zod'
import { identity } from 'lodash-es'

export const getTagUid = identity

export const TagSchema = z.string().min(1).regex(/^[\w\d]+$/)

export const TagsSchema = z.array(TagSchema)
  .default([])
  .superRefine(getDuplicatesRefinement('Tag', getTagUid))

export type Tag = z.infer<typeof TagSchema>

export function validateTag(tag: Tag): Tag {
  return TagSchema.parse(tag)
}

export function validateTags(tags: Tag[]): Tag[] {
  return TagsSchema.parse(tags)
}
