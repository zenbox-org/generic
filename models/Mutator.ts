/**
 * Mutator<Val> === Mapper<Val, Val>
 */

export type Mutator<Val> = (value: Val) => Val

export type MutatorPromisified<Val> = (value: Val) => Promise<Val>

export type MutatorVariadic<Val, Args extends unknown[]> = (obj: Val, ...args: Args) => Val

export type MutatorVariadicPromisified<Val, Args extends unknown[]> = (obj: Val, ...args: Args) => Promise<Val>

export type MutatorP<Val> = MutatorPromisified<Val>

export type MutatorV<Val, Args extends unknown[]> = MutatorVariadic<Val, Args>

export type MutatorVP<Val, Args extends unknown[]> = MutatorVariadicPromisified<Val, Args>
