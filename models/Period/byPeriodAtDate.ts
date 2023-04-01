import { Period } from '../Period'

export const byPeriodAtDate = (period: Period) => (object: { date: Date }) => {
  return object.date >= period.from && object.date < period.to
}

export const byPeriod = (period: Period) => (object: Period) => {
  return object.from >= period.from && object.to <= period.to
}
