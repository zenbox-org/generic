import { expect } from 'libs/utils/chai'
import { substitutionRegExp, UrlPattern } from '../UrlPattern'

export function replaceUrlPattern(pattern: UrlPattern, replacements: Record<string, string>) {
  const entries = Object.entries(replacements)
  const result = entries.reduce((pattern, [search, replace]) => {
    return pattern.replace(`{{${search}}}`, replace)
  }, pattern)
  expect(result).not.to.match(substitutionRegExp) // should not contain non-replaced substitutions
  return result
}
