import { equals, identity } from 'remeda'
import { z } from 'zod'
import { isEqualByD, isEqualDC } from '../../utils/lodash'
import { todo } from '../../utils/todo'
import { Mapper } from './Mapper'

export type Filter<Val> = (value: Val) => boolean

export type FilterP<Val> = (value: Val) => Promise<boolean>

export type FilterOptional<Val> = (value: Val) => boolean | undefined

export type FilterOptionalP<Val> = (value: Val) => Promise<boolean | undefined>

export const AlwaysTrue = <Val>(value: Val) => true

export const AlwaysTrueP = async <Val>(value: Val) => true

export const TodoFilter = <Val>(value: Val): boolean => { return todo() }

export const TodoFilterP = async <Val>(value: Val): Promise<boolean> => { return todo() }

export const getStaticFilterP = <Val>(value: Val) => async ($value: Val) => equals(value, $value)

export const getStaticFilterByP = <Val, CmpVal>(value: Val, mapper: Mapper<Val, CmpVal>) => async ($value: Val) => isEqualByD(value, $value, mapper)

export const getStaticMultiFilter = <Val>(values: Val[]) => async ($value: Val) => values.find(isEqualDC($value)) !== undefined

export const allFiltersPassedP = <Obj>(filters: FilterP<Obj>[]) => async (obj: Obj) => (await Promise.all(filters.map(f => f(obj)))).every(identity)

export const allFiltersPassed = <Obj>(filters: Filter<Obj>[]) => (obj: Obj) => filters.map(f => f(obj)).every(identity)

export const toFilter = <In, Out>(getter: (input: In) => Out) => (input: In) => Boolean(getter(input))

export const toFilterP = <In, Out>(getter: (input: In) => Promise<Out>) => async (input: In) => Boolean(await getter(input))

export const not = <Val>(filter: Filter<Val>): Filter<Val> => (value: Val) => !filter(value)

export const notP = <Val>(filter: FilterP<Val>): FilterP<Val> => async (value: Val) => !(await filter(value))

export const and = <Val>(filters: Filter<Val>[]): Filter<Val> => (value: Val) => filters.every(filter => filter(value))

export const or = <Val>(filters: Filter<Val>[]): Filter<Val> => (value: Val) => filters.some(filter => filter(value))

export const without = <T>(objects: T[], filters: Filter<T>[]) => objects.every(a => !filters.some(f => f(a)))

export const only = <T>(objects: T[], filters: Filter<T>[]) => objects.every(a => filters.some(f => f(a)))

export function getFilterStubP(name: string) {
  // const obj = { [name]: UnimplementedFilter }
  // return obj[name]
  return TodoFilterP
}

export function getFilterStubsP(names: string[]) {
  return names.map(getFilterStubP)
}

export const BooleanFilterSchema = z.function().args(z.boolean()).returns(z.boolean())

export type BooleanFilter = z.infer<typeof BooleanFilterSchema>
