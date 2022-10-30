import { z } from 'zod'

export const CountrySchema = z.enum([
  'Russian Federation',
  'Thailand',
  'Indonesia',
  'France',
  'Ukraine',
])

export type Country = z.infer<typeof CountrySchema>
