import { escape } from 'zenbox-util/regexp'
import { getDuplicatesRefinement } from 'zenbox-util/zod'
import { z } from 'zod'
import { Protocol, ProtocolSchema } from './Protocol'

export const ContactPathSchema = z.string().min(1).transform(c => c.trim())

export type ContactPath = z.infer<typeof ContactPathSchema>

/**
 * Note: z.string().url() is relaxed: it supports mailto: and tel: protocols with arbitrary data after protocol
 */
export const ContactSchema = z.string().url().min(1).describe('Contact')

export const ContactsSchema = z.array(ContactSchema)
  .superRefine(getDuplicatesRefinement('Contact', parseContactUid))

export const ContactUidSchema = ContactSchema

export type Contact = z.infer<typeof ContactSchema>

export type ContactUid = z.infer<typeof ContactUidSchema>

export function parseContact(contact: Contact): Contact {
  return ContactSchema.parse(contact)
}

export function parseContacts(contacts: Contact[]): Contact[] {
  return ContactsSchema.parse(contacts)
}

export function parseContactUid(contactUid: ContactUid): ContactUid {
  return ContactUidSchema.parse(contactUid)
}

export const ContactRegex = new RegExp(`^(?:${ProtocolSchema.options.map(escape).join('|')}):`)

export interface Contactable {
  contacts: Contact[]
}

export function getContact(contactable: Contactable, protocol: Protocol) {
  return contactable.contacts.find(c => c.startsWith(protocol))
}

export function getEmail(contactable: Contactable) {
  return getContact(contactable, ProtocolSchema.enum.mailto)?.replace('mailto:', '')
}

export function getContactDisplayValue(contact: Contact) {
  const url = new URL(contact)
  const protocol = url.protocol.replace(':', '')
  switch (protocol) {
    case 'http':
    case 'https':
    case 'ftp':
      return contact
    default:
      // most contacts have a ${protocol}:${key} format (e.g. mailto:example@example.com, or tel://+123456789)
      return contact.split(':')[1].replace(/^\/\//, '')
  }
}

export function mailto(email: string) {
  return parseContact(`mailto:${email}`)
}

export function tel(phone: string) {
  return parseContact(`tel://${phone}`)
}
