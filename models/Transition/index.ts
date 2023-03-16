export interface TransitionGen<Action, State> {
  action: Action
  prev: State
  next: State
}
