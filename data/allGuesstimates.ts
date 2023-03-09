import { num } from 'libs/utils/BigNumber/utils'

const scale = 10

export const Med = num(1)

export const High = Med.multipliedBy(scale)

export const Low = Med.dividedBy(scale)

export const Zero = num(0)

export const One = num(1)

export const Two = num(2)

export const Many = num(Infinity)
