export function spreadName(firstName: string, lastName: string | undefined, nickname: string | undefined) {
  const nameArr = [firstName, lastName]
  return {
    uid: nameArr.join(''),
    name: nameArr.join(' '),
    nickname: nickname || firstName,
  }
}
