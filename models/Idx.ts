import { isEqualSC } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { identity } from 'remeda'
import { z } from 'zod'

export const IdxSchema = z.number().nonnegative().describe('Idx')

export const IdxesSchema = getArraySchema(IdxSchema, identity)

export type Idx = z.infer<typeof IdxSchema>

export const parseIdx = (idx: Idx): Idx => IdxSchema.parse(idx)

export const parseIdxes = (s: Idx[]): Idx[] => IdxesSchema.parse(s)

export const isEqualIdx = isEqualSC
