import { fromStringToId } from '../Id'

export function spreadName(firstName?: string, lastName?: string, nickname?: string, uid?: string) {
  const name = (firstName || lastName) ? `${firstName ?? ''} ${lastName ?? ''}`.trim() : undefined
  return {
    uid: uid || (name && fromStringToId(name)) || (nickname && fromStringToId(nickname)),
    name: name,
    nickname: nickname || firstName,
  }
}
