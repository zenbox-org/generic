import { z } from 'zod'
import { ContactSchema } from './Contact'
import { CodaRowSchema } from '../../coda/models/CodaRow'
import { PersonSchema } from './Person'
import { ProposalStatusSchema } from './Proposal'

export const PersonProcessSchema = z.object({
  person: PersonSchema,

})

export const PersonFromCodaSchema = PersonSchema.extend({ $row: CodaRowSchema })

export type Person = z.infer<typeof PersonSchema>

export type PersonFromCoda = z.infer<typeof PersonFromCodaSchema>
