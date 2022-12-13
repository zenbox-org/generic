import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'

/**
 * including from, excluding to
 */
export const PeriodSchema = z.object({
  from: z.date(),
  to: z.date(),
})

export const PeriodsSchema = z.array(PeriodSchema)
  .superRefine(getDuplicatesRefinement('Period', getPeriodUid))

export const PeriodUidSchema = PeriodSchema.pick({
  from: true,
  to: true,
})

export type Period = z.infer<typeof PeriodSchema>

export type PeriodUid = z.infer<typeof PeriodUidSchema>

export function validatePeriod(period: Period): Period {
  return PeriodSchema.parse(period)
}

export function validatePeriods(periods: Period[]): Period[] {
  return PeriodsSchema.parse(periods)
}

export function getPeriodUid(periodUid: PeriodUid) {
  return PeriodUidSchema.parse(periodUid)
}
