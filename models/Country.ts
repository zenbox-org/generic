import { IdSchema } from 'libs/generic/models/Id'
import { NotesSchema } from 'libs/generic/models/Notes'
import { isEqualByDC } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'

export const CountrySchema = z.object({
  id: IdSchema,
  notes: NotesSchema,
}).describe('Country')

export const CountrysSchema = getArraySchema(CountrySchema, parseCountryUid)

export const CountryUidSchema = CountrySchema.pick({
  id: true,
})

export type Country = z.infer<typeof CountrySchema>

export type CountryUid = z.infer<typeof CountryUidSchema>

export function parseCountry(country: Country): Country {
  return CountrySchema.parse(country)
}

export function parseCountrys(countrys: Country[]): Country[] {
  return CountrysSchema.parse(countrys)
}

export function parseCountryUid(countryUid: CountryUid): CountryUid {
  return CountryUidSchema.parse(countryUid)
}

export const isEqualCountry = isEqualByDC(parseCountryUid)
