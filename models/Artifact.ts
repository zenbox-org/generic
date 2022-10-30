import { z } from 'zod'
import { getDuplicatesRefinement } from 'zenbox-util/zod'
import { UrlArtifactSchema } from './Artifact/UrlArtifact'
import { BooleanArtifactSchema } from './Artifact/BooleanArtifact'
import { GenericArtifactUidSchema } from './Artifact/GenericArtifact'

export const ArtifactSchema = z.union([UrlArtifactSchema, BooleanArtifactSchema])

export const ArtifactsSchema = z.array(ArtifactSchema)
  .superRefine(getDuplicatesRefinement('Artifact', parseArtifactUid))

export const ArtifactUidSchema = GenericArtifactUidSchema

export type Artifact = z.infer<typeof ArtifactSchema>

export type ArtifactUid = z.infer<typeof ArtifactUidSchema>

export function parseArtifact(artifact: Artifact): Artifact {
  return ArtifactSchema.parse(artifact)
}

export function parseArtifacts(artifacts: Artifact[]): Artifact[] {
  return ArtifactsSchema.parse(artifacts)
}

export function parseArtifactUid(artifactUid: ArtifactUid): ArtifactUid {
  return ArtifactUidSchema.parse(artifactUid)
}
