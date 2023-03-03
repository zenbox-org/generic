import { BigNumber } from 'libs/utils/BigNumber.utils'
import { z } from 'zod'

export const DurationSchema = z.number().int().min(0) // milliseconds between two timestamps

export const BigDurationSchema = z.instanceof(BigNumber).refine(value => !value /* check for undefined */ || value.isGreaterThan(0), { message: 'Must be positive' })

export type Duration = z.infer<typeof DurationSchema>;

export type BigDuration = z.infer<typeof BigDurationSchema>;
