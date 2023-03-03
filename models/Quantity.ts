import { BigNumber } from 'libs/utils/BigNumber.utils'
import { isEqualByD } from 'libs/utils/lodash'
import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { Conversion, ConversionSchema } from './Conversion'

export const QuantitySchema = z.object({
  value: z.instanceof(BigNumber),
  conversion: ConversionSchema,
}).describe('Quantity')

export const QuantitiesSchema = z.array(QuantitySchema)
  .superRefine(getDuplicatesRefinement('Quantity', parseQuantityUid))

export const QuantityUidSchema = QuantitySchema.pick({
  value: true,
}).extend({
  conversion: ConversionSchema.pick({
    to: true,
  }),
})

export type Quantity = z.infer<typeof QuantitySchema>

export type QuantityUid = z.infer<typeof QuantityUidSchema>

export function parseQuantity(quantity: Quantity): Quantity {
  return QuantitySchema.parse(quantity)
}

export function parseQuantities(quantities: Quantity[]): Quantity[] {
  return QuantitiesSchema.parse(quantities)
}

export function parseQuantityUid(quantityUid: QuantityUid): QuantityUid {
  return QuantityUidSchema.parse(quantityUid)
}

export const isEqualQuantity = (a: Quantity) => (b: Quantity) => isEqualByD(a, b, parseQuantityUid)

export function quantity(value: BigNumber.Value, conversion: Conversion) {
  return parseQuantity({ value: new BigNumber(value), conversion })
}

export function quantities(inputs: [BigNumber.Value, Conversion][]) {
  return inputs.map(input => quantity(...input))
}
