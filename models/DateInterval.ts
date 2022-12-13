import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'

export const DateIntervalSchema = z.object({
  from: z.date(),
  to: z.date(),
})

export const DateIntervalsSchema = z.array(DateIntervalSchema)
  .superRefine(getDuplicatesRefinement('DateInterval', parseDateIntervalUid))

export const DateIntervalUidSchema = DateIntervalSchema

export type DateInterval = z.infer<typeof DateIntervalSchema>

export type DateIntervalUid = z.infer<typeof DateIntervalUidSchema>

export function parseDateInterval(interval: DateInterval): DateInterval {
  return DateIntervalSchema.parse(interval)
}

export function parseDateIntervals(intervals: DateInterval[]): DateInterval[] {
  return DateIntervalsSchema.parse(intervals)
}

export function parseDateIntervalUid(intervalUid: DateIntervalUid): DateIntervalUid {
  return DateIntervalUidSchema.parse(intervalUid)
}
