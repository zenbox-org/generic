import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { ContactSchema } from './Contact'
import { IdSchema } from './Id'
import { NameSchema } from './Name'
import { NotesSchema } from './Notes'

export const PersonSchema = z.object({
  id: IdSchema,
  name: NameSchema,
  contacts: z.array(ContactSchema),
  notes: NotesSchema,
}).describe('Person')

export const PersonsSchema = z.array(PersonSchema)
  .superRefine(getDuplicatesRefinement('Person', parsePersonUid))

export const PersonUidSchema = PersonSchema.pick({
  id: true,
})

export type Person = z.infer<typeof PersonSchema>

export type PersonUid = z.infer<typeof PersonUidSchema>

export function parsePerson(person: Person): Person {
  return PersonSchema.parse(person)
}

export function parsePersons(persons: Person[]): Person[] {
  return PersonsSchema.parse(persons)
}

export function parsePersonUid(personUid: PersonUid): PersonUid {
  return PersonUidSchema.parse(personUid)
}
