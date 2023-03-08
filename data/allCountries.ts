import { getFinder, getInserter, getName } from 'libs/utils/zod'
import { Country, CountrySchema, parseCountryUid } from '../models/Country'

export const allCountries: Country[] = []

export const addCountry = getInserter(getName(CountrySchema), CountrySchema, parseCountryUid, allCountries)

export const findCountry = getFinder(parseCountryUid, allCountries)

export const RussianFederation = addCountry({
  id: 'RussianFederation',
})

export const Thailand = addCountry({
  id: 'Thailand',
})

export const Indonesia = addCountry({
  id: 'Indonesia',
})

export const France = addCountry({
  id: 'France',
})

export const Ukraine = addCountry({
  id: 'Ukraine',
})
