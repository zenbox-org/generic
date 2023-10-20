import { pipeP } from '../../../utils/promise'
import { fill } from '../../../utils/remeda/fill'
import { DepsStateModifierP } from '../DepsStateModifier'

export const seqDepsStateModifierP = <Deps, State>(fns: DepsStateModifierP<Deps, State>[]): DepsStateModifierP<Deps, State> => (deps: Deps) => async (state: State) => pipeP(fill(fns)(deps))(state)
