import { Mapper } from '../Mapper'

export const callMB = <In, Out>(mapper: Mapper<In, Out>) => (input: In | undefined) => input ? mapper(input) : undefined
