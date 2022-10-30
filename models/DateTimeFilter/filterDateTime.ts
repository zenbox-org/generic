import { DateTime } from 'luxon'
import { DateTimeFilter } from '../DateTimeFilter'
import { contains } from '../NumberInterval'

export function filterDateTime(filter: DateTimeFilter, $datetime: DateTime) {
  const datetime = $datetime.setZone(filter.timezone)
  const keys = Object.keys(filter).filter(k => k !== 'timezone') as Array<Exclude<keyof DateTimeFilter, 'timezone'>>
  for (const key of keys) {
    const interval = filter[key]
    if (!interval) continue
    if (!contains(interval, datetime[key])) return false
  }
  return true
}
