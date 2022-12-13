import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { UrlSchema } from '../Url'
import { GenericArtifactSchema, GenericArtifactUidSchema } from './GenericArtifact'

export const UrlArtifactSchema = GenericArtifactSchema.extend({
  type: z.literal('UrlArtifact'),
  value: UrlSchema.optional(), // may be undefined if the artifact is not finished
})

export const UrlArtifactsSchema = z.array(UrlArtifactSchema)
  .superRefine(getDuplicatesRefinement('Artifact', getUrlArtifactUid))

export const UrlArtifactUidSchema = GenericArtifactUidSchema

export type UrlArtifact = z.infer<typeof UrlArtifactSchema>

export type UrlArtifactUid = z.infer<typeof UrlArtifactUidSchema>

type UrlArtifactWithoutType = Omit<UrlArtifact, 'type'>

export function validateUrlArtifact(artifact: UrlArtifactWithoutType): UrlArtifact {
  return UrlArtifactSchema.parse({ ...artifact, type: 'UrlArtifact' })
}

export function validateUrlArtifacts(artifacts: UrlArtifactWithoutType[]): UrlArtifact[] {
  return UrlArtifactsSchema.parse(artifacts.map(artifact => ({ ...artifact, type: 'UrlArtifact' })))
}

export function getUrlArtifactUid(artifactUid: UrlArtifactUid) {
  return UrlArtifactUidSchema.parse(artifactUid)
}
