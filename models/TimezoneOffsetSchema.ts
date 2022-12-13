import { z } from 'zod'

// NOTE: A single timezone has multiple offsets (because of daylight saving strategy)
export const TimezoneOffsetSchema = z.number(/* of minutes */)
  .min(-12 * 60) // https://en.wikipedia.org/wiki/List_of_UTC_time_offsets#UTC%E2%88%9212:00,_Y
  .max(+14 * 60) // https://en.wikipedia.org/wiki/List_of_UTC_time_offsets#UTC+14:00,_M%E2%80%A0

export type TimezoneOffset = z.infer<typeof TimezoneOffsetSchema>
