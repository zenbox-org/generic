import { z } from 'zod'
import { getDuplicatesRefinement } from 'libs/utils/zod'
import { UrlSchema } from './Url'

export const substitutionRegExp = /\{\{[^}]+\}\}/

export const UrlPatternSchema = UrlSchema.regex(substitutionRegExp)

export const UrlPatternsSchema = z.array(UrlPatternSchema)
  .superRefine(getDuplicatesRefinement('UrlPattern', parseUrlPatternUid))

export const UrlPatternUidSchema = UrlSchema

export type UrlPattern = z.infer<typeof UrlPatternSchema>

export type UrlPatternUid = z.infer<typeof UrlPatternUidSchema>

export function parseUrlPattern(urlPattern: UrlPattern): UrlPattern {
  return UrlPatternSchema.parse(urlPattern)
}

export function parseUrlPatterns(urlPatterns: UrlPattern[]): UrlPattern[] {
  return UrlPatternsSchema.parse(urlPatterns)
}

export function parseUrlPatternUid(urlPatternUid: UrlPatternUid): UrlPatternUid {
  return UrlPatternUidSchema.parse(urlPatternUid)
}
