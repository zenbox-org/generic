import { z } from 'zod'

export const NumberIntervalSchema = z.object({
  from: z.number(),
  to: z.number(),
  fromInclusive: z.boolean(),
  toInclusive: z.boolean(),
})

export type NumberInterval = z.infer<typeof NumberIntervalSchema>

export function interval(from: number, to: number, fromInclusive: boolean, toInclusive: boolean): NumberInterval {
  return NumberIntervalSchema.parse({ from, to, fromInclusive, toInclusive })
}

export function contains(interval: NumberInterval, value: number) {
  const fromContains = interval.from < value || interval.fromInclusive && interval.from === value
  const toContains = interval.to > value || interval.toInclusive && interval.to === value
  return fromContains && toContains
}
