import { z } from 'zod'
import { NumberIntervalSchema } from './NumberInterval'
import { getDuplicatesRefinement } from 'libs/utils/zod'
import { TimezoneSchema } from './TimezoneSchema'

// Instance members of [DateTime](https://moment.github.io/luxon/api-docs/index.html#datetime)
export const DateTimeFilterSchema = z.object({
  weekday: NumberIntervalSchema.optional(), // 1-7, where 1 is Monday and 7 is Sunday
  day: NumberIntervalSchema.optional(), // 1-30
  hour: NumberIntervalSchema.optional(),
  minute: NumberIntervalSchema.optional(),
  second: NumberIntervalSchema.optional(),
  timezone: TimezoneSchema,
}).describe('DateTimeFilter')

export const DateTimeFiltersSchema = z.array(DateTimeFilterSchema)
  .superRefine(getDuplicatesRefinement('DateTimeFilter', parseDateTimeFilterUid))

export const DateTimeFilterUidSchema = DateTimeFilterSchema

export type DateTimeFilter = z.infer<typeof DateTimeFilterSchema>

export type DateTimeFilterUid = z.infer<typeof DateTimeFilterUidSchema>

export function parseDateTimeFilter(dateTimeFilter: DateTimeFilter): DateTimeFilter {
  return DateTimeFilterSchema.parse(dateTimeFilter)
}

export function parseDateTimeFilters(dateTimeFilters: DateTimeFilter[]): DateTimeFilter[] {
  return DateTimeFiltersSchema.parse(dateTimeFilters)
}

export function parseDateTimeFilterUid(dateTimeFilterUid: DateTimeFilterUid): DateTimeFilterUid {
  return DateTimeFilterUidSchema.parse(dateTimeFilterUid)
}
