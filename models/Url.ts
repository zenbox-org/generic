import { z } from 'zod'
import { getDuplicatesRefinement } from 'zenbox-util/zod'
import { isEqualBy } from 'zenbox-util/lodash'

export const UrlSchema = z.string().url().min(1).describe('Url')

export const UrlsSchema = z.array(UrlSchema)
  .superRefine(getDuplicatesRefinement('Url', parseUrlUid))

export const UrlUidSchema = UrlSchema

export type Url = z.infer<typeof UrlSchema>

export type UrlUid = z.infer<typeof UrlUidSchema>

export function parseUrl(url: Url): Url {
  return UrlSchema.parse(url)
}

export function parseUrls(urls: Url[]): Url[] {
  return UrlsSchema.parse(urls)
}

export function parseUrlUid(urlUid: UrlUid): UrlUid {
  return UrlUidSchema.parse(urlUid)
}

export const isEqualUrl = (a: Url) => (b: Url) => isEqualBy(a, b, parseUrlUid)
