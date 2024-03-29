import { identity } from 'remeda'
import { z } from 'zod'
import { ensure } from '../../utils/ensure'
import { getArraySchema } from '../../utils/zod'

export const idAllowedSymbols = ['\\w', '\\d', '-', '_', '.', ':']

const idAllowedSymbolsEscapedString = idAllowedSymbols.join('')

const idRegExp = new RegExp(`^[${idAllowedSymbolsEscapedString}]+$`)

const idReplaceUnwantedCharactersRegExp = new RegExp(`[^${idAllowedSymbolsEscapedString}]`, 'g')

export const IdSchema = z.string().min(1).regex(idRegExp).describe('Id')

export const IdsSchema = getArraySchema(IdSchema, identity)

export type Id = z.infer<typeof IdSchema>

export interface WithId { id: Id }

export function validateId(id: Id): Id {
  return IdSchema.parse(id)
}

export function getId<T extends WithId>(object: T) {
  return object.id
}

export function byId(id: Id) {
  return (object: WithId) => object.id === id
}

export function getById<Obj extends WithId>(objects: Obj[], id: Id) {
  return ensure(objects.find(byId(id)), new Error(`Cannot get object by id: ${id}`))
}

export function fromStringToId(string: string): Id {
  return string.replace(idReplaceUnwantedCharactersRegExp, '')
}

export function toSystemId(id: Id) {
  return id.replace(/\s+/g, '_')
}
