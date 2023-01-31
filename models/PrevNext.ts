export interface PrevNext<P, N> {
  prev: P
  next: N
}

export type PrevNextMaybe<T> = PrevNext<T | undefined, T>
