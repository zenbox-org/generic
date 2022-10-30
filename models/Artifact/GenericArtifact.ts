import { z } from 'zod'
import { getDuplicatesRefinement } from 'zenbox-util/zod'
import { IdSchema } from '../Id'

export const GenericArtifactSchema = z.object({
  id: IdSchema,
  notes: z.string().optional(),
  // isFinished: z.boolean(), // not needed because artifact.isFinished === isDefined(artifact.value)
  createdBy: IdSchema,
  createdOn: z.date(),
  pausedUntil: z.date().optional(),
})

export const GenericArtifactsSchema = z.array(GenericArtifactSchema)
  .superRefine(getDuplicatesRefinement('GenericArtifact', parseGenericArtifactUid))

export const GenericArtifactUidSchema = GenericArtifactSchema.pick({
  id: true,
})

export type GenericArtifact = z.infer<typeof GenericArtifactSchema>

export type GenericArtifactUid = z.infer<typeof GenericArtifactUidSchema>

export function parseGenericArtifact(artifact: GenericArtifact): GenericArtifact {
  return GenericArtifactSchema.parse(artifact)
}

export function parseGenericArtifacts(artifacts: GenericArtifact[]): GenericArtifact[] {
  return GenericArtifactsSchema.parse(artifacts)
}

export function parseGenericArtifactUid(artifactUid: GenericArtifactUid): GenericArtifactUid {
  return GenericArtifactUidSchema.parse(artifactUid)
}
