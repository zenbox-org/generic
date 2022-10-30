import { z, ZodType } from 'zod'
import { ProcessSchema } from './Process'
import { PersonSchema } from './Person'
import { TeamSchema } from './Team'
import { ZodTypeDef } from 'zod/lib/types'
import { PausedUntilWrapperSchema, simplify as simplifySnoozable } from '../../process/models/PausedUntilWrapper'

export const ActivityStatusSchema = z.enum(['Completed', 'Rejected', 'Cancelled', 'Postponed'])

export const ActivitySchema = z.object({
  process: ProcessSchema,
  status: ActivityStatusSchema.nullable(),
  result: z.string().nullable(),
  person: PersonSchema.nullable(),
  team: TeamSchema.nullable(),
  notes: z.string().nullable(),
  createdOn: z.date(),
  updatedOn: z.date(),
}).merge(PausedUntilWrapperSchema)

export const ActivitySchemaForRefinement = z.object({
  person: z.unknown(),
  team: z.unknown(),
})

export const withActivitySchemaRefinement = function <Output extends z.output<typeof ActivitySchemaForRefinement>, Def extends ZodTypeDef = ZodTypeDef, Input = Output> (schema: ZodType<Output, Def, Input>) {
  return schema.refine(activity => activity.person || activity.team, 'Required: either person or team')
}

export type Activity = z.infer<typeof ActivitySchema>

export function simplify(activity: Activity) {
  const result = simplifySnoozable(activity)
  return {
    ...result,
    process: activity.process.name || null,
    person: activity.person?.name || null,
    team: activity.team?.name || null,
    createdOn: activity.createdOn.toISOString(),
    updatedOn: activity.updatedOn.toISOString(),
  }
}
