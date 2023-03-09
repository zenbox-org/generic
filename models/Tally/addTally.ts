import { BigNumber } from 'libs/utils/BigNumber/utils'
import { isEqual } from 'lodash-es'
import { Tally } from '../Tally'

export function addTallyNumber<Key>(tallies: Tally<Key, number>[], key: Key, value: number) {
  const index = tallies.findIndex(s => isEqual(s.key, key))
  if (~index) {
    tallies[index].value += value
  } else {
    tallies.push({ key, value })
  }
  return tallies
}

export function addTallyBigNumber<Key>(tallies: Tally<Key, BigNumber>[], key: Key, value: BigNumber) {
  const index = tallies.findIndex(s => isEqual(s.key, key))
  if (~index) {
    tallies[index].value = tallies[index].value.plus(value)
  } else {
    tallies.push({ key, value })
  }
  return tallies
}
