import { BigNumber } from 'libs/utils/bignumber'
import { isEqualByD } from 'libs/utils/lodash'
import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { NameSchema } from './Name'

/**
 * Allows defining unit conversion (e.g. from km to m)
 *
 * @see QuantitySchema
 */
export const ConversionSchema = z.object({
  from: NameSchema,
  to: NameSchema,
  multiplier: z.instanceof(BigNumber),
}).describe('Conversion')

export const ConversionsSchema = z.array(ConversionSchema)
  .superRefine(getDuplicatesRefinement('Conversion', parseConversionUid))

export const ConversionUidSchema = ConversionSchema.pick({
  from: true,
  to: true,
})

export type Conversion = z.infer<typeof ConversionSchema>

export type ConversionUid = z.infer<typeof ConversionUidSchema>

export function parseConversion(conversion: Conversion): Conversion {
  return ConversionSchema.parse(conversion)
}

export function parseConversions(conversions: Conversion[]): Conversion[] {
  return ConversionsSchema.parse(conversions)
}

export function parseConversionUid(conversionUid: ConversionUid): ConversionUid {
  return ConversionUidSchema.parse(conversionUid)
}

export const isEqualConversion = (a: Conversion) => (b: Conversion) => isEqualByD(a, b, parseConversionUid)
