import { BigNumber } from 'libs/utils/bignumber'
import { z } from 'zod'

/**
 * Milliseconds since 1970-01-01
 */
export const TimestampSchema = z.number().int().nonnegative()

export type Timestamp = z.infer<typeof TimestampSchema>;

export const TimestampBigNumSchema = z.instanceof(BigNumber).refine(value => !value.isNegative(), 'Must be positive or zero')

export type TimestampBig = z.infer<typeof TimestampBigNumSchema>;
