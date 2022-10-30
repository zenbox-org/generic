import { Period } from '../Period'

export const byPeriodAtDate = (period: Period) => (object: { date: Date }) => {
  return object.date >= period.from && object.date < period.to
}
