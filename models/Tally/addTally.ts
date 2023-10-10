import { BigNumber } from 'libs/utils/BigNumber/utils'
import { equals } from 'remeda'
import { Tally } from '../Tally'

export function addTallyNumber<Key>(tallies: Tally<Key, number>[], key: Key, value: number) {
  const index = tallies.findIndex(s => equals(s.key, key))
  const tally = tallies[index]
  if (tally) {
    tally.value += value
  } else {
    tallies.push({ key, value })
  }
  return tallies
}

export function addTallyBigNumber<Key>(tallies: Tally<Key, BigNumber>[], key: Key, value: BigNumber) {
  const index = tallies.findIndex(s => equals(s.key, key))
  const tally = tallies[index]
  if (tally) {
    tally.value = tally.value.plus(value)
  } else {
    tallies.push({ key, value })
  }
  return tallies
}
