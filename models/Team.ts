import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { IdSchema } from './Id'
import { NameSchema } from './Name'
import { NotesSchema } from './Notes'

export const TeamSchema = z.object({
  uid: IdSchema,
  name: NameSchema,
  notes: NotesSchema,
}).describe('Team')

export const TeamsSchema = z.array(TeamSchema)
  .superRefine(getDuplicatesRefinement('Team', parseTeamUid))

export const TeamUidSchema = TeamSchema.pick({
  uid: true,
})

export type Team = z.infer<typeof TeamSchema>

export type TeamUid = z.infer<typeof TeamUidSchema>

export function parseTeam(team: Team): Team {
  return TeamSchema.parse(team)
}

export function parseTeams(teams: Team[]): Team[] {
  return TeamsSchema.parse(teams)
}

export function parseTeamUid(teamUid: TeamUid): TeamUid {
  return TeamUidSchema.parse(teamUid)
}
