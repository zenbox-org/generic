import { PrevNextMaybe } from '../PrevNext'

export function toPrevNextMaybePairs<T>(objects: T[]): PrevNextMaybe<T>[] {
  return objects.map((o, i) => ({
    prev: objects[i - 1],
    next: objects[i],
  }))
}
