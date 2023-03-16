import { MapperTwo } from '../Mapper'

export const getMapperOneTupleFromMapperTwo = <A, B, Out>(func: MapperTwo<A, B, Out>) => ([a, b]: [A, B]) => func(a, b)
