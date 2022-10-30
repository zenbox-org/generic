import { Contact, Contactable, getContactDisplayValue } from '../Contact'
import { renderMDLine, renderMDList } from '../../../markdown/renderMDList'

export function renderContactMD(contact: Contact) {
  return `[${getContactDisplayValue(contact)}](${contact})`
}

export function renderContactsMDLine(contacts: Contact[]) {
  return renderMDLine(contacts, renderContactMD)
}

export function renderContactsMDList(contacts: Contact[]) {
  return renderMDList(contacts, renderContactMD)
}

export function renderContactsMDListOf(contactable: Contactable) {
  return renderContactsMDList(contactable.contacts)
}
