import { getFinder, getInserter } from 'zenbox-util/zod'
import { Language, LanguageSchema, parseLanguageUid } from '../models/Language'

export const allLanguages: Language[] = []

export const addLanguage = getInserter('Language', LanguageSchema, parseLanguageUid, allLanguages)

export const findLanguage = getFinder(parseLanguageUid, allLanguages)

export const English = addLanguage({
  name: 'English',
  iso639Code: 'en',
})

export const Russian = addLanguage({
  name: 'Russian',
  iso639Code: 'ru',
})

export const Ukrainian = addLanguage({
  name: 'Ukrainian',
  iso639Code: 'uk',
})

export const Romanian = addLanguage({
  name: 'Romanian',
  iso639Code: 'ro',
})
