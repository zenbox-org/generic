import { HourNumbers, IANAZone, WeekdayNumbers } from 'luxon'
import { strict as assert } from 'assert'
import { parseDateTimeFilter } from '../DateTimeFilter'
import { Timezone } from '../TimezoneSchema'
import { Friday, Monday, Saturday, Sunday } from 'libs/utils/date.constant'

export function hoursDaysDateTimeFilter(fromHour: HourNumbers, toHour: HourNumbers, fromDay: WeekdayNumbers, toDay: WeekdayNumbers, timezone: Timezone) {
  assert(IANAZone.isValidZone(timezone))
  return parseDateTimeFilter({
    weekday: { from: fromDay, to: toDay, fromInclusive: true, toInclusive: true },
    hour: { from: fromHour, to: toHour, fromInclusive: true, toInclusive: false },
    timezone,
  })
}

export function workHoursDateTimeFilter(fromHour: HourNumbers, toHour: HourNumbers, timezone: Timezone) {
  return hoursDaysDateTimeFilter(fromHour, toHour, Monday, Friday, timezone)
}

export function workdayDateTimeFilter(timezone: Timezone) {
  return hoursDaysDateTimeFilter(9, 18, Monday, Friday, timezone)
}

export function weekendDateTimeFilter(timezone: Timezone) {
  return hoursDaysDateTimeFilter(1, 23, Saturday, Sunday, timezone)
}
