import { PrevNextMaybe } from '../PrevNext'

export function toPrevNextMaybePairs<T>(objects: T[]): PrevNextMaybe<T>[] {
  return objects.map((object, index) => ({
    prev: objects[index - 1],
    next: object,
  }))
}
