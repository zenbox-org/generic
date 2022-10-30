import { z } from 'zod'
import { Id } from './Id'

export const PhysicalArtifactSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
})

export type PhysicalArtifact = z.infer<typeof PhysicalArtifactSchema>

export function validatePhysicalArtifact(artifact: PhysicalArtifact) {
  return PhysicalArtifactSchema.parse(artifact)
}

export function getPhysicalArtifactUid(artifact: PhysicalArtifact): Id {
  return artifact.name
}
