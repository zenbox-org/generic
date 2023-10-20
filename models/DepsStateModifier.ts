import { Mapper } from './Mapper'
import { Modifier, ModifierP } from './Modifier'

export type DepsStateModifier<Deps, State> = Mapper<Deps, Modifier<State>>

export type DepsStateModifierP<Deps, State> = Mapper<Deps, ModifierP<State>>

export type DSMP<Deps, State> = DepsStateModifierP<Deps, State>
