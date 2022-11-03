import { fromStringToId } from '../Id'

export function spreadName(firstName?: string, lastName?: string, nickname?: string, uid?: string) {
  const name = `${firstName} ${lastName}`
  return {
    uid: uid || fromStringToId(name),
    name,
    nickname: nickname || firstName,
  }
}
