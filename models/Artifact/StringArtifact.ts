import { z } from 'zod'
import { toUidFromSchema } from 'zenbox-util/uid'
import { getDuplicatesRefinement } from 'zenbox-util/zod'
import { GenericArtifactSchema, GenericArtifactUidSchema } from './GenericArtifact'

export const StringArtifactSchema = GenericArtifactSchema.extend({
  type: z.literal('StringArtifact'),
  value: z.string(),
})

export const StringArtifactsSchema = z.array(StringArtifactSchema)
  .superRefine(getDuplicatesRefinement('Artifact', getStringArtifactUid))

export const StringArtifactUidSchema = GenericArtifactUidSchema

export type StringArtifact = z.infer<typeof StringArtifactSchema>

export type StringArtifactUid = z.infer<typeof StringArtifactUidSchema>

export function validateStringArtifact(artifact: StringArtifact): StringArtifact {
  return StringArtifactSchema.parse(artifact)
}

export function validateStringArtifacts(artifacts: StringArtifact[]): StringArtifact[] {
  return StringArtifactsSchema.parse(artifacts)
}

export function getStringArtifactUid(artifactUid: StringArtifactUid) {
  return toUidFromSchema(artifactUid, StringArtifactUidSchema)
}
