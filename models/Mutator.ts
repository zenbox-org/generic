/**
 * Mutator<Val> === Mapper<Val, Val>
 */

export type Mutator<Val> = (value: Val) => Val

export type MutatorP<Val> = (value: Val) => Promise<Val>

export type MutatorV<Val, Args extends unknown[]> = (obj: Val, ...args: Args) => Val

export type MutatorVP<Val, Args extends unknown[]> = (obj: Val, ...args: Args) => Promise<Val>
