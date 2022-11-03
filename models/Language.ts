import { isEqualBy } from 'zenbox-util/lodash'
import { getDuplicatesRefinement } from 'zenbox-util/zod'
import { z } from 'zod'
import { ISO639CodeSchema } from './ISO639Code'

export const LanguageSchema = z.object({
  name: z.string(),
  iso639Code: ISO639CodeSchema,
}).describe('Language')

export const LanguagesSchema = z.array(LanguageSchema)
  .superRefine(getDuplicatesRefinement('Language', parseLanguageUid))

export const LanguageUidSchema = LanguageSchema.pick({
  name: true,
})

export type Language = z.infer<typeof LanguageSchema>

export type LanguageUid = z.infer<typeof LanguageUidSchema>

export function parseLanguage(language: Language): Language {
  return LanguageSchema.parse(language)
}

export function parseLanguages(languages: Language[]): Language[] {
  return LanguagesSchema.parse(languages)
}

export function parseLanguageUid(languageUid: LanguageUid): LanguageUid {
  return LanguageUidSchema.parse(languageUid)
}

export const isEqualLanguage = (a: Language) => (b: Language) => isEqualBy(a, b, parseLanguageUid)
