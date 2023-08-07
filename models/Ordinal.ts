import { getArraySchema } from 'libs/utils/zod'
import { identity } from 'remeda'
import { z } from 'zod'
import { isEqualSC } from '../../utils/lodash'

export const OrdinalSchema = z.number().positive().describe('Ordinal')

export const OrdinalsSchema = getArraySchema(OrdinalSchema, identity)

export type Ordinal = z.infer<typeof OrdinalSchema>

export const parseOrdinal = (ordinal: Ordinal): Ordinal => OrdinalSchema.parse(ordinal)

export const parseOrdinals = (s: Ordinal[]): Ordinal[] => OrdinalsSchema.parse(s)

export const isEqualOrdinal = isEqualSC
