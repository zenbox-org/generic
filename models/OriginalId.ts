import { z } from 'zod'
import { ensure } from 'libs/utils/ensure'

export const OriginalIdSchema = z.string().min(1)

export type OriginalId = z.infer<typeof OriginalIdSchema>

export interface WithOriginalId { originalId: OriginalId }

export function validateExternalId(externalId: OriginalId): OriginalId {
  return OriginalIdSchema.parse(externalId)
}

export function byOriginalId(originalId: OriginalId) {
  return (object: WithOriginalId) => object.originalId === originalId
}

export function getByOriginalId<Obj extends WithOriginalId>(objects: Obj[], originalId: OriginalId) {
  return ensure(objects.find(byOriginalId(originalId)), new Error(`Cannot get object by id: ${originalId}`))
}
