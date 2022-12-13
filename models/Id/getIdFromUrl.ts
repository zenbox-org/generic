import { fromStringToId } from '../Id'
import { Url } from '../Url'

/**
 * @deprecated
 */
export function getIdFromUrl(url: Url) {
  const $url = new URL(url)
  const parts = [
    ...$url.hostname.split('.'),
    ...$url.pathname.split('/'),
  ]
  return fromStringToId(parts.join('_'))
}
