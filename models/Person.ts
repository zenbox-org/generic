import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { ContactSchema } from './Contact'
import { IdSchema } from './Id'

export const PersonSchema = z.object({
  uid: IdSchema,
  name: z.string().min(1),
  contacts: z.array(ContactSchema),
}).describe('Person')

export const PersonsSchema = z.array(PersonSchema)
  .superRefine(getDuplicatesRefinement('Person', parsePersonUid))

export const PersonUidSchema = PersonSchema.pick({
  uid: true,
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
