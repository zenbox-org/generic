import { z } from 'zod'
import { BigNumber } from 'zenbox-util/bignumber'

// Timestamp is measured in milliseconds since 1970-01-01

export const TimestampSchema = z.number().int()

export const BigTimestampSchema = z.instanceof(BigNumber).refine(value => !value /* check for undefined */ || value.isGreaterThan(0), { message: 'Must be positive' })

export type Timestamp = z.infer<typeof TimestampSchema>;

export type BigTimestamp = z.infer<typeof BigTimestampSchema>;
