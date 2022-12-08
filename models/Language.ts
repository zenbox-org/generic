import { isEqualByD } from 'libs/utils/lodash'
import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { ISO639CodeSchema } from './ISO639Code'

export const LanguageSchema = z.object({
  name: z.string(),
  iso639Code: ISO639CodeSchema,
}).describe('Language')

export const LanguagesSchema = z.array(LanguageSchema)
  .superRefine(getDuplicatesRefinement('Language', l => l.name))
  .superRefine(getDuplicatesRefinement('Language', l => l.iso639Code))

export const LanguageUidSchema = LanguageSchema.pick({
  iso639Code: true,
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

export const isEqualLanguage = (a: Language) => (b: Language) => isEqualByD(a, b, parseLanguageUid)
