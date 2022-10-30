import { Amount } from '../../finance/models/Amount'

export type Tally<Key, Value> = { key: Key, value: Value }

export type AmountTally<Key> = Tally<Key, Amount>
