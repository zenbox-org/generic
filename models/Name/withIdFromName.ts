import { fromStringToId } from '../Id'
import { Name } from '../Name'

export function withIdFromName<Obj>($object: Obj & { name: Name }) {
  return {
    ...$object,
    id: fromStringToId($object.name),
  }
}
