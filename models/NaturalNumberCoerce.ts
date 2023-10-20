import { getArraySchema } from 'libs/utils/zod'
import { equals, identity } from 'remeda'
import { z } from 'zod'

export const NaturalNumberCoerceSchema = z.coerce.number().int().nonnegative().describe('NaturalNumber')

export const NaturalNumberCoercesSchema = getArraySchema(NaturalNumberCoerceSchema, identity)

export type NaturalNumberCoerce = z.infer<typeof NaturalNumberCoerceSchema>

export const parseNaturalNumberCoerce = (num: NaturalNumberCoerce): NaturalNumberCoerce => NaturalNumberCoerceSchema.parse(num)

export const parseNaturalNumberCoerces = (nums: NaturalNumberCoerce[]): NaturalNumberCoerce[] => NaturalNumberCoercesSchema.parse(nums)

export const isEqualNaturalNumberCoerce = equals
