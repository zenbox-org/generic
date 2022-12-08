import { z } from 'zod'
import { ensure } from 'libs/utils/ensure'

export const OriginalSlugSchema = z.string().min(1)

export type OriginalSlug = z.infer<typeof OriginalSlugSchema>

export interface WithOriginalSlug { originalSlug: OriginalSlug }

export function validateExternalSlug(externalSlug: OriginalSlug): OriginalSlug {
  return OriginalSlugSchema.parse(externalSlug)
}

export function byOriginalSlug(originalSlug: OriginalSlug) {
  return (object: WithOriginalSlug) => object.originalSlug === originalSlug
}

export function getByOriginalSlug<Obj extends WithOriginalSlug>(objects: Obj[], originalSlug: OriginalSlug) {
  return ensure(objects.find(byOriginalSlug(originalSlug)), new Error(`Cannot get object by slug: ${originalSlug}`))
}
