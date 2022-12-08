import { z } from 'zod'
import { toUidFromSchema } from 'libs/utils/uid'
import { getDuplicatesRefinement } from 'libs/utils/zod'
import { GenericArtifactSchema, GenericArtifactUidSchema } from './GenericArtifact'

export const BooleanArtifactSchema = GenericArtifactSchema.extend({
  type: z.literal('BooleanArtifact'),
  value: z.boolean(),
})

export const BooleanArtifactsSchema = z.array(BooleanArtifactSchema)
  .superRefine(getDuplicatesRefinement('Artifact', getBooleanArtifactUid))

export const BooleanArtifactUidSchema = GenericArtifactUidSchema

export type BooleanArtifact = z.infer<typeof BooleanArtifactSchema>

export type BooleanArtifactUid = z.infer<typeof BooleanArtifactUidSchema>

export function validateBooleanArtifact(artifact: BooleanArtifact): BooleanArtifact {
  return BooleanArtifactSchema.parse(artifact)
}

export function validateBooleanArtifacts(artifacts: BooleanArtifact[]): BooleanArtifact[] {
  return BooleanArtifactsSchema.parse(artifacts)
}

export function getBooleanArtifactUid(artifactUid: BooleanArtifactUid) {
  return toUidFromSchema(artifactUid, BooleanArtifactUidSchema)
}
