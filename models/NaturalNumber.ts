import { getArraySchema } from 'libs/utils/zod'
import { equals, identity } from 'remeda'
import { z } from 'zod'

export const NaturalNumberSchema = z.number().int().nonnegative().describe('NaturalNumber')

export const NaturalNumbersSchema = getArraySchema(NaturalNumberSchema, identity)

export type NaturalNumber = z.infer<typeof NaturalNumberSchema>

export const parseNaturalNumber = (num: NaturalNumber): NaturalNumber => NaturalNumberSchema.parse(num)

export const parseNaturalNumbers = (nums: NaturalNumber[]): NaturalNumber[] => NaturalNumbersSchema.parse(nums)

export const isEqualNaturalNumber = equals
