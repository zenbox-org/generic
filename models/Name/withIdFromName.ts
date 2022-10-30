import { Name } from '../Name'
import { fromStringToId } from '../Id'

export function withIdFromName<Obj>($object: Obj & { name: Name }) {
  return {
    ...$object,
    id: fromStringToId($object.name),
  }
}
