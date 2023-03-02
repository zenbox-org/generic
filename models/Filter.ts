import { equals, identity } from 'remeda'
import { z } from 'zod'
import { isEqualByD, isEqualDC } from '../../utils/lodash'
import { todo } from '../../utils/todo'
import { Mapper } from './Mapper'

export type Filter<Opt> = (option: Opt) => boolean

export type FilterP<Opt> = (option: Opt) => Promise<boolean>

export const AlwaysTrue = <Opt>(option: Opt) => true

export const AlwaysTrueP = async <Opt>(option: Opt) => true

export const TodoFilter = <Opt>(option: Opt): boolean => { return todo() }

export const TodoFilterP = async <Opt>(option: Opt): Promise<boolean> => { return todo() }

export const getStaticFilterP = <Opt>(option: Opt) => async ($option: Opt) => equals(option, $option)

export const getStaticFilterByP = <Opt, CmpOpt>(option: Opt, mapper: Mapper<Opt, CmpOpt>) => async ($option: Opt) => isEqualByD(option, $option, mapper)

export const getStaticMultiFilter = <Opt>(options: Opt[]) => async ($option: Opt) => options.find(isEqualDC($option)) !== undefined

export const allFiltersPassedP = <Obj>(filters: FilterP<Obj>[]) => async (obj: Obj) => (await Promise.all(filters.map(f => f(obj)))).every(identity)

export const allFiltersPassed = <Obj>(filters: Filter<Obj>[]) => (obj: Obj) => filters.map(f => f(obj)).every(identity)

export const toFilter = <In, Out>(getter: (input: In) => Out) => (input: In) => Boolean(getter(input))

export const toFilterP = <In, Out>(getter: (input: In) => Promise<Out>) => async (input: In) => Boolean(await getter(input))

export const not = <Opt>(filter: Filter<Opt>): Filter<Opt> => (option: Opt) => !filter(option)

export const notP = <Opt>(filter: FilterP<Opt>): FilterP<Opt> => async (option: Opt) => !(await filter(option))

export const and = <Opt>(filters: Filter<Opt>[]): Filter<Opt> => (option: Opt) => filters.every(filter => filter(option))

export const or = <Opt>(filters: Filter<Opt>[]): Filter<Opt> => (option: Opt) => filters.some(filter => filter(option))

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
