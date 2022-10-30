import { Tally } from '../Tally'
import { isEqual } from 'lodash-es'
import { BigNumber } from 'zenbox-util/bignumber'

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
