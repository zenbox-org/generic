/**
 * @see Mutator
 */
export type Mapper<In, Out> = (input: In) => Out

export type MapperP<In, Out> = (input: In) => Promise<Out>

export type MapperV<In, Out, Args extends unknown[]> = (obj: In, ...args: Args) => Out

export type MapperVP<In, Out, Args extends unknown[]> = (obj: In, ...args: Args) => Promise<Out>

export type MapperTwo<InA, InB, Out> = (a: InA, b: InB) => Out

export type MapperTwoSym<In, Out> = MapperTwo<In, In, Out>
